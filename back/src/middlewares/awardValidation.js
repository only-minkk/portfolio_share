import { ValidationError } from "./CustomError";

// 유효성 검사
function validate(data, field) {
  // 올바른 필드명.
  const correctField = ["title", "description"];

  // 필드명이 올바른지 확인. 올바르지 않다면 에러.
  if (!correctField.includes(field)) {
    throw new ValidationError(
      `${field}이란 필드명은 없습니다. 필드명을 다시 확인하여 주세요.`
    );
  }

  // 필드에 값이 없거만 빈 값이면 에러.
  if (!data || data.trim() === "") {
    throw new ValidationError(`${field} 값을 입력해 주세요.`);
  }
}

// 수상내역 추가 유효성 검사
function awardValidate(req, res, next) {
  const { title, description } = req.body;

  validate(title, "title");
  validate(description, "description");
  next();
}

// 수상내역 변경 유효성 검사
function awardUpdateValidate(req, res, next) {
  // 변경 요청 값.
  const awardToUpdate = req.body;

  // 변경할 필드를 넣을 빈 배열
  const fieldToUpdate = [];

  // 변경할 값의 필드를 빈 배열에 push.
  for (const field in awardToUpdate) {
    fieldToUpdate.push(field);
  }

  // 변경할 필드를 토대로 유효성 검사.
  for (const field of fieldToUpdate) {
    validate(awardToUpdate[field], field);
  }

  next();
}

export { awardValidate, awardUpdateValidate };
