const devLog = (...logs) => {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof logs[0] === 'function') {
      logs[0]();
    } else {
      console.log(...logs);
    }
  }
};

export default devLog;
