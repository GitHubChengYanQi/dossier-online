/**
 * 科目表列表页
 *
 * @author Sing
 * @Date 2023-04-23 21:45:11
 */

import React, {useRef,useState} from 'react';
import useHisSubjectField from "../schema";
import {delHisSubjectInfo,getHisSubjectList} from "../service";
import HisSubjectEdit from "../medicalEdit";
import EditButton from "@/components/EditButton";
import TableOptionsWrap from "@/components/TableOptionsWrap";
import {PageContainer, ProTable,ActionType} from "@ant-design/pro-components";
import {Button} from "antd";
import {ColumnsType} from "@/types/common";
import DelButton from "@/components/DelButton";
import useAlert from "@/components/useAlert";

const HisSubjectList = () => {

    const [editId,setEditId] = useState<number>(0);
    const [open,setOpen] = useState<boolean>(false);

    const {error, notification} = useAlert();

    const actionRef = useRef<ActionType>();

    const {
        SubjectId,
        SubjectName,
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    } = useHisSubjectField();

    const columns:ColumnsType[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        SubjectId,
        SubjectName,
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
        {
            title: "操作",
            align:"right",
            render:(value: any, record: any)=>{
                return(
                    <TableOptionsWrap>
                        <EditButton onClick={()=>{
                            setEditId(record.subjectId);
                            setOpen(true)
                        }} />
                        <DelButton request={async () => {
                            const response = await delHisSubjectInfo(record.subjectId);
                            if (response.errCode !== 0) {
                                error(response.message);
                            } else {
                                actionRef?.current?.reload();
                                notification.success({message: '操作成功'});
                            }
                        }}/>
                    </TableOptionsWrap>
                )
            }
        }
        ];

    return (
        <PageContainer>
            <ProTable
                scroll={{x: "max-content"}}
                actionRef={actionRef}
                rowKey="subjectId"
                columns={columns}
                request={async (params, sorter, filter) => {
                    const {data, success} = await getHisSubjectList(params, sorter, filter);
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
            <HisSubjectEdit  onClose={()=>{ setEditId(0);setOpen(false)}} onSuccess={()=>{setEditId(0);actionRef?.current?.reload();setOpen(false)}} subjectId={editId} open={open} />
        </PageContainer>
    );
};

export default HisSubjectList;
