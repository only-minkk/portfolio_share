function errorMiddleware(error, req, res, next) {
  // 터미널에 노란색으로 출력됨.
  console.log(
    "\x1b[31m%s\x1b[37m%s\x1b[33m%s\x1b[31m%s\x1b[0m",
    `${"-".repeat(33)}\n`,
    `${new Date().toLocaleString("ko-KR")}\n`,
    `${error.stack}\n`,
    `${"-".repeat(33)}\n`
  );

  switch (error.name) {
    case "ValidationError":
      return res.status(400).json({
        error: {
          name: error.name,
          message: error.message,
        },
      });
    case "BeingEmail":
      return res.status(409).json({
        error: {
          name: error.name,
          message: error.message,
        },
      });
    case "TokenNotFoundError":
      return res.status(401).json({
        error: {
          name: error.name,
          message: error.message,
        },
      });
    case "Unauthorized":
      return res.status(401).json({
        error: {
          name: error.name,
          message: error.message,
        },
      });
    case "NoneUser":
      return res.status(404).json({
        error: {
          name: error.name,
          message: error.message,
        },
      });
    case "NotFound":
      return res.status(404).json({
        error: {
          name: error.name,
          message: error.message,
        },
      });
    case "CreateFailed":
      return res.status(500).json({
        error: {
          name: error.name,
          message: error.message,
        },
      });
    case "GetFailed":
      return res.status(500).json({
        error: {
          name: error.name,
          message: error.message,
        },
      });
    case "UpdateFailed":
      return res.status(500).json({
        error: {
          name: error.name,
          message: error.message,
        },
      });
    case "DeleteFailed":
      return res.status(500).json({
        error: {
          name: error.name,
          message: error.message,
        },
      });
    default:
      return res.status(400).send(error.message);
  }
}

export { errorMiddleware };
