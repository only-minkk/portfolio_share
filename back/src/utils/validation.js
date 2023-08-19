import { ValidationError } from "./CustomError";

// 유효성 검사
function validate(data, field, correctField) {
  //필드명이 올바른지 확인. 올바르지 않다면 에러.
  if (!correctField.includes(field)) {
    throw new ValidationError(
      `${field} 필드명은 존재하지 않습니다. 필드명을 다시 확인하여 주세요.`
    );
  }

  // 필드에 값이 없거나 빈 값이면 에러.
  if (!data || data.trim() === "") {
    throw new ValidationError(`${field} 값을 입력해 주세요.`);
  }

  // 입력 값이 '/'로 시작하는지 확인하는 로직 추가
  if (data.trim().startsWith("/")) {
    throw new ValidationError(`${field} 값은 '/'로 시작할 수 없습니다.`);
  }
}

export { validate };
