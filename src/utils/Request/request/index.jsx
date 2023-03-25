import requestProivde from '../../Service';

const request = (config) => {
  return requestProivde({
    ...config
  });
};
export default request;
