import React, {useRef, useState} from 'react';
import {ActionType, PageContainer, ProColumns, ProTable} from "@ant-design/pro-components";
import EditButton from "@/components/EditButton";
import {delRoleInfo, getRoleList} from "@/services/BASE_SYSTEM/role";
import {RestRoleResult} from "./types";
import useRoleField from "./schema";
import TableOptionsWrap from "@/components/TableOptionsWrap";
import RoleEdit from "./components/RoleEdit";
import {Button, Divider, Space} from "antd";
import DelButton from "@/components/DelButton";
import useAlert from "@/components/useAlert";
import SetPermission from "@/pages/BASE_SYSTEM/system/role/components/SetPermission";


export default function RoleList() {

    const [open, setOpen] = useState<boolean>(false);
    const [permissionOpen, setPermissionOpen] = useState<boolean>(false);
    const [editId, setEditId] = useState<number>(0);

    const actionRef = useRef<ActionType>();
    const {Name, description} = useRoleField();

    const {error} = useAlert();

    const columns: ProColumns[] = [
        Name,
        description,
        {
            title: '操作',
            width: 360,
            align: 'right',
            hideInSearch:true,
            render: (value: any, record: RestRoleResult) => {
                return (
                    <Space size={0} split={<Divider type="vertical"/>}>
                        <a
                            type="dashed"
                            className="button-left-margin"
                            onClick={() => {
                                setEditId(record.roleId);
                                setPermissionOpen(true);
                            }}>权限配置</a>
                        <EditButton onClick={() => {
                            setEditId(record.roleId);
                            setOpen(true);
                        }}/>
                        <DelButton request={async () => {
                            const response = await delRoleInfo(record.roleId);
                            if (response.errCode !== 0) {
                                error(response.message);
                            } else {
                                actionRef.current?.reload();
                            }
                        }}/>
                    </Space>
                );
            }
        }
    ];

    return (
        <PageContainer
            header={{
            }}>
            <ProTable<RestRoleResult>
                actionRef={actionRef}
                rowKey="roleId"
                columns={columns}
                request={async (params, sorter, filter) => {
                    return await getRoleList<RestRoleResult>(params, sorter, filter);
                }}
                toolBarRender={() => [
                    <>
                        <Button
                            key="1"
                            type="primary"
                            onClick={() => {
                                setOpen(true);
                                setEditId(0);
                            }}
                        >
                            新建
                        </Button></>,
                ]}
            >

            </ProTable>
            <RoleEdit
                editId={editId}
                open={open}
                onOpenChange={(v) => {
                    if (!v) {
                        setEditId(0);
                    }
                    setOpen(v);
                }}
                onReload={() => {
                    actionRef.current?.reload()

                }}
            />
            <SetPermission
                editId={editId}
                open={permissionOpen}
                onClose={() => {
                setPermissionOpen(false)
            }}/>
        </PageContainer>
    );
}
