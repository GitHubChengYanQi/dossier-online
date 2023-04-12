import {useRequest} from "@/utils/Request";
import {getTree} from "@/services/BASE_SYSTEM/dept";

const useDept = () => {
    const {data, loading, run} = useRequest(async () => {
        return await getTree();
    },{
        manual:true
    });
    return {data, loading, run}
}
export default useDept;