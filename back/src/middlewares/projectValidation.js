function validate(data, fieldName) {
  if (!data) {
    const error = new Error(`${fieldName} 값을 입력해 주세요.`);
    error.name = "ValidationError";
    throw error;
  }
}

function projectValidate(req, res, next) {
  const { title, description, from_date, to_date } = req.body;

  validate(title, "title");
  validate(description, "description");
  validate(from_date, "from_date");
  validate(to_date, "to_date");
  next();
}

function projectUpdateValidate(req, res, next) {
  const fieldToUpdate = [];

  // 변경된 필드의 키 값을 빈 배열에 push.
  for (const key in req.body) {
    fieldToUpdate.push(key);
  }

  //변경된 필드의 값만 유효성 검사. 값이 비어있을 경우 에러.
  fieldToUpdate.forEach((field) => {
    if (req.body[field] === "") {
      const error = new Error(`${field} 값을 입력해 주세요.`);
      error.name = "ValidationError";
      throw error;
    }
  });
  next();
}

export { projectValidate, projectUpdateValidate };
