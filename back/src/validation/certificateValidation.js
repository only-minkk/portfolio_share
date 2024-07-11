import { validate } from "../utils/validation.js";
import { certificateFields } from "../utils/fieldConstants.js";

// 자격증 추가 유효성 검사
function certificateValidate(req, res, next) {
  const { title, description, when_date } = req.body;

  validate(title, "title", certificateFields);
  validate(description, "description", certificateFields);
  validate(when_date, "when_date", certificateFields);
  next();
}

// 자격증 변경 유효성 검사
function certificateUpdateValidate(req, res, next) {
  // 변경 요청 값.
  const certificateToUpdate = req.body;

  // 변경 요청 값을 배열로
  const fieldToUpdate = Object.keys(certificateToUpdate);

  // 배열로 된 필드 값으로 유효성 검사.
  fieldToUpdate.forEach((field) => {
    validate(certificateToUpdate[field], field, certificateFields);
  });

  next();
}

export { certificateValidate, certificateUpdateValidate };
