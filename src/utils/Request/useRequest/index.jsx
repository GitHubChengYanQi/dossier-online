import { useRequest as ahooksRequest } from 'ahooks';
import ajaxService from '../../Service';

const index = (config, options) => {
  // const { ajaxService } = Service();

  const requestService = (params) => {
    return ajaxService({
      ...config,
      ...params
    });
  };

  const formatResult = (response) => {
    if (typeof response.data === 'undefined' || config.response) {
      return response;
    }
    return response.data;
  };

  return ahooksRequest(requestService, {
    onError: (result) => {
      console.log(result);
      // if (parseInt(result.errCode, 0) === 1502) {
      //   history.push("/login");
      // }
    },
    formatResult,
    ...options,
  });
};
export default index;
