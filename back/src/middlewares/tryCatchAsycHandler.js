// 코드 중복을 줄이기 위한 try-catch 핸들러 생성
const tryCatchAsycHandler = async (req, res, next, handler) => {
  try {
    const result = await handler(req);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export { tryCatchAsycHandler };
