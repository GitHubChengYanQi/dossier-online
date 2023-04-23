import {ColumnsType} from "@/types/common";
import GenDataBaseInfo from "@/pages/BASE_SYSTEM/dev_tools/gen/components/GenDataBaseInfo";
import {getDataBase} from "@/pages/BASE_SYSTEM/dev_tools/gen/components/GenDataBaseInfo/service";

const useGenField = ()=>{
    const author:ColumnsType = {
        width:300,
        title: '作者',
        dataIndex:"author"
    }
    const proPackage:ColumnsType = {
        width:300,
        title: '包名',
        dataIndex:"proPackage"
    }
    const removePrefix:ColumnsType = {
        width:300,
        title: '表前缀移除',
        dataIndex:'removePrefix'
    }
    const version:ColumnsType = {
        width:300,
        title: '版本',
        dataIndex:'version'
    }
    const genLocation:ColumnsType = {
        width:300,
        title: '生成位置',
        valueType:"radio",
        dataIndex:"genLocation",
        valueEnum:{
            DEFAULT_PATH:{
                text:"下载代码",
            },
            PROJECT_PATH:{
                text:"生成到本项目",
                disabled:true
            }
        }
    }
    const dataSourceId:ColumnsType = {
        title: '数据源选择',
        valueType:"select",
        dataIndex:"dataSourceId",
        name:"dataSourceId",
        width:240,
        request:async ()=>{
            return await getDataBase()
        }
    }
    const tables:ColumnsType = {
        title: '选择表',
        dataIndex:"tables",
        // dependencies:["dataSourceId"],
        renderFormItem:(schema,config,form)=>{
            const value = form.getFieldValue("dataSourceId")
            return <GenDataBaseInfo dataSourceId={value} />
        }
    }

    return {
        author,
        proPackage,
        removePrefix,
        version,
        genLocation,
        dataSourceId,
        tables,
    }
}
export default useGenField;