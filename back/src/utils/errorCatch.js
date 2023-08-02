function errorCatch(data, err) {
  if (!data) {
    throw new err();
  }
}

export { errorCatch };
