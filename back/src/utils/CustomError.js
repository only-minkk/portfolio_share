class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class TokenNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "TokenNotFoundError";
    this.message = "정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.";
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
    this.message = "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
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

class CreateFailed extends Error {
  constructor(message) {
    super(message);
    this.name = "CreateFailed";
    this.message = "서버 오류로 등록에 실패하였습니다.";
  }
}

class GetFailed extends Error {
  constructor(message) {
    super(message);
    this.name = "GetFailed";
    this.message = "서버 오류로 조회에 실패하였습니다.";
  }
}

class UpdateFailed extends Error {
  constructor(message) {
    super(message);
    this.name = "UpdateFailed";
    this.message = "서버 오류로 업데이트에 실패하였습니다.";
  }
}
class DeleteFailed extends Error {
  constructor(message) {
    super(message);
    this.name = "DeleteFailed";
    this.message = "서버 오류로 삭제에 실패하였습니다.";
  }
}

export {
  ValidationError,
  TokenNotFoundError,
  BeingEmail,
  Unauthorized,
  NoneUser,
  NotFound,
  CreateFailed,
  GetFailed,
  UpdateFailed,
  DeleteFailed,
};
