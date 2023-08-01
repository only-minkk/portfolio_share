import { ValidationError } from "../middlewares/CustomError";

// 유효성 검사
function validate(data, field) {
  // 올바른 필드명.
  const correctField = ["title", "description", "when_date"];

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

// 자격증 추가 유효성 검사
function certificateValidate(req, res, next) {
  const { title, description, when_date } = req.body;

  validate(title, "title");
  validate(description, "description");
  validate(when_date, "when_date");
  next();
}

// 자격증 변경 유효성 검사
function certificateUpdateValidate(req, res, next) {
  // 변경 요청 값.
  const certificateToUpdate = req.body;

  // 변경할 필드를 넣을 빈 배열
  const fieldToUpdate = [];

  // 변경할 값의 필드를 빈 배열에 push.
  for (const field in certificateToUpdate) {
    fieldToUpdate.push(field);
  }

  //변경할 필드를 토대로 유효성 검사.
  for (const field of fieldToUpdate) {
    validate(certificateToUpdate[field], field);
  }

  next();
}

export { certificateValidate, certificateUpdateValidate };
