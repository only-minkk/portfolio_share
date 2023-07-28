import { User } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import {
  BeingEmail,
  Unauthorized,
  NoneUser,
  CreateFailed,
  GetFailed,
  UpdateFailed,
} from "../middlewares/CustomError";
import { errorCatch } from "../middlewares/errorMiddleware";
import { successMessage } from "./successMessage";

class userAuthService {
  // 유저 등록
  static async addUser({ name, email, password }) {
    // 이메일 중복 확인
    const user = await User.findByEmail({ email });

    // 이메일이 존재한다면 에러
    errorCatch(!user, BeingEmail);

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newUser = { id, name, email, password: hashedPassword };

    // db에 저장
    const createdNewUser = await User.create({ newUser });

    // 등록 실패한다면 에러
    errorCatch(createdNewUser, CreateFailed);

    return createdNewUser;
  }

  // 로그인
  static async getUser({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByEmail({ email });

    // 유저가 존재하지 않는다면 에러
    errorCatch(user, NoneUser);

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );

    // 비밀번호가 일치하지 않다면 에러
    errorCatch(isPasswordCorrect, Unauthorized);

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ user_id: user.id }, secretKey);

    // 반환할 loginuser 객체를 위한 변수 설정
    const id = user.id;
    const name = user.name;
    const description = user.description;

    const loginUser = {
      token,
      id,
      email,
      name,
      description,
      errorMessage: null,
    };

    return loginUser;
  }

  // 유저 조회
  static async getUserInfo({ user_id }) {
    const user = await User.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    errorCatch(user, NoneUser);

    return user;
  }

  // 모든 유저 조회
  static async getUsers() {
    const users = await User.findAll();

    // 조회 실패시 에러
    errorCatch(users, GetFailed);

    return users;
  }

  // 유저 정보 수정
  static async setUser({ user_id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let user = await User.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    errorCatch(user, NoneUser);

    // 변경 이메일이 이미 존재하는 이메일인지 확인 후, 존재한다면 에러.
    const email = toUpdate.email;
    const beingEmailUser = await User.findByEmail({ email });
    errorCatch(!beingEmailUser, BeingEmail);

    // 모든 필드가 변경됐을 경우 save()메서드로 한 번에 저장.
    if (Object.keys(toUpdate).length == 3) {
      user.name = toUpdate.name;
      user.email = toUpdate.email;
      user.description = toUpdate.description;
      const newUser = await user.save();

      // save() 실패시 에러.
      errorCatch(newUser, UpdateFailed);

      return newUser;
      // return successMessage.updateSuccessMessage;
    }

    // 변경된 필드의 키 값을 fieldToUpdate 에 선언.
    const fieldToUpdate = Object.keys(toUpdate);

    // update()메서드로 변경된 필드만 업데이트.
    for (const field of fieldToUpdate) {
      const newValue = toUpdate[field];
      user = await User.update({ user_id, fieldToUpdate: field, newValue });
    }

    // update() 실패시 에러
    errorCatch(user, UpdateFailed);

    return user;
    // return successMessage.updateSuccessMessage;
  }
}

export { userAuthService };
