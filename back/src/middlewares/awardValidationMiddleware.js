function validate(data, fieldName) {
  if (!data) {
    throw new Error(`${fieldName} 값을 입력해 주세요.`);
  }
}

function awardValidate(req, res, next) {
  const { title, description } = req.body;

  validate(title, "title");
  validate(description, "description");
  next();
}

export { awardValidate };
