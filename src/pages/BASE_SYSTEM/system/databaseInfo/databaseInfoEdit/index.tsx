/**
 * 数据库信息表编辑页
 *
 * @author 
 * @Date 2023-04-11 22:22:11
 */

import React from 'react';
import {BetaSchemaForm, ProForm} from "@ant-design/pro-components";
import useDatabaseInfoField from "../schema";
import { saveDatabaseInfo,getDatabaseInfoInfo } from "../service";
import useAlert from "@/components/useAlert";

const DatabaseInfoEdit = (props:any) => {
    const { dbId } = props;
    const {
          DbId,
          DbName,
          JdbcDriver,
          UserName,
          Password,
          JdbcUrl,
          Remarks,
          CreateTime,
        } = useDatabaseInfoField();
    const columns = [
        DbId,
        DbName,
        JdbcDriver,
        UserName,
        Password,
        JdbcUrl,
        Remarks,
        CreateTime,
        ];

    const {error,notification} = useAlert();

    return (
        <ProForm
            request={async () => {
                return getDatabaseInfoInfo(dbId);
                }}
            onFinish={async (values) => {
                await saveDatabaseInfo(dbId, values).catch((e) => {
                    error(e.message);
                });
                notification.success({message: '操作成功'});
                }}
            >
            <BetaSchemaForm layoutType="Embed" columns={columns}/>
        </ProForm>
    );
};

export default DatabaseInfoEdit;
