import jwt from "jsonwebtoken";
import { NotLoginUser, TokenNotFoundError } from "../utils/CustomError";
import { errorCatch } from "../utils/errorCatch";

function login_required(req, res, next) {
  // request 헤더로부터 authorization bearer 토큰을 받음.
  const userToken = req.headers["authorization"]?.split(" ")[1] ?? null;

  // 이 토큰은 jwt 토큰 문자열이거나, 혹은 null임.
  // 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한함.

  if (!userToken) {
    console.log("서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음");
  }
  errorCatch(userToken, NotLoginUser);

  // 해당 token 이 정상적인 token인지 확인 -> 토큰에 담긴 user_id 정보 추출
  try {
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const jwtDecoded = jwt.verify(userToken, secretKey);
    const user_id = jwtDecoded.user_id;
    req.currentUserId = user_id;
    next();
  } catch (error) {
    throw new TokenNotFoundError();
  }
}

export { login_required };
