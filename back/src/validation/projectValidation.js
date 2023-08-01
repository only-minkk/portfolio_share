import { ValidationError } from "../middlewares/CustomError";

// 유효성 검사
function validate(data, field) {
  // 올바른 필드명
  const correctField = ["title", "description", "from_date", "to_date"];

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

// 프로젝트 추가 유효성 검사
function projectValidate(req, res, next) {
  const { title, description, from_date, to_date } = req.body;

  validate(title, "title");
  validate(description, "description");
  validate(from_date, "from_date");
  validate(to_date, "to_date");
  next();
}

// 프로젝트 변경 유효성 검사
function projectUpdateValidate(req, res, next) {
  // 변경 요청 값.
  const projectToUpdate = req.body;

  // 변경할 필드를 넣을 빈 배열
  const fieldToUpdate = [];

  // 변경할 값의 필드를 빈 배열에 push
  for (const field in projectToUpdate) {
    fieldToUpdate.push(field);
  }

  // 변경할 필드를 토대로 유효성 검사
  for (const field of fieldToUpdate) {
    validate(projectToUpdate[field], field);
  }

  next();
}

export { projectValidate, projectUpdateValidate };
