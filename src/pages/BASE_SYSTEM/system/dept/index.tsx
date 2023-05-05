import React from 'react';
import {PageContainer, ProTable} from "@ant-design/pro-components";
import {pageRequest, request} from "@/utils/Request";
import EditButton from "@/components/EditButton";
import DelButton from "@/components/DelButton";
import {ColumnsType} from "@/types/common";
import {Divider, Space} from "antd";

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

    const columns:ColumnsType[] = [
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
                    <Space size={0} split={<Divider type="vertical"/>}>
                        <EditButton onClick={() => {
                            // ref.current.open(record.deptId);
                        }}/>
                        <DelButton value={record.deptId} onSuccess={() => {
                            // tableRef.current.refresh();
                        }}/>
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
          rowKey="deptId"
          columns={columns}
          request={async (params, sorter, filter) => {
              const { data, success } = await pageRequest(deptList.url,{
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
