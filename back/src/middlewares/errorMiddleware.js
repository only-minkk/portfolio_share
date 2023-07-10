function errorMiddleware(error, req, res, next) {
  // 터미널에 노란색으로 출력됨.
  console.log("\x1b[33m%s\x1b[0m", error);
  res.status(400).send(error.message);
}

// target 객체에 errorMessage가 있는지 확인해서 있다면 에러로 넘기기.
const ifErrorMessage = (target) => {
  if (target.errorMessage) {
    throw new Error(target.errorMessage);
  }
};

export { errorMiddleware, ifErrorMessage };
