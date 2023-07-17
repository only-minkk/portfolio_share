import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import {
  validateCreateUser,
  validateLoginUser,
  userUpdateValidation,
} from "../middlewares/userValidation";
import { tryCatchAsyncHandler } from "../middlewares/tryCatchAsyncHandler";
import { userAuthService } from "../services/userService";

const userAuthRouter = Router();

// 회원가입
userAuthRouter.post(
  "/user/register",
  validateCreateUser,
  async (req, res, next) => {
    // 람다 함수를 활용하여 역할을 명확하게 하고, 가독성과 유지보수를 용이하게 함.
    await tryCatchAsyncHandler(req, res, next, (req) => {
      const { name, email, password } = req.body;

      const newUser = userAuthService.addUser({
        name,
        email,
        password,
      });
      return newUser;
    });
  }
);

//로그인
userAuthRouter.post(
  "/user/login",
  validateLoginUser,
  async (req, res, next) => {
    await tryCatchAsyncHandler(req, res, next, (req) => {
      const { email, password } = req.body;
      const user = userAuthService.getUser({ email, password });
      return user;
    });
  }
);

// 모든 유저 조회
userAuthRouter.get("/userlist", login_required, async (req, res, next) => {
  await tryCatchAsyncHandler(req, res, next, () => {
    const users = userAuthService.getUsers();
    return users;
  });
});

// 접속 유저 조회 (클라이언트에서 로그인한 유저의 기존 토큰을 가져오기위한 라우터)
userAuthRouter.get("/user/current", login_required, async (req, res, next) => {
  await tryCatchAsyncHandler(req, res, next, (req) => {
    // login_required 미들웨어를 통해 토큰에서 userId 추출.
    const user_id = req.currentUserId;
    const currentUserInfo = userAuthService.getUserInfo({ user_id });
    return currentUserInfo;
  });
});

// 유저 정보 수정
userAuthRouter.put(
  "/users/:id",
  login_required,
  userUpdateValidation,
  async (req, res, next) => {
    await tryCatchAsyncHandler(req, res, next, (req) => {
      const user_id = req.params.id;
      const toUpdate = req.body;
      const updatedUser = userAuthService.setUser({ user_id, toUpdate });
      return updatedUser;
    });
  }
);

// 특정 유저 조회
userAuthRouter.get("/users/:id", login_required, async (req, res, next) => {
  await tryCatchAsyncHandler(req, res, next, (req) => {
    const user_id = req.params.id;
    const currentUserInfo = userAuthService.getUserInfo({ user_id });
    return currentUserInfo;
  });
});

export { userAuthRouter };
