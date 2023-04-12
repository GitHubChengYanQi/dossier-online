import React from 'react';
import {PageContainer, ProColumns, ProTable} from "@ant-design/pro-components";
import EditButton from "../../../../components/EditButton";
import {getRoleList} from "@/services/BASE_SYSTEM/role";
import {RestRoleResult} from "@/pages/BASE_SYSTEM/system/role/types";
import useRoleField from "@/pages/BASE_SYSTEM/system/role/schema";



export default function RoleList() {

    const {Name,description} = useRoleField();

    const columns:ProColumns[] = [
        Name,
        description,
        {
            title: '操作',
            width: 360,
            align: 'right',
            render: (value:any, record:RestRoleResult) => {
                return (
                    <>
                        <a
                            type="dashed"
                            className="button-left-margin"
                            onClick={() => {
                                console.log(record)
                                // refRoleSet.current.open(record.roleId);
                            }}>权限配置</a>
                        <EditButton onClick={() => {
                            // ref.current.open(record.roleId);
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
      <ProTable<RestRoleResult>
          rowKey="roleId"
          columns={columns}
          request={async (params, sorter, filter) => {
              return await getRoleList<RestRoleResult>(params, sorter, filter);
          }}>

      </ProTable>
    </PageContainer>
  );
}
