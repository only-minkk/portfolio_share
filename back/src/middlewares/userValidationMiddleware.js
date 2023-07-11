function validate(data, fieldName) {
  if (!data) {
    throw new Error(`${fieldName} 값을 입력해 주세요.`);
  }
}

function validateEmail(email) {
  const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) {
    throw new Error("유효하지 않은 이메일 주소입니다.");
  }
}

function validateCreateUser(req, res, next) {
  const { name, email, password } = req.body;

  validate(name, "name");
  validate(email, "email");
  validateEmail(email);
  validate(password, "password");

  next();
}

function validateLoginUser(req, res, next) {
  const { email, password } = req.body;

  validate(email, "email");
  validateEmail(email);
  validate(password, "password");

  next();
}

export { validateCreateUser, validateLoginUser };
