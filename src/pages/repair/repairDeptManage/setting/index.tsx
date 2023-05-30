/**
 * 部门负责小区分区设置列表页
 *
 * @author Sing
 * @Date 2023-05-26 21:49:05
 */

import React, {useRef, useState} from 'react';
import {delRepairDeptManageInfo, saveRepairDeptManage} from "../service";
import {PageContainer, ProCard, BetaSchemaForm, ProForm} from "@ant-design/pro-components";
import {Button, Layout, Empty, Form, Select, Col, FormInstance, Spin, Row, Tag} from "antd";
import useAlert from "@/components/useAlert";
import DeptTree from "@/pages/BASE_SYSTEM/system/mgr/components/deptTree";
import CitySelect, {CityType} from "@/components/CitySelect";
import {selectBuildAreaInfo} from "@/pages/Estate/buildArea/service";
import {styled, useRequest} from "umi";
import {request} from "@/utils/Request";


const Loading = styled.div`
  text-align: center;
  padding: 20px;
`
type formatDataType = {
    repairDeptManageId: number;
    deptId: number;

    deptName: string;

    areaId: number;
    areaName: string;

    partitionId: number;

    partitionName: string;

    children?: formatDataType[];
}


const formatData = (input: formatDataType[], deptId?: string | number) => {

    const result: formatDataType[] = [];
    const data = deptId ? input.filter((i: formatDataType) => `${i.deptId}` === `${deptId}`) : input;
    data.forEach((dept) => {
        const index = result.findIndex((i: any) => i.deptId === dept.deptId);
        if (index === -1) {
            const areaResult: formatDataType[] = [];
            data.forEach((area) => {
                const index = areaResult.findIndex((i: any) => i.areaId === area.areaId && i.deptId === dept.deptId);

                if (index === -1) {
                    const partitionResult: formatDataType[] = [];
                    data.forEach((partition) => {
                        if (partition.deptId === dept.deptId && partition.areaId === area.areaId) {
                            partitionResult.push(partition);
                        }
                    });
                    if (area.deptId === dept.deptId) {
                        areaResult.push({
                            ...area,
                            children: partitionResult
                        })
                    }
                }

            });
            result.push({
                ...dept,
                children: areaResult
            })
        }
    });
    return result;
}
const RepairDeptManageSetting = () => {

        const [deptId, setDeptId] = useState<string>();
        const [deptName, setDeptName] = useState<string>();

        const {error, notification} = useAlert();

        const formRef = useRef<FormInstance>();

        const [cityTmpData, setCityData] = useState<CityType>({
            province: "503",
            city: "600"
        });

        const [areaData, setAreaData] = useState<any[]>();
        const [partitionData, setPartitionData] = useState<any[]>();


        const {data, loading, refresh} = useRequest(async () => {
            const {data} = await request("/repairDeptManage/listSelect", {
                params: {
                    // deptId
                }
            });
            return data;
        }, {
            refreshDeps: []
        });

        const rdmIds: number[] | undefined = data?.map((i: formatDataType) => i.partitionId);


        return (
            <PageContainer>
                <Layout>
                    <Layout.Sider theme={"light"} width={260} style={{marginRight: 32}}>
                        <DeptTree
                            onSelect={(selectedKeys, info) => {
                                // console.log(selectedKeys, info)/**/
                                setDeptId(info.node.value)
                                setDeptName(info.node.title);
                            }}/>
                    </Layout.Sider>
                    <Layout.Content>
                        <ProCard
                            gutter={[16, 0]}
                            split={"vertical"}

                        >
                            <ProCard
                                split={"horizontal"}
                                title={"部门负责区域设置"}
                                subTitle={deptName}
                                headerBordered
                            >
                                {loading && <Loading><Spin/></Loading>}
                                {!loading && data ? formatData(data, deptId).map((i: formatDataType) => {
                                    return (
                                        <ProCard
                                            key={i.deptId}
                                            split={"vertical"}
                                        >
                                            <ProCard
                                                colSpan={4}
                                            >
                                                {i.deptName}
                                            </ProCard>
                                            <ProCard
                                                colSpan={20}
                                                ghost
                                                split={"horizontal"}
                                            >
                                                {i.children?.map((area: formatDataType) => {
                                                    return (
                                                        <ProCard
                                                            key={area.areaId}
                                                            split={"vertical"}
                                                            ghost
                                                        >
                                                            <ProCard
                                                                colSpan={6}
                                                            >
                                                                {area.areaName}
                                                            </ProCard>
                                                            <ProCard
                                                                colSpan={18}
                                                            >
                                                                {area.children?.map((partition: formatDataType) => {
                                                                    return (
                                                                        <Tag
                                                                            key={partition.repairDeptManageId}
                                                                            closable onClose={async () => {
                                                                            await delRepairDeptManageInfo(partition.repairDeptManageId);
                                                                            refresh();
                                                                        }}
                                                                        >{partition.partitionName}</Tag>
                                                                    );
                                                                })}
                                                            </ProCard>
                                                        </ProCard>
                                                    );
                                                })}
                                            </ProCard>
                                        </ProCard>
                                    );
                                }) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
                            </ProCard>
                            <ProCard
                                colSpan={"500px"}
                                title={"待选择项"}
                                headerBordered
                            >
                                <ProForm
                                    formRef={formRef}
                                    colProps={{
                                        span: 8
                                    }}
                                    // labelCol={{span:8}}
                                    onValuesChange={(changedValues) => {
                                        const {areaId} = changedValues;
                                        if (areaId) {
                                            formRef.current?.resetFields(["partitionId"])
                                            const tmp = areaData?.find((i: any) => {
                                                return i.id === areaId;
                                            });
                                            setPartitionData(tmp.partitionList)
                                        }
                                    }}
                                    onFinish={async (values: Record<string, any>) => {
                                        values.deptId = deptId;
                                        const response = await saveRepairDeptManage(0, values);
                                        if (response.errCode !== 0) {
                                            error(response.message)
                                        } else {
                                            refresh();
                                            notification.success({
                                                message: "设置成功"
                                            });
                                        }
                                    }}
                                    submitter={{
                                        render: () => {
                                            return (
                                                <Button
                                                    type={"primary"}
                                                    onClick={() => {
                                                        formRef.current?.submit();
                                                    }}>设置到部门</Button>
                                            );
                                        }
                                    }}
                                >
                                    <Form.Item
                                        label={"省/市/区"}>
                                        <CitySelect
                                            value={cityTmpData}
                                            onChange={(values) => {
                                                setCityData(values)
                                            }}
                                        />
                                    </Form.Item>
                                    <BetaSchemaForm
                                        layoutType={"Embed"}
                                        columns={[
                                            {
                                                title: "小区",
                                                valueType: "select",
                                                params: {
                                                    areaId: cityTmpData?.area
                                                },
                                                dataIndex: "areaId",
                                                request: async () => {
                                                    // console.log(areaId)
                                                    const response = await selectBuildAreaInfo(cityTmpData?.area || 0);
                                                    setAreaData(response.data);
                                                    return response.data.map((i: any) => {
                                                        return {
                                                            label: i.name,
                                                            key: i.id,
                                                            value: i.id,
                                                        }
                                                    });
                                                }
                                            }
                                        ]}
                                    />

                                    <Form.Item
                                        name={"partitionId"}
                                        style={{minWidth: 120}}
                                        label={"分区"}
                                    >
                                        <Select
                                            placeholder={"请选择"}
                                            options={partitionData ? partitionData.map((i: any) => {

                                                const index = data.findIndex((j: any) => j.partitionId === i.id);
                                                return {
                                                    label: i.name + (index !== -1 ? ("[" + data[index].deptName + "]") : ""),
                                                    value: i.id,
                                                    disabled: rdmIds?.findIndex((j: number) => i.id === j) !== -1
                                                }
                                            }) : []}
                                        />
                                    </Form.Item>

                                </ProForm>

                            </ProCard>
                        </ProCard>
                    </Layout.Content>
                </Layout>

            </PageContainer>
        )
            ;
    }
;

export default RepairDeptManageSetting;
