import { validate } from "../utils/validation.js";
import { projectFields } from "../utils/fieldConstants.js";

// 프로젝트 추가 유효성 검사
function projectValidate(req, res, next) {
  const { title, description, from_date, to_date } = req.body;

  validate(title, "title", projectFields);
  validate(description, "description", projectFields);
  validate(from_date, "from_date", projectFields);
  validate(to_date, "to_date", projectFields);
  next();
}

// 프로젝트 변경 유효성 검사
function projectUpdateValidate(req, res, next) {
  // 변경 요청 값.
  const projectToUpdate = req.body;

  // 변경 요청 값을 배열로
  const fieldToUpdate = Object.keys(projectToUpdate);

  // 배열로 된 필드 값으로 유효성 검사
  fieldToUpdate.forEach((field) => {
    validate(projectToUpdate[field], field, projectFields);
  });

  next();
}

export { projectValidate, projectUpdateValidate };
