import requestProivde from '../../Service';
import {ResponseData} from "@/services/type/common";

const request = function <T>(config: any): Promise<ResponseData<T>> {
    return requestProivde({
        ...config
    });
};
export default request;
