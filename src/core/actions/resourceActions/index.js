export const namespace = 'resources';

export const REGISTER_RESOURCE = `${namespace}/register`;
export const UNREGISTER_RESOURCE = `${namespace}/unregister`;
export const DATA_ACTION_RESOURCE = `${namespace}/data`;
export const RESOURCE_REFRESH_VIEW = `${namespace}/refreshView`;

export const registerResource = resource => ({
  type: REGISTER_RESOURCE,
  payload: resource,
});

export const unregisterResource = resourceName => ({
  type: UNREGISTER_RESOURCE,
  payload: resourceName,
});

export const refreshViewResource = resourceName => ({
  type: RESOURCE_REFRESH_VIEW,
  meta: {
    resource: resourceName,
  },
});
