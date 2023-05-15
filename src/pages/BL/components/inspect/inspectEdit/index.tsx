/**
 * 编辑页
 *
 * @author Sing
 * @Date 2023-05-11 15:18:10
 */

import React, {useRef, useState} from 'react';
import {

    ProFormGroup, ProFormInstance,
    ProFormList,
    ProFormMoney, ProFormSelect
} from "@ant-design/pro-components";
import {saveInspect} from "../service";
import useAlert from "@/components/useAlert";
import FormWrap, {FormWrapProps} from "@/components/FormWrap";
import PatientInfo from "@/pages/BL/components/patientInfo";
import {useRequest} from "umi";
import {request} from "@/utils/Request";
import {Col, Row} from "antd";

type InspectEditProps<T> = {
    inspectId: number;
    patientId?: number;
} & FormWrapProps<T>

// type optionsType = {
//     label: string;
//     value: string | number;
//     money: number;
//     disabled?: boolean;
// }

const InspectEdit = <T extends Record<string, any>>(props: InspectEditProps<T>) => {
    const {inspectId, type, open, onSuccess, onClose, width, patientId} = props;


    const {data} = useRequest(async () => {
        const response = await request("/hisConstConfig/selectType2");
        const data = response.data;
        return data ? data.map((item: any) => {
            return {
                label: item.medicalName,
                value: item.typeKey,
                money: item.money
            }
        }) : [];
    })
    const [currentRowData, setCurrentRowData] = useState([]);

    const ref = useRef<ProFormInstance>()

    const formatData = (data: []) => {
        if (!Array.isArray(data)) {
            return [];
        }
        // const currentRowData = ref.current?.getFieldValue("medicalIds");
        const keys = currentRowData.map((item: any) => {
            return item.medicalId || 0;
        });
        return data.map((item: any) => {
            return {
                label: item.label,
                value: item.value,
                money: item.money,
                disabled: keys.findIndex((i: any) => i === item.value) !== -1
            }
        });
    }

    const {error, notification} = useAlert();

    return (
        <FormWrap
            formRef={ref}
            open={open}
            type={type}
            onClose={() => {
                setCurrentRowData([]);
                onClose?.();
            }}
            width={width}
            initialValues={{
                medicalIds: [{}]
            }}
            onFinish={async (values) => {
                values.patientId = patientId;
                const response = await saveInspect(inspectId, values);
                if (response.errCode !== 0) {
                    error(response.message);
                } else {
                    onSuccess?.();
                    setCurrentRowData([]);
                    notification.success({message: '操作成功'});
                }
            }}
            onValuesChange={(values, allValues) => {
                setCurrentRowData(allValues.medicalIds)
            }}
            // layout={"horizontal"}
        >
            <PatientInfo patientId={patientId}/>
            <ProFormList
                // label={"检查项目"}
                creatorButtonProps={{
                    creatorButtonText: "增加一个检查项目"
                }}
                name={"medicalIds"}
                rules={[
                    {
                        required: true, message: "请至少选择一个检查项目", validator: (rule, value, callback) => {
                            return new Promise((resolve, reject) => {
                                if (value) {
                                    resolve(1)
                                }
                                reject();
                            })
                        }
                    }
                ]}
                itemRender={({listDom, action}, {record}) => {
                    return (
                        <Row

                            // extra={action}
                            // title={`检查项目`}
                            style={{
                                marginBlockEnd: 8,
                            }}
                        >
                            <Col span={20}>{listDom}</Col><Col>{action}</Col>
                        </Row>
                    );
                }}
            >
                {(f, index, action) => {
                    // console.log(f, index, action);

                    return (
                        <ProFormGroup>
                            <ProFormSelect
                                width={260}
                                label={"检查名称"}
                                name={"medicalId"}
                                fieldProps={{
                                    options: formatData(data),
                                    showSearch: true,
                                    onChange: (value, option: Record<string, any>) => {
                                        if (option) {
                                            action.setCurrentRowData({
                                                money: option.money
                                            })
                                        }
                                        // form.setFieldValue(`medicalIds`,form.getFieldValue("medicalIds"))
                                    }
                                }}
                                formItemProps={{
                                    rules: [
                                        {
                                            required: true, message: "检查表为必选项"
                                        }
                                    ]
                                }}
                            />
                            <ProFormMoney label={"金额"} key={"money"} name={"money"} formItemProps={{
                                rules: [
                                    {
                                        required: true, message: "金额为必填"
                                    }
                                ]
                            }}/>
                        </ProFormGroup>
                    )
                }}
            </ProFormList>
        </FormWrap>
    );
};

export default InspectEdit;
