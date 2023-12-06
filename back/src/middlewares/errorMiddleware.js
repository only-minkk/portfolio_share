function errorMiddleware(error, req, res, next) {
  // 터미널에 노란색으로 출력됨.
  console.log(
    "\x1b[31m%s\x1b[37m%s\x1b[33m%s\x1b[31m%s\x1b[0m",
    `${"-".repeat(33)}\n`,
    `${new Date().toLocaleString("ko-KR")}\n`,
    `${error.stack}\n`,
    `${"-".repeat(33)}\n`
  );

  const errorResponse = (status, error) =>
    res.status(status).json({
      error: {
        name: error.name,
        message: error.message,
      },
    });

  switch (error.name) {
    case "ValidationError":
      return errorResponse(400, error);
    case "BeingEmail":
      return errorResponse(409, error);
    case "NotLoginUser":
    case "TokenNotFoundError":
    case "Unauthorized":
      return errorResponse(401, error);
    case "NoneUser":
    case "NotFound":
      return errorResponse(404, error);
    case "CreateFailed":
    case "GetFailed":
    case "UpdateFailed":
    case "DeleteFailed":
      return errorResponse(500, error);
    default:
      return res.status(400).send(error.message);
  }
}

export { errorMiddleware };
