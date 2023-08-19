import { validate } from "../utils/validation";
import { awardFields } from "../utils/fieldConstants";

// 수상내역 추가 유효성 검사
function awardValidate(req, res, next) {
  const { title, description } = req.body;

  validate(title, "title", awardFields);
  validate(description, "description", awardFields);
  next();
}

// 수상내역 변경 유효성 검사
function awardUpdateValidate(req, res, next) {
  // 변경 요청 값.
  const awardToUpdate = req.body;

  // 변경 요청 값을 배열로
  const fieldToUpdate = Object.keys(awardToUpdate);

  // 배열로 된 필드 값으로 유효성 검사.
  fieldToUpdate.forEach((field) => {
    validate(awardToUpdate[field], field, awardFields);
  });

  next();
}

export { awardValidate, awardUpdateValidate };
