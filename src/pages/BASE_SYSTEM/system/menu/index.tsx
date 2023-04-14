import React, {useRef, useState} from 'react';
import {ActionType, PageContainer, ProTable} from "@ant-design/pro-components";
import {pageRequest, request} from "@/utils/Request";
import EditButton from "@/components/EditButton";
import DelButton from "@/components/DelButton";
import {ColumnsType} from "@/types/common";
import useMenuField from "./schema";
import {Button} from "antd";
import MenuEdit from "@/pages/BASE_SYSTEM/system/menu/menuEdit";
import {menuRemove, menuTreeList} from "@/pages/BASE_SYSTEM/system/menu/service";

export default function MenuList() {

    const [open, setOpen] = useState<boolean>(false);
    const [editId, setEditId] = useState<number>(0);
    const {Label, value} = useMenuField();
    const actionRef = useRef<ActionType>();
    const columns: ColumnsType[] = [
        Label,
        value,
        {
            title: '操作',
            align: 'right',
            width: 260,
            valueType: 'option',
            render: (value, record) => {
                return (
                    <>
                        <EditButton onClick={() => {
                            setEditId(record.id)
                            setOpen(true);
                        }}/>
                        <DelButton request={async () => {
                            const response = await request(menuRemove.url, {
                                params: {
                                    menuId: record.id
                                }
                            });
                            actionRef.current?.reload();
                            return response;
                        }}/>
                    </>
                );
            }
        },
    ];
    const formatData = (data: any): any => {
        if (!Array.isArray(data)) return [];
        return data.map(item => {
            return {
                ...item,
                children: item.children && item.children.length > 0 ? formatData(item.children) : undefined
            }
        })
    }

    return (
        <PageContainer>
            <ProTable
                rowKey="id"
                actionRef={actionRef}
                columns={columns}
                request={async (params, sorter, filter) => {
                    const {data, success} = await pageRequest(menuTreeList.url, {
                        ...params,
                        // FIXME: remove @ts-ignore
                        // @ts-ignore
                        sorter,
                        filter,
                    });
                    console.log(success)
                    return {
                        data: formatData(data) || [],
                        success: !!data,
                    };
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
            />
            <MenuEdit open={open} editId={editId} onOpenChange={(v) => {
                setOpen(v);
                actionRef.current?.reload();
            }}/>
        </PageContainer>
    );
}
