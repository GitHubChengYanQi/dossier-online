import React from 'react';
import styles from './index.less';
import {PageContainer, ProTable} from "@ant-design/pro-components";
import {request} from "../../../../utils/Request";
import {Button, Switch} from "antd";
import EditButton from "../../../../components/EditButton";
import DelButton from "../../../../components/DelButton";

const dictTypeList = {
    url: '/rest/dictType/list',
    method: 'POST',
    rowKey: 'dictTypeId'
};
export default function DictTypeList() {

    const columns = [
        {
            title: '名称', dataIndex: 'simpleName', width: 200,
            render: (value, row) => {
                return (
                    <Button type="link" onClick={() => {
                        switch (row.code) {
                            case 'PURCHASE':
                                history.push('/BASE_SYSTEM/dictType/purchaseConfig');
                                break;
                            default:
                                history.push(`/BASE_SYSTEM/dictType/${row.dictTypeId}`);
                                break;
                        }
                    }}>{row.name}</Button>
                );
            }
        },
        {
            title: '编码', dataIndex: 'code', width: 200
        },
        {
            title: '是否系统', dataIndex: 'sort', width: 100,
            render:(value, row) => {
                if (row.systemFlag === 'Y') {
                    return ('是');
                }
                return ('否');
            }
        },
        {
            title: '描述', dataIndex: 'description', width: 200
        },
        {
            title: '状态', width: 100,
            render:(value, row) => {
                if (row.status === 'ENABLE') {
                    return ('启用');
                }
                return ('禁用');
            }
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
          rowKey="dictTypeId"
          columns={columns}
          request={async (params, sorter, filter) => {
              const { data, success } = await request({
                  ...dictTypeList,
                  ...params,
                  // FIXME: remove @ts-ignore
                  // @ts-ignore
                  sorter,
                  filter,
              });
              return {
                  data: data || [],
                  success:data?true:false,
              };
          }}>

      </ProTable>
    </PageContainer>
  );
}
