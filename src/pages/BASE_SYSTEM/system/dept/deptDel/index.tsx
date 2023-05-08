import {Typography} from "antd";
import React from "react";
import {request} from "@/utils/Request";
import DelButton from "@/components/DelButton";
import useAlert from "@/components/useAlert";
import {useModel} from "@@/exports";

const DeptDel = (props: { deptId: string }) => {

    const {deptId} = props;

    const {refresh} = useModel("dept");
    const {error, notification} = useAlert();

    return (
        <DelButton request={async () => {
            const response = await request("/rest/dept/delete",{
                method:"POST",
                data:{
                    deptId
                }
            })
            if (response.errCode !== 0) {
                error(response.message);
            } else {
                notification.success({message: '操作成功'});
                refresh();
            }
        }}>
            <Typography.Text
                type="danger">
                删除
            </Typography.Text>
        </DelButton>
    );
}
export default DeptDel;