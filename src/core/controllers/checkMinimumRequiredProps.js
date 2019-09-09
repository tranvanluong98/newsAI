import React from 'react';

const checkMinimumRequiredProps = (
  displayName,
  requiredProps,
) => WrappedComponent => {
  const CheckedCpn = props => {
    const propNames = Object.keys(props);
    const missingProps = requiredProps.filter(
      prop => !propNames.includes(prop),
    );

    if (missingProps.length > 0) {
      throw new Error(
        `<${displayName}> component is not properly configured, some essential props are missing.
Be sure to pass the props from the parent. Example:

const My${displayName} = props => (
    <${displayName} {...props}></${displayName}>
);

The missing props are: ${missingProps.join(', ')}`,
      );
    }

    return <WrappedComponent {...props} />;
  };
  return CheckedCpn;
};

export default checkMinimumRequiredProps;
