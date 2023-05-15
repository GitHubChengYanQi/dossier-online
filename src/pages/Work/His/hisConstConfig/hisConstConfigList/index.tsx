/**
 * 费用配置表列表页
 *
 * @author Sing
 * @Date 2023-04-26 15:21:31
 */

import React, {useRef,useState} from 'react';
import useHisConstConfigField from "../schema";
import {delHisConstConfigInfo,getHisConstConfigList} from "../service";
import HisConstConfigEdit from "../hisConstConfigEdit";
import EditButton from "@/components/EditButton";
import {PageContainer, ProTable,ActionType} from "@ant-design/pro-components";
import {Button, Space, Typography} from "antd";
import {ColumnsType} from "@/types/common";
import DelButton from "@/components/DelButton";
import useAlert from "@/components/useAlert";

const HisConstConfigList = () => {

    const [editId,setEditId] = useState<number>(0);
    const [open,setOpen] = useState<boolean>(false);

    const {error, notification} = useAlert();

    const actionRef = useRef<ActionType>();

    const {
        CostConfigId,
        ConstName,
        Type,
        TypeKey,
        Money,
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    } = useHisConstConfigField();

    const columns:ColumnsType[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        CostConfigId,
        ConstName,
        Type,
        TypeKey,
        Money,
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
        {
            title: "操作",
            width:120,
            hideInSearch:true,
            render:(value: any, record: any)=>{
                return(
                    <Space>
                        <EditButton onClick={()=>{
                            setEditId(record.costConfigId);
                            setOpen(true)
                        }} />
                        <Typography.Link />
                        <DelButton request={async () => {
                            const response = await delHisConstConfigInfo(record.costConfigId);
                            if (response.errCode !== 0) {
                                error(response.message);
                            } else {
                                actionRef?.current?.reload();
                                notification.success({message: '操作成功'});
                            }
                        }}/>
                    </Space>
                )
            }
        }
        ];

    return (
        <PageContainer>
            <ProTable
                scroll={{x: "max-content"}}
                actionRef={actionRef}
                rowKey="costConfigId"
                columns={columns}
                request={async (params, sorter, filter) => {
                    const {data, success} = await getHisConstConfigList(params, sorter, filter);
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
                                setOpen(true);
                            }}
                        >
                        新建
                        </Button>
                    </>,
                ]}
            />
            <HisConstConfigEdit width={640}  onClose={()=>{ setEditId(0);setOpen(false)}} onSuccess={()=>{setEditId(0);actionRef?.current?.reload();setOpen(false)}} costConfigId={editId} open={open} />
        </PageContainer>
    );
};

export default HisConstConfigList;
