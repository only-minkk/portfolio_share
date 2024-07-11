import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import {
  validateCreateUser,
  validateLoginUser,
  userUpdateValidation,
} from "../validation/userValidation.js";
import { tryCatchAsyncHandler } from "../utils/tryCatchAsyncHandler.js";
import { UserAuthService } from "../services/UserAuthService.js";

const userAuthRouter = Router();

// 회원가입
userAuthRouter.post(
  "/user/register",
  validateCreateUser,
  tryCatchAsyncHandler(async (req) => {
    const { name, email, password } = req.body;

    const newUser = await UserAuthService.addUser({
      name,
      email,
      password,
    });
    return newUser;
  })
);

//로그인
userAuthRouter.post(
  "/user/login",
  validateLoginUser,
  tryCatchAsyncHandler(async (req) => {
    const { email, password } = req.body;
    const user = await UserAuthService.getUser({ email, password });
    return user;
  })
);

// 모든 유저 조회
userAuthRouter.get(
  "/userlist",
  login_required,
  tryCatchAsyncHandler(async () => {
    const users = await UserAuthService.getUsers();
    return users;
  })
);

// 접속 유저 조회 (클라이언트에서 로그인한 유저의 기존 토큰을 가져오기위한 라우터)
userAuthRouter.get(
  "/user/current",
  login_required,
  tryCatchAsyncHandler(async (req) => {
    // login_required 미들웨어를 통해 토큰에서 userId 추출.
    const user_id = req.currentUserId;
    const currentUserInfo = await UserAuthService.getUserInfo({ user_id });
    return currentUserInfo;
  })
);

// 유저 정보 수정
userAuthRouter.put(
  "/users/:id",
  login_required,
  userUpdateValidation,
  tryCatchAsyncHandler(async (req) => {
    const user_id = req.params.id;
    const toUpdate = req.body;
    const updatedUser = await UserAuthService.setUser({ user_id, toUpdate });
    return updatedUser;
  })
);

// 특정 유저 조회
userAuthRouter.get(
  "/users/:id",
  login_required,
  tryCatchAsyncHandler(async (req) => {
    const user_id = req.params.id;
    const currentUserInfo = await UserAuthService.getUserInfo({ user_id });
    return currentUserInfo;
  })
);

export { userAuthRouter };
