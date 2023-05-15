import {request} from "@/utils/Request";
import {ActionType, ProDescriptions} from "@ant-design/pro-components";
import React, {useRef } from "react";
import { Result} from "antd";

type PatientInfoProps = {
    patientId?: string | number;
}

const PatientInfo: React.FC<PatientInfoProps> = (props) => {

    const {patientId} = props;

    const ref = useRef<ActionType>();

    if (!patientId) {
        return (
            <Result
                title="请选择患者后继续操作"
            />
        )
    }

    return (
        <ProDescriptions
            actionRef={ref}
            column={3}
            title="患者信息"
            params={{
                patientId
            }}
            request={async (params) => {
                if(params.patientId>0){
                    return  await request("/hisPatient/detail", {
                        method: "GET",
                        params
                    })
                }else{
                    return undefined
                }

            }}
            columns={[
                {
                    title: "姓名",
                    dataIndex: "name"
                },
                {
                    title: "年龄",
                    dataIndex: "age"
                },
                {
                    title: "性别",
                    dataIndex: "gender",
                    valueEnum: {
                        M: {
                            text: "男"
                        },
                        F: {
                            text: "女"
                        }
                    }
                },
                {
                    title: "证件号码",
                    dataIndex: "idNumber"
                },
                {
                    title: "生日",
                    dataIndex: "birthday",
                    valueType: "date"
                }
            ]}

        />
    );
}
export default PatientInfo;