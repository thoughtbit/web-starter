import { injectReducer } from "./";

const withReducer = (key, reducer) => (WrappedComponent) => {
  injectReducer(key, reducer);

  return (props) => <WrappedComponent {...props} />;
};

export default withReducer;

/*
 export default withReducer("setting", reducer)(Setting);
 */