import {Modal} from "antd";

export const error = (message: string)=>{
    Modal.error({
        title:"操作失败",
        content:message
    });
}