import {Typography} from "antd";
import {pageRequest} from "@/utils/Request";
import {ProList, ProTable} from "@ant-design/pro-components";
import React from "react";

type PatientLeftListProps = {
    onChange?: (patientId: number) => void;
}

const PatientLeftList: React.FC<PatientLeftListProps> = (props) => {

    const {onChange} = props;

    return (
        <ProTable
            rowKey="patientId"
            polling={50000}
            // toolbar={{}}
            search={{
                defaultColsNumber: 1,
                defaultCollapsed:false,
                layout: "vertical",
            }}
            columns={
                [
                    {
                        title: "患者姓名",
                        dataIndex: "name"
                    },
                    {
                        title: "证件号码",
                        dataIndex: 'idNumber',
                    },
                    {
                        title: "范围",
                        valueType: "radio",
                        dataIndex: "type",
                        initialValue: "me",
                        valueEnum: {
                            me: {
                                text: "我的患者"
                            },
                            all: {
                                text: "所有患者"
                            }
                        },
                        hideInTable: true
                    },
                    {
                        title:"选择",
                        hideInSearch: true,
                        render: (_, record) => {
                            return <Typography.Link
                                onClick={() => {
                                    onChange?.(record.patientId)
                                }}
                            >选择</Typography.Link>;
                        },
                    },
                ]}
            request={async (params) => {
                const response = await pageRequest("/hisPatient/listByRegister", {
                    data: params
                })
                return response;
            }}
            onRow={(record) => {
                return {
                    onClick: () => {
                        onChange?.(record.patientId)
                    },
                };
            }}
        />
    );
}
export default PatientLeftList;