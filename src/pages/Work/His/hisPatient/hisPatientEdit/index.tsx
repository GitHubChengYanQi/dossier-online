/**
 * 病人表编辑页
 *
 * @author Sing
 * @Date 2023-05-03 19:52:48
 */

import React from 'react';
import {BetaSchemaForm} from "@ant-design/pro-components";
import useHisPatientField from "../schema";
import { saveHisPatient,getHisPatientInfo } from "../service";
import useAlert from "@/components/useAlert";
import FormWrap,{FormWrapProps} from "@/components/FormWrap";

type HisPatientEditProps<T> = {
    patientId:number
} & FormWrapProps<T>

const HisPatientEdit = <T extends Record<string, any>>(props: HisPatientEditProps<T>) => {
    const { patientId, type, open , onSuccess, onClose, width } = props;
    const {
          PatientId,
          Name,
          Birthday,
          Age,
          Mobile,
          Gender,
          IdType,
          IdNumber,
          Nation,
          Education,
          Domicile,
          Residence,
          CreateTime,
          CreateUser,
          UpdateTime,
          UpdateUser,
          Display,
        } = useHisPatientField();
    const columns = [
        PatientId,
        Name,
        Birthday,
        Age,
        Mobile,
        Gender,
        IdType,
        IdNumber,
        Nation,
        Education,
        Domicile,
        Residence,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
        ];

    const {error,notification} = useAlert();

    return (
        <FormWrap
            open={open}
            type={type}
            onClose={onClose}
            width={width}
            request={async () => {
                return getHisPatientInfo(patientId);
            }}
            onFinish={async (values) => {
                const response = await saveHisPatient(patientId, values);
                if (response.errCode !== 0) {
                    error(response.message);
                } else {
                    onSuccess?.();
                    notification.success({message: '操作成功'});
                }
            }}
        >
            <BetaSchemaForm layoutType="Embed" columns={columns}/>
        </FormWrap>
    );
};

export default HisPatientEdit;
