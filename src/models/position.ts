import {useRequest} from "@/utils/Request";
import {getAll} from "@/services/BASE_SYSTEM/position";

const usePostion = () => {
    const {data, loading, run} = useRequest(async () => {
        return await getAll();
    },{
        manual:true
    });
    return {data, loading, run}
}
export default usePostion;