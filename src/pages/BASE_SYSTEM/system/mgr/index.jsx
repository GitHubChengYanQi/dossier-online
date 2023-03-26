import React from 'react';
import styles from './index.less';
import {PageContainer, ProTable} from "@ant-design/pro-components";
import {request} from "../../../../utils/Request";
import {Button, Switch} from "antd";
import EditButton from "../../../../components/EditButton";

const userList = {
    url: '/rest/mgr/list',
    method: 'POST',
};

export default function UserList() {

    const columns = [
        {
            title: '账号',
            dataIndex: 'account'
        },
        {
            title: '名称',
            dataIndex: 'name'
        },
        {
            title: '性别',
            dataIndex: 'sexName'
        },
        {
            title: '部门',
            dataIndex: 'deptName'
        },
        {
            title: '职位',
            dataIndex: 'positionName'
        },
        {
            title: '创建时间',
            dataIndex: 'createTime'
        },
        {
            title: '状态',
            render: (value, record) => {
                return (
                    <Switch
                        checkedChildren="启用"
                        unCheckedChildren="冻结"
                        style={{width: 60}}
                        defaultChecked={record.status === 'ENABLE'}
                        onChange={(checked) => {
                            if (checked) {
                                unfreeze(record.userId);
                            } else {
                                freeze(record.userId);
                            }
                        }}
                    />
                );
            }
        },
        {
            title: '操作',
            align: 'right',
            render: (value, record) => {
                return (
                    <>
                        <Button type='ghost' className="button-left-margin" onClick={() => {
                            roRef.current.open(record.userId);
                        }}>分配角色</Button>
                        <Button type='ghost' className="button-left-margin" onClick={() => {
                            Modal.confirm({
                                title: '提示',
                                content: '系统初始化为111111，实际请参考系统设置。',
                                onOk: () => {
                                    reset(record.userId);
                                },
                                onCancel: () => {
                                }
                            });
                        }}>重置密码</Button>
                        <EditButton onClick={() => {
                            dfRef.current.open(record.userId);
                        }}/>
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
          rowKey="userId"
          columns={columns}
          request={async (params, sorter, filter) => {
              const { data, success } = await request({
                  ...userList,
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
