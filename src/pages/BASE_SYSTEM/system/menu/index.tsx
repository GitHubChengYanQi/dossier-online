import React, {useRef, useState} from 'react';
import {ActionType, PageContainer, ProTable} from "@ant-design/pro-components";
import {pageRequest, request} from "@/utils/Request";
import EditButton from "@/components/EditButton";
import DelButton from "@/components/DelButton";
import {ColumnsType} from "@/types/common";
import useMenuField from "./schema";
import {Button, Divider, Space, Typography} from "antd";
import MenuEdit from "@/pages/BASE_SYSTEM/system/menu/menuEdit";
import {menuRemove, menuTreeList} from "@/pages/BASE_SYSTEM/system/menu/service";
import TableOptionsWrap from "@/components/TableOptionsWrap";
import {PlusOutlined} from "@ant-design/icons";

export default function MenuList() {

    const [open, setOpen] = useState<boolean>(false);
    const [editId, setEditId] = useState<number>(0);
    const [pid, setPid] = useState<number>(0);

    const {Label, value,sort} = useMenuField();
    const actionRef = useRef<ActionType>();
    const columns: ColumnsType[] = [
        Label,
        sort,
        value,
        {
            title: '操作',
            align: 'right',
            width: 260,
            valueType: 'option',
            render: (value, record) => {
                return (
                    <Space size={0} split={<Divider type="vertical"/>}>
                        <Typography.Link onClick={()=>{
                            setPid(record.id)
                            setOpen(true);
                        }}>添加子菜单</Typography.Link>
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
                    </Space>
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
                    return {
                        data: formatData(data) || [],
                        success: !!data,
                    };
                }}
                toolBarRender={() =>{
                    return [<>
                        <Button
                            key="1"
                            type="primary"
                            onClick={() => {
                                setPid(0)
                                setOpen(true);
                                setEditId(0);
                            }}
                        >
                            新建
                        </Button>
                    </>]
                }}
            />
            <MenuEdit
                pid={pid}
                open={open} editId={editId} onOpenChange={(v) => {
                setOpen(v);
                actionRef.current?.reload();
            }}/>
        </PageContainer>
    );
}
