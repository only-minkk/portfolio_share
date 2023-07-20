import { ValidationError } from "./CustomError";

function validate(data, fieldName) {
  if (!data) {
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
  const fieldToUpdate = [];

  // 변경된 필드의 키 값을 빈 배열에 push.
  for (const key in req.body) {
    fieldToUpdate.push(key);
  }

  //변경된 필드의 값만 유효성 검사. 값이 비어있을 경우 에러.
  fieldToUpdate.forEach((field) => {
    if (req.body[field] === "") {
      throw new ValidationError(`${field} 값을 입력해 주세요.`);
    }
  });
  next();
}

export { awardValidate, awardUpdateValidate };
