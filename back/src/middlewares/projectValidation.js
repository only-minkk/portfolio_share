function validate(data, fieldName) {
  if (!data) {
    throw new Error(`${fieldName} 값을 입력해 주세요.`);
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

export { projectValidate };
