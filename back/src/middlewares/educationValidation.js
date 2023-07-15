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

export { educationValidate };
