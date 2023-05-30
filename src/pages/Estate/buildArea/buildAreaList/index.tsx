/**
 * 房屋管理-小区表列表页
 *
 * @author Sing
 * @Date 2023-05-26 10:05:29
 */

import React, {useRef,useState} from 'react';
import useBuildAreaField from "../schema";
import {delBuildAreaInfo,getBuildAreaList} from "../service";
import BuildAreaEdit from "../buildAreaEdit";
import EditButton from "@/components/EditButton";
import {PageContainer, ProTable,ActionType} from "@ant-design/pro-components";
import {Button, Space, Divider} from "antd";
import {ColumnsType} from "@/types/common";
import DelButton from "@/components/DelButton";
import useAlert from "@/components/useAlert";

const BuildAreaList = () => {

    const [editId,setEditId] = useState<number>(0);
    const [open,setOpen] = useState<boolean>(false);

    const {error, notification} = useAlert();

    const actionRef = useRef<ActionType>();

    const {
        Id,
        Name,
        Inputtime,
        Updatetime,
        Province,
        Display,
        GasType,
        City,
        County,
        Identifying,
        No,
        Customerservice,
    } = useBuildAreaField();

    const columns:ColumnsType[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        Id,
        Name,
        Inputtime,
        Updatetime,
        Province,
        Display,
        GasType,
        City,
        County,
        Identifying,
        No,
        Customerservice,
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
                            const response = await delBuildAreaInfo(record.id);
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
                    const {data, success} = await getBuildAreaList(params, sorter, filter);
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
            <BuildAreaEdit  onClose={()=>{ setEditId(0);setOpen(false)}} onSuccess={()=>{setEditId(0);actionRef?.current?.reload();setOpen(false)}} areaId={editId} open={open} />
        </PageContainer>
    );
};

export default BuildAreaList;
