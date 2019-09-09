function dive(currentKey, into, target) {
  Object.keys(into).forEach(i => {
    if (Object.prototype.hasOwnProperty.call(into, i)) {
      let newKey = i;
      const newVal = into[i];

      if (currentKey.length > 0) {
        newKey = `${currentKey}.${i}`;
      }

      if (typeof newVal === 'object') {
        dive(newKey, newVal, target);
      } else {
        target[newKey] = newVal; // eslint-disable-line
      }
    }
  });
}

function flatten(arr) {
  // eslint-disable-line
  const newObj = {};
  dive('', arr, newObj);
  return newObj;
}

export default flatten;
