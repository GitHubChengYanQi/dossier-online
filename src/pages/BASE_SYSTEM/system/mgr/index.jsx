import React, {useRef, useState} from 'react';
import styles from './index.less';
import {ModalForm, PageContainer, ProTable} from "@ant-design/pro-components";
import {request} from "../../../../utils/Request";
import {Button, Switch} from "antd";
import EditButton from "../../../../components/EditButton";
import EditForm from "./components/editForm";

import {Account, Birthday, CreateTime, DeptName, Name, PositionName, roleName, SexName, Status} from "./schema";
import RoleSet from "../role/components/roleSet";

const userList = {
    url: '/rest/mgr/list',
    method: 'POST',
};

export default function UserList() {

    const columns = [
        Account,
        Name,
        roleName,
        SexName,
        Birthday,
        DeptName,
        PositionName,
        CreateTime,
        Status,
        {
            title: '操作',
            align: 'right',
            hideInForm: true,
            hideInSearch: true,
            render: (value, record) => {
                return (
                    <>
                        <Button type='ghost' className="button-left-margin" onClick={() => {
                            setEditId(record.userId);
                            handleRoleSet(true);
                        }}>分配角色</Button>
                        <Button type='ghost' className="button-left-margin" onClick={() => {
                            Modal.confirm({
                                title: '提示',
                                content: '系统初始化为111111，实际请参考系统设置。',
                                onOk: () => {
                                    reset(record.userId);
                                },
                                onCancel: () => {
                                }
                            });
                        }}>重置密码</Button>
                        <EditButton onClick={() => {
                            // dfRef.current.open(record.userId);
                            setEditId(record.userId);
                            handleModalVisible(true)
                        }}/>
                    </>
                );
            }
        }
    ];

    const [createModalVisible, handleModalVisible] = useState(false);
    const [roleSet, handleRoleSet] = useState(false);
    const [editId, setEditId] = useState(null);

    const actionRef = useRef();


    return (
        <PageContainer
            header={{
                title: '用户管理',
                breadcrumb: {},
            }}>
            <ProTable
                actionRef={actionRef}
                search={{
                    filterType: ""
                }}
                rowKey="userId"
                columns={columns}
                request={async (params, sorter, filter) => {
                    const {data, success} = await request({
                        ...userList,
                        data: {
                            ...params
                        },
                        // FIXME: remove @ts-ignore
                        // @ts-ignore
                        sorter,
                        filter,
                    });
                    return {
                        data: data || [],
                        success: data ? true : false,
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
            >

            </ProTable>
            <EditForm
                id={editId}
                onCancel={(v) => {
                    if (v) actionRef.current.reload();
                    handleModalVisible(false);
                    setEditId(null);
                }}
                modalVisible={createModalVisible}

            />
            <RoleSet
                userId={editId}
                modalVisible={roleSet}
                onCancel={flag => {
                    handleRoleSet(false);
                    if (flag) actionRef.current.reload();
                }}
            />
        </PageContainer>
    );
}
