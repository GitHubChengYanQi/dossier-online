import React from 'react';
import styles from './index.less';
import {PageContainer, ProTable} from "@ant-design/pro-components";
import {request} from "../../../../utils/Request";
import {Button, Switch} from "antd";
import EditButton from "../../../../components/EditButton";
import DelButton from "../../../../components/DelButton";

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

    const columns = [
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
                    <>
                        <EditButton onClick={() => {
                            ref.current.open(record.positionId);
                        }} />
                        <DelButton api={positionDel} value={record.positionId} onSuccess={() => {
                            tableRef.current.refresh();
                        }} />
                    </>
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
          request={async (params, sorter, filter) => {
              const { data, success } = await request({
                  ...positionList,
                  ...params,
                  // FIXME: remove @ts-ignore
                  // @ts-ignore
                  sorter,
                  filter,
              });
              console.log(success)
              return {
                  data: data || [],
                  success:data?true:false,
              };
          }}>

      </ProTable>
    </PageContainer>
  );
}
