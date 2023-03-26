import React from 'react';
import styles from './index.less';
import {PageContainer, ProTable} from "@ant-design/pro-components";
import {request} from "../../../../utils/Request";
import {Button, Switch} from "antd";
import EditButton from "../../../../components/EditButton";
import DelButton from "../../../../components/DelButton";

const deptList = {
    url: '/rest/dept/list',
    method: 'POST'
};
const deptDelete = {
    url: '/rest/dept/delete',
    method: 'POST',
    rowKey: 'deptId'
};
export default function DeptList() {

    const columns = [
        {
            title: '部门简称', dataIndex: 'simpleName', width: 120
        },
        {
            title: '部门全称', dataIndex: 'fullName', width: 120
        },
        {
            title: '排序', dataIndex: 'sort', width: 80
        },
        {
            title: '备注', dataIndex: 'description', width: 200
        },
        {
            title: '操作',
            align: 'right',
            width: 260,
            render: (value, record) => {
                return (
                    <>
                        <EditButton onClick={() => {
                            ref.current.open(record.deptId);
                        }}/>
                        <DelButton api={deptDelete} value={record.deptId} onSuccess={() => {
                            tableRef.current.refresh();
                        }}/>
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
          rowKey="deptId"
          columns={columns}
          request={async (params, sorter, filter) => {
              const { data, success } = await request({
                  ...deptList,
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
