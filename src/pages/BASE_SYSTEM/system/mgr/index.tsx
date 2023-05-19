import React, {useRef, useState} from 'react';
import {PageContainer, ProColumns, ProTable, ActionType} from "@ant-design/pro-components";
import {Button, Divider, Dropdown, Layout, Space, Spin, Tree, Typography} from "antd";
import EditButton from "@/components/EditButton";
import useUserField from "./schema";
import RoleSet from "../role/components/roleSet";
import useAlert from "@/components/useAlert";
import {getUserList, resetPassWord} from "@/services/BASE_SYSTEM/user";
import {RestUserResult} from "@/pages/BASE_SYSTEM/system/mgr/types";
import { useNavigate, useRequest} from "umi";
import {FormInstance} from "antd/lib";

import DeptTree from "@/pages/BASE_SYSTEM/system/mgr/components/deptTree";



export default function UserList() {

    const {modal} = useAlert();
    // const [, handleModalVisible] = useState(false);
    const [roleSet, handleRoleSet] = useState(false);
    const [treeLoading, setTreeLoading] = useState<boolean>(false);

    const [sDeptId, setSdeptId] = useState<string>("");


    const [editId, setEditId] = useState<number>(0);
    const [tableTitle, setTableTitle] = useState<string>("全部");

    const {Account, Birthday, CreateTime, DeptName, Name, PositionName, roleName, SexName, Status} = useUserField();


    const navigate = useNavigate();

    const columns: ProColumns[] = [
        {
            ...Account,
        },
        {
            ...Name,
        },
        {
            ...roleName,
        },
        {
            ...SexName,
        },
        {
            ...Birthday,
        },
        {
            ...DeptName,
        },
        {
            ...PositionName,
        },
        {
            ...CreateTime,
        },
        {
            ...Status,
        },
        // {
        //     hideInSearch: true
        // },
        {
            title: '操作',
            hideInForm: true,
            hideInSearch: true,
            width: 200,
            render: (value: any, record: any) => {
                return (
                    <Space size={0} split={<Divider type="vertical"/>}>
                        <a type='ghost' className="button-left-margin" onClick={() => {
                            setEditId(record.userId);
                            handleRoleSet(true);
                        }}>分配角色</a>
                        <a type='ghost' className="button-left-margin" onClick={() => {
                            modal.confirm({
                                title: '提示',
                                content: '系统初始化为111111，实际请参考系统设置。',
                                centered: true,
                                onOk: async () => {
                                    await resetPassWord(record.userId);
                                },
                                onCancel: () => {
                                }
                            });
                        }}>重置密码</a>
                        <EditButton onClick={() => {
                            // dfRef.current.open(record.userId);
                            // setEditId(record.userId);
                            // handleModalVisible(true)
                            navigate(`/BASE_SYSTEM/system/mgr/${record.userId}`)
                        }}/>
                    </Space>
                );
            }
        }
    ];

    const {run} = useRequest(async (params, sorter, filter) => {
        return  await getUserList<RestUserResult>(params, sorter, filter);

    }, {
        manual: true
    })

    const actionRef = useRef<ActionType>();
    const formRef = useRef<FormInstance>();


    return (
        <PageContainer>
            <Layout>
                <Layout.Sider theme={"light"} width={260} style={{marginRight: 16}}>
                    <Spin spinning={treeLoading}>
                        <DeptTree
                            editable
                            onSelect={(selectedKeys, info) => {
                            setTableTitle(info.node.title)
                            setSdeptId(`${selectedKeys[0]}`);
                            formRef.current?.submit();
                        }} />
                    </Spin>
                </Layout.Sider>
                <Layout.Content>
                    <ProTable<RestUserResult>
                        onLoadingChange={(v) => {
                            setTreeLoading(v as boolean)
                        }}
                        headerTitle={tableTitle}
                        scroll={{x: "max-content"}}
                        form={{
                            syncToUrl: true,
                        }}
                        actionRef={actionRef}
                        formRef={formRef}
                        search={{
                            filterType: "query"
                        }}
                        rowKey="userId"
                        columns={columns}
                        request={async (params, sorter, filter) => {
                            if(sDeptId){
                                params.deptId = sDeptId;
                            }
                            return await run(params, sorter, filter);

                        }}
                        toolBarRender={() => [
                            <>
                                <Button
                                    key="1"
                                    type="primary"
                                    onClick={() => {
                                        navigate(`/BASE_SYSTEM/system/mgr/0`)
                                        // handleModalVisible(true);
                                        // setEditId(0);
                                    }}
                                >
                                    添加成员
                                </Button></>,
                        ]}
                    />
                    <RoleSet
                        userId={editId}
                        modalVisible={roleSet}
                        onCancel={flag => {
                            handleRoleSet(false);
                            if (flag) actionRef?.current?.reload();
                        }}
                    /></Layout.Content>
            </Layout>
        </PageContainer>
    );
}
