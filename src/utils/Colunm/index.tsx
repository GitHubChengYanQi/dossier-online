import {ProColumns, ProFormColumnsType} from "@ant-design/pro-components";
import {columnsType} from "@/types/common";

function randomString(len:number = 32) {
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    const maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

export declare type returnType = (columns: Array<ProColumns & ProFormColumnsType> | ((values: any) => Array<columnsType>), id?: string) => Array<ProColumns & ProFormColumnsType> | ((values: any) => Array<columnsType>)

/**
 * 给增加随机数，为了防止出现相同ID的DOM
 * 但是还是重复
 * 暂时不用了
 * @param columns
 * @param id
 */
export const columnAddId: returnType = (columns: Array<columnsType> | ((values: any) => Array<columnsType>), id?: string) => {
    let tmpId = id;
    if(!id){
        tmpId = randomString(6);
    }
    if (!columns) {
        return [];
    }
    let tmpColumns: Array<columnsType>;
    if (typeof columns === "function") {
        tmpColumns = columns(null);
    } else {
        tmpColumns = columns;
    }
    const result = tmpColumns.map(item => {
        item.fieldProps = {
            id: (item?.formItemProps?.name || item.dataIndex || item?.fieldProps?.name) + tmpId,
            ...item.fieldProps,
        };
        if (item.columns) {
            // @ts-ignore
            item.columns = columnAddId(item.columns, tmpId);
        }

        return item;
    });
    if (typeof columns === "function") {
        return () => {
            return result;
        }
    } else {
        return result;
    }

}