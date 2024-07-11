import { validate } from "../utils/validation.js";
import { userFields } from "../utils/fieldConstants.js";

// 이메일 유효성 검사
function validateEmail(email) {
  const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) {
    throw new ValidationError("유효하지 않은 이메일 형식입니다.");
  }
}

// 회원가입 (유저 등록) 유효성 검사
function validateCreateUser(req, res, next) {
  const { name, email, password } = req.body;

  validate(name, "name", userFields);
  validate(email, "email", userFields);
  validateEmail(email);
  validate(password, "password", userFields);

  next();
}

// 로그인 유효성 검사
function validateLoginUser(req, res, next) {
  const { email, password } = req.body;

  validate(email, "email", userFields);
  validateEmail(email);
  validate(password, "password", userFields);

  next();
}

// 유저 정보 변경 유효성 검사
function userUpdateValidation(req, res, next) {
  // 변경 요청 값
  const userToUpdate = req.body;

  // 변경 요청 값을 배열로
  const fieldToUpdate = Object.keys(userToUpdate);

  // 배열로 된 필드 값으로 유효성 검사
  fieldToUpdate.forEach((field) => {
    validate(userToUpdate[field], field, userFields);
  });

  next();
}

export { validateCreateUser, validateLoginUser, userUpdateValidation };
