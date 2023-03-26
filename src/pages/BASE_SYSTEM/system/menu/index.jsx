import React from 'react';
import styles from './index.less';
import {PageContainer, ProTable} from "@ant-design/pro-components";
import {request} from "../../../../utils/Request";
import {Button, Switch} from "antd";
import EditButton from "../../../../components/EditButton";
import DelButton from "../../../../components/DelButton";

const menuRemove = {
    url: '/rest/menu/remove',
    method: 'GET',
    rowKey:'menuId'
};
const menuTreeList = {
    url: '/rest/menu/menuTreeList',
    method: 'GET',
};
export default function MenuList() {

    const columns = [
        {
            title: '名称', dataIndex: 'label', width: 200
        },
        {
            title: '菜单编码', dataIndex: 'value', width: 200
        },
        {
            title: '操作',
            align: 'right',
            width: 260,
            valueType: 'option',
            render: (value, record) => {
                return (
                    <>
                        <EditButton onClick={() => {
                            ref.current.open(record.id);
                        }}/>
                        <DelButton api={menuRemove} value={record.id} onSuccess={() => {
                            tableRef.current.refresh();
                        }}/>
                    </>
                );
            }
        },
    ];
    const formatData = (data)=>{
        if(!Array.isArray(data)) return [];
        return data.map(item=>{
            return {
                ...item,
                children:item.children && item.children.length>0?formatData(item.children):undefined
            }
        })
    }

  return (
    <PageContainer
        header={{
            title: '用户管理',
            breadcrumb: {},
        }}>
      <ProTable
          rowKey="id"
          columns={columns}
          request={async (params, sorter, filter) => {
              const { data, success } = await request({
                  ...menuTreeList,
                  ...params,
                  // FIXME: remove @ts-ignore
                  // @ts-ignore
                  sorter,
                  filter,
              });
              console.log(success)
              return {
                  data: formatData(data) || [],
                  success:data?true:false,
              };
          }}>

      </ProTable>
    </PageContainer>
  );
}