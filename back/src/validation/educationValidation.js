import { validate } from "../utils/validation";
import { educationFields } from "../utils/fieldConstants";

// 학력 추가 유효성 검사
function educationValidate(req, res, next) {
  const { school, major, position } = req.body;

  validate(school, "school", educationFields);
  validate(major, "major", educationFields);
  validate(position, "position", educationFields);
  next();
}

// 학력 변경 유효성 검사
function educationUpdateValidate(req, res, next) {
  // 변경 요청 값.
  const educationToUpdate = req.body;

  // 변경 요청 값을 배열로
  const fieldToUpdate = Object.keys(educationToUpdate);

  // 배열로 된 필드 값으로 유효성 검사.
  fieldToUpdate.forEach((field) => {
    validate(educationToUpdate[field], field, educationFields);
  });

  next();
}

export { educationValidate, educationUpdateValidate };
