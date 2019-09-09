const getFuncNameFromAction = namespace => action =>
  action.replace(`${namespace}/`, '');

export default getFuncNameFromAction;
