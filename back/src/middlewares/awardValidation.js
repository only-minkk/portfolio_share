import { ValidationError } from "./CustomError";

function validate(data, field) {
  // 올바른 필드명.
  const correctField = ["title", "description"];

  // 필드명이 올바른지 확인. 올바르지 않다면 에러.
  if (!correctField.includes(field)) {
    throw new ValidationError(
      `${field}이란 필드명은 없습니다. 필드명을 다시 확인하여 주세요.`
    );
  }

  // 필드에 값이 있는지 확인. 없으면 에러.
  if (!data || data.trim() === "") {
    throw new ValidationError(`${field} 값을 입력해 주세요.`);
  }
}

function awardValidate(req, res, next) {
  const { title, description } = req.body;

  validate(title, "title");
  validate(description, "description");
  next();
}

function awardUpdateValidate(req, res, next) {
  const updateAward = req.body;
  const updateField = [];

  for (const field in updateAward) {
    updateField.push(field);
  }

  for (const field of updateField) {
    validate(updateAward[field], field);
  }

  next();
}

export { awardValidate, awardUpdateValidate };
