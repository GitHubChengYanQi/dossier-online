import {useRequest} from "@/utils/Request";
import {getTree} from "@/services/BASE_SYSTEM/dept";
import {DataNode} from "rc-tree/lib/interface";

export declare type DeptTreeType = {
    title: string,
    key: string,
    value?: string,
    index: number,
    count: number
    children?: DeptTreeType[]
} & DataNode;


const formatDeptData = (data: any[]): DeptTreeType[] => {
    if (!Array.isArray(data)) {
        return [];
    }
    return data.map((item: any, index) => {

        const result: DeptTreeType = {
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
    const {data, loading, run, refresh} = useRequest(async () => {
        return await getTree();
    }, {
        manual: true
    });
    return {data: formatDeptData(data), loading, run, refresh}
}
export default useDept;
