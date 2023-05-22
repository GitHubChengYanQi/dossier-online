import {ActionType, PageContainer, ProTable} from "@ant-design/pro-components";
import useDictField from "@/pages/BASE_SYSTEM/system/dict/schema";
import {Button, Drawer} from "antd";
import DictEdit from "@/pages/BASE_SYSTEM/system/dict/edit";
import {ColumnsType} from "@/types/common";
import {pageRequest} from "@/utils/Request";
import {useParams} from "umi";
import React, {useRef, useState} from "react";
import LinkButton from "@/components/LinkButton";

const DictList = () => {

    const {dictType, name, code, status, description,sort} = useDictField();

    const [dictId, setDictId] = useState<number>(0);
    const [open, setOpen] = useState(false);

    const {type: dictTypeId} = useParams();

    const actionRef = useRef<ActionType>();

    const columns: ColumnsType[] = [
        dictType,
        name,
        code,
        status,
        description,
        sort,
        {
            title: "操作",
            width: 120,
            render: (dom, entity) => {
                return (
                    <LinkButton onClick={() => {
                        setDictId(entity.dictId);
                        setOpen(true);
                    }}>编辑</LinkButton>
                );
            }
        }
    ];


    return (
        <PageContainer

        header={{
            title:"字典管理"
        }}>
            <ProTable
                actionRef={actionRef}
                rowKey={"dictId"}
                columns={columns}
                params={{
                    dictTypeId
                }}
                request={async (params) => {
                    console.log(params)
                    return await pageRequest("/rest/dict/list", {
                        data: params
                    })
                }}
                toolBarRender={() => [
                    <>
                        <Button
                            key="1"
                            type="primary"
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            新建
                        </Button>
                    </>,
                ]}
            />
            <DictEdit
                width={480}
                open={open}
                dictId={dictId}
                onClose={() => {
                    setDictId(0);
                    setOpen(false);
                }}
                onSuccess={(v)=>{
                    actionRef.current?.reload(v);
                    setDictId(0);
                    setOpen(false);
                }}
            />
        </PageContainer>
    );
}
export default DictList;