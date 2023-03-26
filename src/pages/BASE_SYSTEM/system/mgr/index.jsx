import React, {useState} from 'react';
import styles from './index.less';
import {PageContainer, ProFormTreeSelect, ProTable} from "@ant-design/pro-components";
import {request} from "../../../../utils/Request";
import {Button, Radio, Switch} from "antd";
import EditButton from "../../../../components/EditButton";
import EditForm from "./components/editForm";
import {getTree} from "../../../../services/BASE_SYSTEM/dept";

const userList = {
    url: '/rest/mgr/list',
    method: 'POST',
};

export default function UserList() {

    const [createModalVisible, handleModalVisible] = useState(false);
    const [editId, setEditId] = useState(null);

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
            dataIndex: 'sexName',
            formItemProps:{
                name:"sex"
            },
            renderFormItem:()=>{
                return (<Radio.Group>
                    <Radio value="M">男</Radio>
                    <Radio value={2}>女</Radio>
                </Radio.Group>)
            }
        },
        {
            title: '部门',
            dataIndex: 'deptName',
            formItemProps:{
                name:"deptId"
            },
            renderFormItem:()=>{
                return (
                    <ProFormTreeSelect
                        fieldProps={{
                            allowClear:true,
                            treeDefaultExpandAll:true
                        }}

                        request={async (params)=>{
                            return await getTree();
                        }}
                />);
            }

        },
        {
            title: '职位',
            dataIndex: 'positionName'
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            hideInSearch: true,
            hideInForm: true
        },
        {
            title: '状态',
            valueType:"radio",
            formItemProps:{
                name:"status"
            },
            valueEnum:{
                ENABLE: {
                    text: '启用',
                    status: 'Error',
                },
                closed: {
                    text: '禁用',
                    status: 'Success',
                },
            },
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
            hideInForm:true,
            hideInSearch:true,
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
                            // dfRef.current.open(record.userId);
                            setEditId(record.userId);
                            handleModalVisible(true)
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
          search={{
              filterType:""
          }}
          rowKey="userId"
          columns={columns}
          request={async (params, sorter, filter) => {
              console.log(params)
              const { data, success } = await request({
                  ...userList,
                  data:{
                      ...params
                  },
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
          }}
          toolBarRender={() => [
              <Button
                  key="1"
                  type="primary"
                  onClick={() => handleModalVisible(true)}
              >
                  新建
              </Button>,
          ]}
      >

      </ProTable>
        <EditForm
            columns={columns}
            id={editId}
            onCancel={() => {
                handleModalVisible(false);
                setEditId(null);
            }}
            modalVisible={createModalVisible}
        />
    </PageContainer>
  );
}
