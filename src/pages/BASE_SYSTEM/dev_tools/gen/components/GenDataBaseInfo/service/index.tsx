import {request,requestProvide,pageRequest} from "@/utils/Request";

export const DataBaseInfo = {
    url: '/databaseInfo/listSelect',
    method: 'POST',
};
export const dbTableList = {
    url: '/databaseInfo/dbTableList',
    method: 'POST',
    rowKey: 'tableName'
};

export const fieldConfigList = {
    url: '/getTableField',
    method: 'POST',
    rowKey: 'fieldId'
};
export const fieldConfigSave = {
    url: '/fieldConfig/add',
    method: 'POST',
    rowKey:'fieldId'
};

export interface DataBaseType {
    tableComment?: string
    tableName: string
}

export const getDataBase = async () => {
    const response = await request(DataBaseInfo.url);
    response.data.push({
        label: "11111",
        value: "123"
    })
    return response.data;
}
export const getTableList = async (dbId: number) => {
    const response = await pageRequest<DataBaseType>(dbTableList.url, {
        data: {
            dbId
        }
    });
    return response.data
}

export const getFieldList = async (dbId: number,
                      tableName: string) => {
    const response = await pageRequest(fieldConfigList.url, {
        params: {
            dbId,
            tableName
        }
    });
    return response.data;
}

export const saveFieldConfig = async (data:any)=>{
    const response = await request(fieldConfigSave.url,{
        data
    });
    return response;
}

export const swaggerUrl = {
    url: '/v2/api-docs',
    method: 'POST',
};

export const getApiDocs = async ()=>{
    const response  = await requestProvide(swaggerUrl.url,{
        method:"POST"
    });
    return response
}