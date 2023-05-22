/**
 * 列表页
 *
 * @author Sing
 * @Date 2023-05-15 18:42:10
 */

import React, {useRef,useState} from 'react';
import useActivitiField from "../schema";
import {delActivitiInfo,getActivitiList} from "../service";
import ActivitiEdit from "../activitiEdit";
import EditButton from "@/components/EditButton";
import {PageContainer, ProTable,ActionType} from "@ant-design/pro-components";
import {Button, Space, Divider} from "antd";
import {ColumnsType} from "@/types/common";
import DelButton from "@/components/DelButton";
import useAlert from "@/components/useAlert";
import LinkButton from "@/components/LinkButton";
import {useNavigate} from "umi";

const ActivitiList = () => {

    const [editId,setEditId] = useState<number>(0);
    const [open,setOpen] = useState<boolean>(false);

    const {error, notification} = useAlert();

    const actionRef = useRef<ActionType>();

    const navigate = useNavigate();

    const {
        ActivitiId,
        Name,
        Type,
        Id,
        Config,
        Version,
        Remark,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    } = useActivitiField();

    const columns:ColumnsType[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        ActivitiId,
        Name,
        Type,
        Id,
        Config,
        Version,
        Remark,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
        {
            title: "操作",
            hideInSearch:true,
            width:200,
            render:(value: any, record: any)=>{
                return(
                    <Space size={0} split={<Divider type="vertical"/>}>
                        <EditButton onClick={()=>{
                            setEditId(record.activitiId);
                            setOpen(true)
                        }} />
                        <LinkButton onClick={()=>{
                            navigate(`/workFlow/${record.activitiId}`);
                        }}>配置流程</LinkButton>
                        <LinkButton>部署流程</LinkButton>
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
                rowKey="activitiId"
                columns={columns}
                request={async (params, sorter, filter) => {
                    const {data, success} = await getActivitiList(params, sorter, filter);
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
            <ActivitiEdit type={"Modal"}  width={320} onClose={()=>{ setEditId(0);setOpen(false)}} onSuccess={()=>{setEditId(0);actionRef?.current?.reload();setOpen(false)}} activitiId={editId} open={open} />
        </PageContainer>
    );
};

export default ActivitiList;
