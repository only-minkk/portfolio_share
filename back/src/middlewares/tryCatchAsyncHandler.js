// 코드 중복을 줄이기 위한 try-catch 핸들러 생성
const tryCatchAsyncHandler = (handler) => {
  return async (req, res, next) => {
    try {
      const result = await handler(req);
      let statusCode = 200; // 기본 상태 코드는 200으로 설정
      if (req.method === "POST") {
        statusCode = 201; // Created
      } else if (req.method === "PUT" || req.method === "DELETE") {
        statusCode = 204; // No Content
      }
      console.log(result);

      res.status(statusCode).json(result);
    } catch (error) {
      next(error);
    }
  };
};

export { tryCatchAsyncHandler };
