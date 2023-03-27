import {request} from "../../../utils/Request";
const positionAllList = {
    url: '/rest/position/listPositions',
    method: 'POST',
};
export const getAll = async ()=>{
    const response = await request({
        ...positionAllList
    });
    return response.data;
}