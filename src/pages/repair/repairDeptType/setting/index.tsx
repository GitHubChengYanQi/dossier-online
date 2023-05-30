import {BetaSchemaForm, GridContent, PageContainer, ProForm} from "@ant-design/pro-components";
import {useModel} from "@@/exports";
import {Button, FormInstance, Space, Table, Tag} from "antd";
import LinkButton from "@/components/LinkButton";
import React, {useRef, useState} from "react";
import SelectDict from "@/components/sysCompoents/selectDict";
import useAlert from "@/components/useAlert";
import {delRepairDeptTypeInfo, saveRepairDeptType} from "@/pages/repair/repairDeptType/service";
import {useRequest} from "umi";
import {request} from "@/utils/Request";

type SetDeptTypeProps = {
    deptId?: string;

    children?: any;

    onSuccess?: () => void;
    onCancel?: () => void;
}
const SetDeptType: React.FC<SetDeptTypeProps> = (props) => {

    const {deptId, onSuccess, onCancel} = props


    const formRef = useRef<FormInstance>();
    const {error, notification} = useAlert();

    return (
        <ProForm
            formRef={formRef}
            style={{maxWidth: 200}}
            onFinish={async (values) => {
                values.deptId = deptId;
                const response = await saveRepairDeptType(0, values);
                if (response.errCode !== 0) {
                    error(response.message);
                } else {
                    onSuccess?.();
                    notification.success({message: '操作成功'});
                }
            }}
            submitter={{
                render: () => {
                    return (
                        <Space>
                            <Button
                                type={"primary"}
                                onClick={() => {
                                    formRef.current?.submit();
                                }}>设置</Button>
                            <Button
                                onClick={onCancel}
                            >取消</Button>
                        </Space>
                    );
                }
            }}
        >
            <SelectDict
                keyConfig={{
                    valueName: "code"
                }}
                title={"工单类型"}
                name={"dictCode"}
                params={{
                    dictTypeCode: "repairTypeId"
                }}/>
        </ProForm>
    );
}
const DeptTypeSetting: React.FC = () => {

    const {data: deptData} = useModel("dept");
    const [editingKey, setEditingKey] = useState('');

    const {data, refresh} = useRequest(async () => {
        const {data} = await request("/repairDeptType/listSelect")
        return data;
    });
    const getDict = (deptId: string) => {
        const result = data ? data.filter((i: any) => `${i.deptId}` === `${deptId}`) : [];
        return result.map((i: any) => {
            return <Tag
                key={i.repairDeptTypeId}
                closable
                onClose={async () => {
                    await delRepairDeptTypeInfo(i.repairDeptTypeId)
                }}
            >{i.dictName}</Tag>
        });
    }

    const isEditing = (record: any) => record.value === editingKey;
    return (
        <PageContainer>
            <GridContent contentWidth={"Fixed"}>
                <Table
                    pagination={false}
                    rowKey={"value"}
                    dataSource={deptData}
                    columns={[
                        {
                            title: "部门名称",
                            dataIndex: "title"
                        },
                        {
                            title: "负责单据类型",
                            render: (value, record: any) => {
                                const editable = isEditing(record);
                                return (
                                    <Space>
                                        {editable ?
                                            <SetDeptType
                                                onSuccess={() => {
                                                    setEditingKey("")
                                                    refresh();
                                                }}
                                                onCancel={() => {
                                                    setEditingKey("")
                                                }}
                                                deptId={record.value}
                                            /> :
                                            <LinkButton onClick={() => {
                                                setEditingKey(record.value)
                                            }}>设置</LinkButton>}
                                        {getDict(record.value)}
                                    </Space>
                                );
                            }
                        }
                    ]}
                />
            </GridContent>
        </PageContainer>
    );
}
export default DeptTypeSetting;