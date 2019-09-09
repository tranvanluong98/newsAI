const getItemWithId = (arrays, itemId) => {
  const itemIdx = arrays.findIndex(item => item.id === itemId);
  return itemIdx < 0 ? null : arrays[itemIdx];
};

export default getItemWithId;
