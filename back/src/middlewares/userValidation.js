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

function userUpdateValidation(req, res, next) {
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

export { validateCreateUser, validateLoginUser, userUpdateValidation };
