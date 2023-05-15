import {useRequest} from "umi";
import {request} from "@/utils/Request";
import {  ProDescriptions} from "@ant-design/pro-components";
import React from "react";
import {Col, Row} from "antd";
import PatientInfo from "@/pages/BL/components/patientInfo";

type RenderMedicalProps = {
    resultId?: string | number;
    onSuccess?: (resultId: number | string) => void;
}

const RenderMedicalResult: React.FC<RenderMedicalProps> = (props) => {

    const {resultId} = props;


    const {data, loading} = useRequest(async () => {
        if(!resultId){
            return undefined;
        }
        const response = await request("/medicalResult/detail", {
            method: "GET",
            params: {
                resultId
            }
        });
        return response.data
    }, {
        refreshDeps: [resultId]
    })

    const getValueEnum = (config: any[]) => {
        const result: Record<string, any> = {};
        if (!Array.isArray(config)) {
            return null;
        }
        for (let i = 0; i < config.length; i++) {
            result[`${config[i].value}`] = {
                text: `${config[i].label}`
            }
        }
        return result;
    }
    const getColumns = (data: any[]) => {
        if (!Array.isArray(data)) {
            return [];
        }
        const columns = data.map((item: any) => {
            const result: Record<string, any> = {
                title: item.title,
                valueType: item.type,
                dataIndex: item.medicalItemId
            };
            if(!item.content){
                result['span'] = 2
            }
            // console.log(item)
            if (item.type !== "text" && item.type !== "textarea") {
                result['valueEnum'] = getValueEnum(item.config)
            }
            return result;
        });
        return columns;
    }

    const getValue = (data: any[])=>{
        if (!Array.isArray(data)) {
            return {};
        }
        const result: Record<string, any> = {}
        data.forEach((item:any)=>{
            result[`${item.medicalItemId}`] = item.value;
        });
        return  result
    }

    console.log(data)

    return (
        <Row
            gutter={[0,16]}
            >
            <PatientInfo patientId={data && data.patientId} />
            <Col>

        </Col>
            {data&&data.resultGroup.map((group:any)=>{
                return (
                    <Col key={group.medicalGroupId} >
                        <ProDescriptions
                            loading={loading}
                            column={2}
                            title={group.name}
                            dataSource={getValue(group.itemValue)}
                            columns={getColumns(group.itemValue)}

                        />
                    </Col>
                );
            })}
        </Row>
    );
}
export default RenderMedicalResult;