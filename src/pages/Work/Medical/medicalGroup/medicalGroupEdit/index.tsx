/**
 * 检查分组编辑页
 *
 * @author 
 * @Date 2023-04-14 11:48:58
 */

import React from 'react';
import {BetaSchemaForm, ProForm} from "@ant-design/pro-components";
import useMedicalGroupField from "../schema";
import { saveMedicalGroup,getMedicalGroupInfo } from "../service";
import useAlert from "@/components/useAlert";

const MedicalGroupEdit = (props:any) => {
    const { medicalGroupId } = props;
    const {
          MedicalGroupId,
          Name,
          Code,
          CreateTime,
          CreateUser,
          UpdateTime,
          UpdateUser,
          Display,
        } = useMedicalGroupField();
    const columns = [
        MedicalGroupId,
        Name,
        Code,
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
                return getMedicalGroupInfo(medicalGroupId);
                }}
            onFinish={async (values) => {
                await saveMedicalGroup(medicalGroupId, values).catch((e) => {
                    error(e.message);
                });
                notification.success({message: '操作成功'});
                }}
            >
            <BetaSchemaForm layoutType="Embed" columns={columns}/>
        </ProForm>
    );
};

export default MedicalGroupEdit;
