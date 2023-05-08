import {useRequest} from "umi";
import {request} from "@/utils/Request";

const useArea = ()=>{
    const {data, loading, run, refresh} = useRequest(async ()=>{
        const response = await request("/rest/area/treeView");
        return response.data;
    },{
        manual:true
    });
    return {data, loading, run, refresh}
}
export default useArea;