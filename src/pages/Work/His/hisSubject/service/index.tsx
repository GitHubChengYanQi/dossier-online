/**
 * 科目表接口配置
 *
 * @author Sing
 * @Date 2023-04-23 21:45:11
 */
import {ResponseData} from "@/types/common";
import {request,pageRequest} from "@/utils/Request";

export const hisSubjectAdd = {
  url: '/hisSubject/add',
  method: 'POST',
  rowKey:'subjectId'
};

export const hisSubjectEdit = {
  url: '/hisSubject/edit',
  method: 'POST',
  rowKey:'subjectId'
};

export const hisSubjectDelete = {
  url: '/hisSubject/delete',
  method: 'POST',
  rowKey:'subjectId'
};

export const hisSubjectDetail = {
  url: '/hisSubject/detail',
  method: 'POST',
  rowKey:'subjectId'
};

export const hisSubjectList = {
  url: '/hisSubject/list',
  method: 'POST',
  rowKey:'subjectId'
};

export const getHisSubjectList = async (params: Record<string, any>, sorter:any, filter:any) => {
    return await pageRequest(hisSubjectList.url, {
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
export const getHisSubjectInfo = async (id: number) => {
    if(id===0){
        return {};
    }
    const response: ResponseData = await request(hisSubjectDetail.url, {
        method: "GET",
        params: {
            subjectId: id
        }
    });
    return response.data;
}

export const saveHisSubject = async (id: number, data: any) => {

    if (id !== null && id !== 0) {
        data.subjectId = id;
        return await request(hisSubjectEdit.url, {
            data
        });
    } else {
        return await request(hisSubjectAdd.url, {
            data
        });
    }
}

export const delHisSubjectInfo = async (id: number) => {
    return await request(hisSubjectDelete.url, {
        method: "GET",
        params: {
            subjectId: id
        }
    });
}