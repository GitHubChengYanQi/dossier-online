/**
 * 数据库信息表字段配置页
 *
 * @author 
 * @Date 2023-04-11 22:22:11
 */

import {request} from "@/utils/Request";

const useDatabaseInfo = ()=>{
    const DbId = {
        title:"编号",
        dataIndex:"dbId",
        valueType:"radio",
        request: async ()=>{
            const response = await request("/rest/area/listSelect");
            return response.data;
        }
    }
    const DbName = {
        title:"数据库名称",
        dataIndex:"dbName",
        valueType:"",
    }
    const JdbcDriver = {
        title:"jdbc的驱动",
        dataIndex:"jdbcDriver",
        valueType:"treeSelect",
        valueEnum:{
            a:{
                text:"1"
            },
            b:{
                text:"2"
            },
        },
        request: async ()=>{
            const response = await request("/rest/area/add");
            return response.data;
        }
    }
    const UserName = {
        title:"账号",
        dataIndex:"userName",
        valueType:"",
    }
    const Password = {
        title:"密码",
        dataIndex:"password",
        valueType:"",
    }
    const JdbcUrl = {
        title:"url",
        dataIndex:"jdbcUrl",
        valueType:"",
    }
    const Remarks = {
        title:"备注",
        dataIndex:"remarks",
        valueType:"",
    }
    const CreateTime = {
        title:"创建时间",
        dataIndex:"createTime",
        valueType:"",
    }
    return {
        DbId,
        DbName,
        JdbcDriver,
        UserName,
        Password,
        JdbcUrl,
        Remarks,
        CreateTime,
    }
}
export default useDatabaseInfo