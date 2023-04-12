import React, {useRef, useState} from 'react';
import {PageContainer, ProColumns, ProTable,ActionType} from "@ant-design/pro-components";
import {Button} from "antd";
import EditButton from "@/components/EditButton";
import EditForm from "./components/editForm";
import useUserField from "./schema";
import RoleSet from "../role/components/roleSet";
import useAlert from "@/components/useAlert";
import {getUserList, resetPassWord} from "@/services/BASE_SYSTEM/user";
import TableOptionsWrap from "@/components/TableOptionsWrap";
import {RestUserResult} from "@/pages/BASE_SYSTEM/system/mgr/types";



export default function UserList() {

    const {modal} = useAlert();
    const [createModalVisible, handleModalVisible] = useState(false);
    const [roleSet, handleRoleSet] = useState(false);
    const [editId, setEditId] = useState<number>(0);
    const {Account, Birthday, CreateTime, DeptName, Name, PositionName, roleName, SexName, Status} = useUserField();
    const columns: ProColumns[] = [
        {
            ...Account,
            width: 120
        },
        {
            ...Name,
            width: 120
        },
        {
            ...roleName,
            width: 120
        },
        {
            ...SexName,
            width: 60
        },
        {
            ...Birthday,
            width: 120
        },
        {
            ...DeptName,
            width: 120
        },
        {
            ...PositionName,
            width: 120
        },
        {
            ...CreateTime,
            width: 160
        },
        {
            ...Status,
            width: 80
        },
        // {
        //     hideInSearch: true
        // },
        {
            title: '操作',
            align: 'right',
            hideInForm: true,
            hideInSearch: true,
            width: 300,
            render: (value: any, record: any) => {
                return (
                    <TableOptionsWrap>
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
                            setEditId(record.userId);
                            handleModalVisible(true)
                        }}/>
                    </TableOptionsWrap>
                );
            }
        }
    ];


    const actionRef = useRef<ActionType>();


    return (
        <PageContainer>
            <ProTable<RestUserResult>
                scroll={{x: "max-content"}}
                form={{
                    syncToUrl: true
                }}
                actionRef={actionRef}
                search={{
                    filterType: "query"
                }}
                rowKey="userId"
                columns={columns}

                request={async (params, sorter, filter) => {

                    const {data, success} = await getUserList<RestUserResult>(params, sorter, filter);

                    return {
                        data: data || [],
                        success
                    };
                }}
                toolBarRender={() => [
                    <>
                        <Button
                            key="1"
                            type="primary"
                            onClick={() => {
                                handleModalVisible(true);
                                setEditId(0);
                            }}
                        >
                            新建
                        </Button></>,
                ]}
            />
            <EditForm
                userId={editId}
                onCancel={(v) => {
                    if (v) actionRef?.current?.reload();
                    handleModalVisible(false);
                    setEditId(0);
                }}
                modalVisible={createModalVisible}

            />
            <RoleSet
                userId={editId}
                modalVisible={roleSet}
                onCancel={flag => {
                    handleRoleSet(false);
                    if (flag) actionRef?.current?.reload();
                }}
            />
        </PageContainer>
    );
}
