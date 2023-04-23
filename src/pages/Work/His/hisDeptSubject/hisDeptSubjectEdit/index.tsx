/**
 * 部门科目关联表编辑页
 *
 * @author Sing
 * @Date 2023-04-23 21:45:11
 */

import React from 'react';
import {BetaSchemaForm} from "@ant-design/pro-components";
import useHisDeptSubjectField from "../schema";
import { saveHisDeptSubject,getHisDeptSubjectInfo } from "../service";
import useAlert from "@/components/useAlert";
import FormWrap,{FormWrapProps} from "@/components/FormWrap";

type HisDeptSubjectEditProps<T> = {
    deptSubId:number
} & FormWrapProps<T>

const HisDeptSubjectEdit = <T extends Record<string, any>>(props: HisDeptSubjectEditProps<T>) => {
    const { deptSubId, type, open , onSuccess, onClose, width } = props;
    const {
          DeptSubId,
          DeptId,
          SubjectId,
          Sort,
          CreateTime,
          CreateUser,
          UpdateTime,
          UpdateUser,
          Display,
        } = useHisDeptSubjectField();
    const columns = [
        DeptSubId,
        DeptId,
        SubjectId,
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
        ];

    const {error,notification} = useAlert();

    return (
        <FormWrap
            open={open}
            type={type}
            onClose={onClose}
            width={width}
            request={async () => {
                return getHisDeptSubjectInfo(deptSubId);
            }}
            onFinish={async (values) => {
                const response = await saveHisDeptSubject(deptSubId, values);
                if (response.errCode !== 0) {
                    error(response.message);
                } else {
                    onSuccess?.();
                    notification.success({message: '操作成功'});
                }
            }}
        >
            <BetaSchemaForm layoutType="Embed" columns={columns}/>
        </FormWrap>
    );
};

export default HisDeptSubjectEdit;
