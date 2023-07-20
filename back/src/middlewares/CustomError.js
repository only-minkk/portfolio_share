class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class BeingEmail extends Error {
  constructor(message) {
    super(message);
    this.name = "BeingEmail";
    this.message =
      "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
  }
}

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = "Unauthorized";
  }
}

class NoneUser extends Error {
  constructor(message) {
    super(message);
    this.name = "NoneUser";
    this.message = "존재하지 않는 유저입니다. 다시 한 번 확인해 주세요.";
  }
}

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFound";
    this.message = "내역이 없습니다. 다시 한 번 확인해 주세요.";
  }
}

export { ValidationError, BeingEmail, Unauthorized, NoneUser, NotFound };
