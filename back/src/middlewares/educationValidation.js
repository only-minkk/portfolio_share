function validate(data, fieldName) {
  if (!data) {
    throw new Error(`${fieldName} 값을 입력해 주세요.`);
  }
}

function educationValidate(req, res, next) {
  const { school, major, position } = req.body;

  validate(school, "school");
  validate(major, "major");
  validate(position, "position");
  next();
}

function educationUpdateValidate(req, res, next) {
  const fieldToUpdate = [];

  // 변경된 필드의 키 값을 빈 배열에 push.
  for (const key in req.body) {
    fieldToUpdate.push(key);
  }

  //변경된 필드의 값만 유효성 검사. 값이 비어있을 경우 에러.
  fieldToUpdate.forEach((field) => {
    if (req.body[field] === "") {
      throw new Error(`${field} 값을 입력해 주세요.`);
    }
  });
  next();
}

export { educationValidate, educationUpdateValidate };
