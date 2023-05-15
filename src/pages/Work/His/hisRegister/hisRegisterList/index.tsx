/**
 * 挂号信息列表页
 *
 * @author Sing
 * @Date 2023-05-03 19:52:48
 */

import React, {useRef,useState} from 'react';
import useHisRegisterField from "../schema";
import {delHisRegisterInfo,getHisRegisterList} from "../service";
import EditButton from "@/components/EditButton";
import {PageContainer, ProTable,ActionType} from "@ant-design/pro-components";
import {Button, Space, Divider} from "antd";
import {ColumnsType} from "@/types/common";
import DelButton from "@/components/DelButton";
import useAlert from "@/components/useAlert";
import HisRegisterEdit from "@/pages/Work/His/hisRegister/hisRegisterEdit";

const HisRegisterList = () => {

    const [editId,setEditId] = useState<number>(0);
    const [open,setOpen] = useState<boolean>(false);

    const {error, notification} = useAlert();

    const actionRef = useRef<ActionType>();

    const {
        RegisterId,
        Department,
        Doctor,
        NumberType,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    } = useHisRegisterField();

    const columns:ColumnsType[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        RegisterId,
        Department,
        Doctor,
        NumberType,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
        {
            title: "操作",
            align:"right",
            hideInSearch:true,
            render:(value: any, record: any)=>{
                return(
                    <Space size={0} split={<Divider type="vertical"/>}>
                        <EditButton onClick={()=>{
                            setEditId(record.registerId);
                            setOpen(true)
                        }} />
                        <DelButton request={async () => {
                            const response = await delHisRegisterInfo(record.registerId);
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
                rowKey="registerId"
                columns={columns}
                request={async (params, sorter, filter) => {
                    const {data, success} = await getHisRegisterList(params, sorter, filter);
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
            <HisRegisterEdit  onClose={()=>{ setEditId(0);setOpen(false)}} onSuccess={()=>{setEditId(0);actionRef?.current?.reload();setOpen(false)}} registerId={editId} open={open} />
        </PageContainer>
    );
};

export default HisRegisterList;
