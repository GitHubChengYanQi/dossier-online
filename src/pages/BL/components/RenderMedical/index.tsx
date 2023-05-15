import FormWrap from "@/components/FormWrap";
import {useRequest} from "umi";
import {request} from "@/utils/Request";
import {ActionType, BetaSchemaForm, ProCard, ProDescriptions} from "@ant-design/pro-components";
import React, {useRef, useState} from "react";
import {Affix, Button, Col, Result, Row, Space} from "antd";
import useAlert from "@/components/useAlert";
import PatientInfo from "@/pages/BL/components/patientInfo";

type RenderMedicalProps = {
    patientId?: string | number;
    medicalId: string | number | undefined;
    inspectId?:number;

    onSuccess?: (resultId: number | string) => void;
}

const RenderMedical: React.FC<RenderMedicalProps> = (props) => {

    const {patientId, medicalId, inspectId,onSuccess} = props;

    const [result, setResult] = useState<boolean>(false);


    const {data} = useRequest(async () => {
        const response = await request("/medical/detail", {
            method: "GET",
            params: {
                medicalId
            }
        });
        return response.data;
    });

    const getValueEnum = (config: any[]) => {
        const result: Record<string, any> = {};
        for (let i = 0; i < config.length; i++) {
            result[`${config[i].value}`] = {
                text: `${config[i].label}`
            }
        }
        return result;
    }
    const getColumns = (data: any[]) => {
        const columns = data.map((item: any) => {
            const result: Record<string, any> = {
                title: item.title,
                valueType: item.type,
                dataIndex: item.medicalItemId
            };
            if (item.type !== "text" && item.type !== "textarea") {
                result['valueEnum'] = getValueEnum(item.config)
            }
            return result;
        });
        return (
            <BetaSchemaForm layoutType={"Embed"} columns={columns}/>
        );
    }

    const {error, notification} = useAlert();


    if (result) {
        return (
            <Result
                status="success"
                title="操作成功!"
                subTitle="用户资料已保存成功."
                extra={[

                    <Button
                        key="buy"
                        onClick={() => {
                            setResult(false);
                        }}
                    >继续操作</Button>,
                ]}
            />
        );
    }

    if (!patientId) {
        return (
            <Result
                title="请选择患者后继续操作"
            />
        )
    }

    return (
        <>
            <PatientInfo patientId={patientId} />

            <FormWrap
                isPage={false}
                type={"Form"}
                layout={"horizontal"}
                labelCol={{span: 6}}
                wrapperCol={{span: 12}}
                submitter={{
                    render: (props, doms) => {
                        return (
                            <Affix offsetBottom={0}>
                                <ProCard>
                                    <Row>
                                        <Col span={12} offset={6}>
                                            <Space>{doms}</Space>
                                        </Col>
                                    </Row>
                                </ProCard>
                            </Affix>
                        );
                    },
                }}
                onFinish={async (values) => {
                    const response = await request("/medicalResult/add", {
                        data: {
                            inspectId,
                            patientId,
                            medicalId,
                            itemData: values
                        }
                    })
                    if (response.errCode !== 0) {
                        error(response.message);
                    } else {
                        setResult(true)
                        onSuccess?.(response.data);
                        notification.success({message: '操作成功'});
                    }
                }}
            >
                <ProCard
                    gutter={[0, 24]}
                    // split={"horizontal"}
                    direction="column"
                    ghost
                >

                    {data && data.medicalGroupId.map((item: any) => {
                        return (
                            <ProCard
                                colSpan={24}
                                type="inner"
                                headerBordered
                                bordered
                                title={item.medicalGroupName}
                                key={item.medicalGroupId}
                            >
                                {getColumns(item.medicalItems)}
                            </ProCard>
                        );
                    })}
                </ProCard>
            </FormWrap>
        </>
    );
}
export default RenderMedical;