import dataReducer from '@/core/reducers/resource/data';
import listReducer from '@/core/reducers/resource/list';

const initialState = {};

export const registerResource = (previousState = initialState, action) => {
  // if a resource has been registered, we done
  if (previousState[action.payload.resource]) {
    return {
      ...previousState,
    };
  }
  const resourceState = {
    props: action.payload,
    data: dataReducer(undefined, action),
    list: listReducer(undefined, action),
  };
  return {
    ...previousState,
    [action.payload.resource]: resourceState,
  };
};

export const unregisterResource = (previousState = initialState, action) =>
  Object.keys(previousState).reduce((acc, key) => {
    if (key === action.payload) {
      return acc;
    }

    return { ...acc, [key]: previousState[key] };
  }, {});

export const dataAndListReducer = (previousState = initialState, action) => {
  if (!action.meta || !action.meta.resource) {
    return previousState;
  }
  const resources = Object.keys(previousState);
  const newState = resources.reduce(
    (acc, resource) => ({
      ...acc,
      [resource]:
        action.meta.resource === resource
          ? {
              props: previousState[resource].props,
              data: dataReducer(previousState[resource].data, action),
              list: listReducer(previousState[resource].list, action),
            }
          : previousState[resource],
    }),
    {},
  );

  return newState;
};
