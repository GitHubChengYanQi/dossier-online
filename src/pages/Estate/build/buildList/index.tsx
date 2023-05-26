/**
 * 房屋管理-房间表列表页
 *
 * @author Sing
 * @Date 2023-05-26 10:05:29
 */

import React, {useRef,useState} from 'react';
import useBuildField from "../schema";
import {delBuildInfo,getBuildList} from "../service";
import BuildEdit from "../buildEdit";
import EditButton from "@/components/EditButton";
import {PageContainer, ProTable,ActionType} from "@ant-design/pro-components";
import {Button, Space, Divider} from "antd";
import {ColumnsType} from "@/types/common";
import DelButton from "@/components/DelButton";
import useAlert from "@/components/useAlert";

const BuildList = () => {

    const [editId,setEditId] = useState<number>(0);
    const [open,setOpen] = useState<boolean>(false);

    const {error, notification} = useAlert();

    const actionRef = useRef<ActionType>();

    const {
        Id,
        EstateId,
        CommonAreaId,
        BuildAreaId,
        BuildPartitionId,
        BuildTypeId,
        BuildStatusId,
        Name,
        Bn,
        BnNo,
        Unit,
        Floor,
        Number,
        Address,
        Acreage,
        TrueAcreage,
        FalseAcreage,
        Openid,
        Display,
        Inputtime,
        Updatetime,
        Remarks,
        UniqueChar,
        Phone,
        Numid,
        Urgent,
        OwnerName,
        IsGas,
        IsProperty,
        IsHeating,
        Key,
        Qgp,
        IntoTime,
        DeliveryTime,
        Subarea,
        NewTime,
        HousekeeperId,
        ProjectId,
    } = useBuildField();

    const columns:ColumnsType[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        Id,
        EstateId,
        CommonAreaId,
        BuildAreaId,
        BuildPartitionId,
        BuildTypeId,
        BuildStatusId,
        Name,
        Bn,
        BnNo,
        Unit,
        Floor,
        Number,
        Address,
        Acreage,
        TrueAcreage,
        FalseAcreage,
        Openid,
        Display,
        Inputtime,
        Updatetime,
        Remarks,
        UniqueChar,
        Phone,
        Numid,
        Urgent,
        OwnerName,
        IsGas,
        IsProperty,
        IsHeating,
        Key,
        Qgp,
        IntoTime,
        DeliveryTime,
        Subarea,
        NewTime,
        HousekeeperId,
        ProjectId,
        {
            title: "操作",
            hideInSearch:true,
            render:(value: any, record: any)=>{
                return(
                    <Space size={0} split={<Divider type="vertical"/>}>
                        <EditButton onClick={()=>{
                            setEditId(record.id);
                            setOpen(true)
                        }} />
                        <DelButton request={async () => {
                            const response = await delBuildInfo(record.id);
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
                rowKey="id"
                columns={columns}
                request={async (params, sorter, filter) => {
                    const {data, success} = await getBuildList(params, sorter, filter);
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
            <BuildEdit  onClose={()=>{ setEditId(0);setOpen(false)}} onSuccess={()=>{setEditId(0);actionRef?.current?.reload();setOpen(false)}} id={editId} open={open} />
        </PageContainer>
    );
};

export default BuildList;
