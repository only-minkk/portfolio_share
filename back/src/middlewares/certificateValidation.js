function validate(data, fieldName) {
  if (!data) {
    throw new Error(`${fieldName} 값을 입력해 주세요.`);
  }
}

function certificateValidate(req, res, next) {
  const { title, description, when_date } = req.body;

  validate(title, "title");
  validate(description, "description");
  validate(when_date, "when_date");
  next();
}

export { certificateValidate };
