import React from 'react';
import styles from './index.less';
import {PageContainer, ProTable} from "@ant-design/pro-components";
import {request} from "../../../../utils/Request";
import EditButton from "../../../../components/EditButton";
import DelButton from "../../../../components/DelButton";

const loginLogList = {
    url: '/loginLog/list',
    method: 'POST',
    rowKey:'loginLogId'
};
const loginLogDelete = {
    url: '/loginLog/delete',
    method: 'POST',
    rowKey:'loginLogId'
};
export default function DeptList() {

    const columns = [
        {
            title: '日志名称', dataIndex: 'logName', width: 120
        },
        {
            title: '管理员id', dataIndex: 'userId', width: 120
        },
        {
            title: '创建时间', dataIndex: 'createTime', width: 80
        },
        {
            title: '是否执行成功', dataIndex: 'succeed', width: 200
        },
        {
            title: '具体消息', dataIndex: 'message', width: 200
        },
        {
            title: '登录ip', dataIndex: 'ipAddress', width: 200
        }
    ];

  return (
    <PageContainer
        header={{
            title: '登录日志',
            breadcrumb: {},
        }}>
      <ProTable
          rowKey="loginLogId"
          columns={columns}
          request={async (params, sorter, filter) => {
              const { data, success } = await request({
                  ...loginLogList,
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
