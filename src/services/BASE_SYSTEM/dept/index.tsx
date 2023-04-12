import {request} from "../../../utils/Request";

const deptTree = {
    url: '/rest/dept/tree',
    method: 'POST',
};
export const getTree = async ()=>{
    const response = await request(deptTree.url,{
    });
    return response.data;
}