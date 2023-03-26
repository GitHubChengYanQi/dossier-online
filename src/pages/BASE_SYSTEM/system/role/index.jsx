import React from 'react';
import styles from './index.less';
import {PageContainer, ProTable} from "@ant-design/pro-components";
import {request} from "../../../../utils/Request";
import {Button, Switch} from "antd";
import EditButton from "../../../../components/EditButton";

const roleList = {
    url: '/rest/role/list',
    method: 'GET',
};

export default function RoleList() {

    const columns = [
        {
            title: '名称',
            width: 200,
            dataIndex: 'name'
        },
        {
            title: '上级角色',
            width: 200,
            dataIndex: 'pName'
        },
        {
            title: '别名',
            width: 300,
            dataIndex: 'description'
        },
        {},
        {
            title: '操作',
            width: 360,
            align: 'right',
            render: (value, record) => {
                return (
                    <>
                        <Button
                            type="dashed"
                            className="button-left-margin"
                            onClick={() => {
                                refRoleSet.current.open(record.roleId);
                            }}>权限配置</Button>
                        <EditButton onClick={() => {
                            ref.current.open(record.roleId);
                        }}/>
                        {/*<DelButton/>*/}
                    </>
                );
            }
        }
    ];

  return (
    <PageContainer
        header={{
            title: '用户管理',
            breadcrumb: {},
        }}>
      <ProTable
          rowKey="roleId"
          columns={columns}
          request={async (params, sorter, filter) => {
              const { data, success } = await request({
                  ...roleList,
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
