/**
 * 部门科目关联表接口配置
 *
 * @author Sing
 * @Date 2023-04-23 21:45:11
 */
import {ResponseData} from "@/types/common";
import {request,pageRequest} from "@/utils/Request";

export const hisDeptSubjectAdd = {
  url: '/hisDeptSubject/add',
  method: 'POST',
  rowKey:'deptSubId'
};

export const hisDeptSubjectEdit = {
  url: '/hisDeptSubject/edit',
  method: 'POST',
  rowKey:'deptSubId'
};

export const hisDeptSubjectDelete = {
  url: '/hisDeptSubject/delete',
  method: 'POST',
  rowKey:'deptSubId'
};

export const hisDeptSubjectDetail = {
  url: '/hisDeptSubject/detail',
  method: 'POST',
  rowKey:'deptSubId'
};

export const hisDeptSubjectList = {
  url: '/hisDeptSubject/list',
  method: 'POST',
  rowKey:'deptSubId'
};

export const getHisDeptSubjectList = async (params: Record<string, any>, sorter:any, filter:any) => {
    return await pageRequest(hisDeptSubjectList.url, {
        data: {
            ...params
        },
        params:{
            sorter,
            filter
        }
        // FIXME: remove @ts-ignore
        // @ts-ignore
        // sorter,
        // filter,
    });
}
export const getHisDeptSubjectInfo = async (id: number) => {
    if(id===0){
        return {};
    }
    const response: ResponseData = await request(hisDeptSubjectDetail.url, {
        method: "GET",
        params: {
            deptSubId: id
        }
    });
    return response.data;
}

export const saveHisDeptSubject = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.deptSubId = id;
        return await request(hisDeptSubjectEdit.url, {
            data
        });
    } else {
        return await request(hisDeptSubjectAdd.url, {
            data
        });
    }
}

export const delHisDeptSubjectInfo = async (id: number) => {
    return await request(hisDeptSubjectDelete.url, {
        method: "GET",
        params: {
            deptSubId: id
        }
    });
}