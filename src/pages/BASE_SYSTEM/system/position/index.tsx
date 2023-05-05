import React, {useRef} from 'react';
import styles from './index.less';
import {ActionType, PageContainer, ProTable} from "@ant-design/pro-components";
import {pageRequest, request} from "../../../../utils/Request";
import {Button, Divider, Space, Switch} from "antd";
import EditButton from "../../../../components/EditButton";
import DelButton from "../../../../components/DelButton";
import {ColumnsType} from "@/types/common";

const positionList = {
    url: '/rest/position/list',
    method: 'GET',
};
const positionDel = {
    url: '/position/delete',
    method: 'POST',
    rowKey:'positionId'
};
export default function PositionList() {

    const actionRef = useRef<ActionType>();
    const columns:ColumnsType[] = [
        {
            title: '职位名称', dataIndex: 'name', width: 120
        },
        {
            title: '职位编码', dataIndex: 'code', width: 120
        },
        {
            title: '备注', dataIndex: 'remark', width: 80
        },
        {
            title: '创建时间', dataIndex: 'createTime', width: 200
        },
        {
            title: '更新时间', dataIndex: 'updateTime', width: 200
        },
        {
            title: '状态', dataIndex: 'status', width: 200
        },
        {},
        {
            title: '操作',
            dataIndex: 'description',
            align: 'right',
            width: 260,
            render: (value, record) => {
                return (
                    <Space size={0} split={<Divider type="vertical"/>}>
                        <EditButton onClick={() => {
                            // ref.current.open(record.positionId);
                        }} />
                        <DelButton request={async ()=>{

                            const response = await request<any>(positionDel.url,{
                                params:{
                                    positionId:record.positionId
                                }
                            });
                            actionRef.current?.reload()
                            return response;
                        }} value={record.positionId} onSuccess={() => {
                            // tableRef.current.refresh();
                        }} />
                    </Space>
                );
            }
        },
    ];

  return (
    <PageContainer
        header={{
            title: '用户管理',
            breadcrumb: {},
        }}>
      <ProTable
          rowKey="positionId"
          columns={columns}
          actionRef={actionRef}
          request={async (params, sorter, filter) => {
              const { data, success } = await pageRequest(positionList.url,{
                  ...params,
                  // FIXME: remove @ts-ignore
                  // @ts-ignore
                  sorter,
                  filter,
              });
              console.log(success)
              return {
                  data: data || [],
                  success:!!data,
              };
          }}>

      </ProTable>
    </PageContainer>
  );
}
