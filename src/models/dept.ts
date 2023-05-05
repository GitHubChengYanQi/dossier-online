import {useRequest} from "@/utils/Request";
import {getTree} from "@/services/BASE_SYSTEM/dept";

const formatDeptData = (data: any) => {
    if (!Array.isArray(data)) {
        return null;
    }
    return data.map((item: any, index) => {

        const result = {
            title: item.title,
            key: item.key,
            value: item.key,
            index,
            count: data.length
        } as any;
        if (Array.isArray(item.children) && item.children.length > 0) {
            result.children = formatDeptData(item.children)
        }
        return result;
    });
}
const useDept = () => {
    const {data, loading, run} = useRequest(async () => {
        return await getTree();
    }, {
        manual: true
    });
    return {data: formatDeptData(data), loading, run}
}
export default useDept;