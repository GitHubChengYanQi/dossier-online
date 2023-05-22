import React, {useRef, useState} from 'react';
import {ActionType, PageContainer, ProTable} from "@ant-design/pro-components";
import {pageRequest} from "@/utils/Request";
import {Button} from "antd";
import EditButton from "@/components/EditButton";
import {ColumnsType} from "@/types/common";
import {history} from "umi"
import useDictTypeField from "@/pages/BASE_SYSTEM/system/dictType/schema";
import LinkButton from "@/components/LinkButton";
import DictTypeEdit from "@/pages/BASE_SYSTEM/system/dictType/edit";

const dictTypeList = {
    url: '/rest/dictType/list',
    method: 'POST',
    rowKey: 'dictTypeId'
};
export default function DictTypeList() {


    const [dictTypeId, setDictTypeId] = useState(0);
    const [open, setOpen] = useState(false)
    const actionRef = useRef<ActionType>();
    const {
        simpleName,
        code,
        systemFlag,
        description,
        status,sort
    } = useDictTypeField();

    const columns: ColumnsType[] = [
        simpleName,
        code,
        systemFlag,
        description,
        status,
        sort,
        {
            title: '操作',
            width: 120,
            render: (value, record) => {
                return (
                    <>
                        <EditButton onClick={() => {
                            // ref.current.open(record.deptId);
                            setDictTypeId(record.dictTypeId);
                            setOpen(true);

                        }}></EditButton>
                    </>
                );
            }
        },
    ];

    return (
        <PageContainer>
            <ProTable
                actionRef={actionRef}
                rowKey="dictTypeId"
                columns={columns}
                request={async (params, sorter, filter) => {
                    const {data, success} = await pageRequest(dictTypeList.url, {
                        ...params,
                        // FIXME: remove @ts-ignore
                        // @ts-ignore
                        sorter,
                        filter,
                    });
                    return {
                        data: data || [],
                        success: success,
                    };
                }}
                toolBarRender={()=>{
                    return[
                        <Button
                            key="1"
                            type="primary"
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            新建
                        </Button>
                    ];
                }}
            />
            <DictTypeEdit
                dictTypeId={dictTypeId}
                open={open}
                onClose={() => {
                    setOpen(false)
                    setDictTypeId(0);
                }}
                onSuccess={(v) => {
                    setOpen(false);
                    setDictTypeId(0)
                    actionRef.current?.reload(v);
                }}
            />
        </PageContainer>
    );
}
