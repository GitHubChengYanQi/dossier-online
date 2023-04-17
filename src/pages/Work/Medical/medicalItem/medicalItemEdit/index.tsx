/**
 * 检查项目配置编辑页
 *
 * @author 
 * @Date 2023-04-14 11:48:58
 */

import React from 'react';
import {BetaSchemaForm, ProForm} from "@ant-design/pro-components";
import useMedicalItemField from "../schema";
import { saveMedicalItem,getMedicalItemInfo } from "../service";
import useAlert from "@/components/useAlert";

const MedicalItemEdit = (props:any) => {
    const { medicalItemId } = props;
    const {
          MedicalItemId,
          MedicalGroupId,
          Title,
          Type,
          Config,
          Sort,
          CreateTime,
          CreateUser,
          UpdateTime,
          UpdateUser,
          Display,
        } = useMedicalItemField();
    const columns = [
        MedicalItemId,
        MedicalGroupId,
        Title,
        Type,
        Config,
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
        ];

    const {error,notification} = useAlert();

    return (
        <ProForm
            request={async () => {
                return getMedicalItemInfo(medicalItemId);
                }}
            onFinish={async (values) => {
                await saveMedicalItem(medicalItemId, values).catch((e) => {
                    error(e.message);
                });
                notification.success({message: '操作成功'});
                }}
            >
            <BetaSchemaForm layoutType="Embed" columns={columns}/>
        </ProForm>
    );
};

export default MedicalItemEdit;
