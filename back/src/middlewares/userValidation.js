import { ValidationError } from "./CustomError";

// 유효성 검사
function validate(data, field) {
  // 올바른 필드명
  const correctField = ["name", "email", "description", "password"];

  // 필드명이 올바른지 확인. 올바르지 않다면 에러.
  if (!correctField.includes(field)) {
    throw new ValidationError(
      `${field}이란 필드명은 없습니다. 필드명을 다시 확인하여 주세요.`
    );
  }

  // 필드에 값이 없거나 빈 값이면 에러
  if (!data || data.trim() === "") {
    throw new ValidationError(`${field} 값을 입력해 주세요.`);
  }
}

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

  validate(name, "name");
  validate(email, "email");
  validateEmail(email);
  validate(password, "password");

  next();
}

// 로그인 유효성 검사
function validateLoginUser(req, res, next) {
  const { email, password } = req.body;

  validate(email, "email");
  validateEmail(email);
  validate(password, "password");

  next();
}

// 유저 정보 변경 유효성 검사
function userUpdateValidation(req, res, next) {
  // 변경 요청 값
  const userToUpdate = req.body;

  // 변경할 필드를 넣을 빈 배열.
  const fieldToUpdate = [];

  // 변경할 값의 필드를 빈 배열에 push.
  for (const field in userToUpdate) {
    fieldToUpdate.push(field);
  }

  // 변경할 필드를 토대로 유효성 검사
  for (const field of fieldToUpdate) {
    validate(userToUpdate[field], field);
  }

  next();
}

export { validateCreateUser, validateLoginUser, userUpdateValidation };
