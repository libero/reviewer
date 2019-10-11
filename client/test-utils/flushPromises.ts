function flushPromises() {
  return new Promise(resolve =>
      setTimeout(() => {
          resolve();
      }),
  );
}

export default flushPromises;