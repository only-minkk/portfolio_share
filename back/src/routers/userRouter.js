import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import {
  validateCreateUser,
  validateLoginUser,
  validateUpdateUser,
} from "../middlewares/userValidationMiddleware";
import { userAuthService } from "../services/userService";

const userAuthRouter = Router();

const userAuthHandler = async (req, res, next, handler) => {
  try {
    const result = await handler(req);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// 회원가입
userAuthRouter.post(
  "/user/register",
  validateCreateUser,
  async (req, res, next) => {
    await userAuthHandler(req, res, next, (req) => {
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
    await userAuthHandler(req, res, next, (req) => {
      const { email, password } = req.body;
      const user = userAuthService.getUser({ email, password });
      return user;
    });
  }
);

// 모든 유저 조회
userAuthRouter.get("/userlist", login_required, async (req, res, next) => {
  await userAuthHandler(req, res, next, () => {
    const users = userAuthService.getUsers();
    return users;
  });
});

// 접속 유저 조회 (클라이언트에서 로그인한 유저의 기존 토큰을 가져오기위한 라우터)
userAuthRouter.get("/user/current", login_required, async (req, res, next) => {
  await userAuthHandler(req, res, next, (req) => {
    const user_id = req.currentUserId;
    const currentUserInfo = userAuthService.getUserInfo({ user_id });
    return currentUserInfo;
  });
});

// 유저 정보 수정
userAuthRouter.put(
  "/users/:id",
  login_required,
  validateUpdateUser,
  async (req, res, next) => {
    await userAuthHandler(req, res, next, (req) => {
      const user_id = req.params.id;
      const toUpdate = req.body;
      const updatedUser = userAuthService.setUser({ user_id, toUpdate });
      return updatedUser;
    });
  }
);

// 특정 유저 조회
userAuthRouter.get("/users/:id", login_required, async (req, res, next) => {
  await userAuthHandler(req, res, next, (req) => {
    const user_id = req.params.id;
    const currentUserInfo = userAuthService.getUserInfo({ user_id });
    return currentUserInfo;
  });
});

export { userAuthRouter };
