/**
 * 科目表编辑页
 *
 * @author Sing
 * @Date 2023-04-23 21:45:11
 */

import React from 'react';
import {BetaSchemaForm} from "@ant-design/pro-components";
import useHisSubjectField from "../schema";
import { saveHisSubject,getHisSubjectInfo } from "../service";
import useAlert from "@/components/useAlert";
import FormWrap,{FormWrapProps} from "@/components/FormWrap";

type HisSubjectEditProps<T> = {
    subjectId:number
} & FormWrapProps<T>

const HisSubjectEdit = <T extends Record<string, any>>(props: HisSubjectEditProps<T>) => {
    const { subjectId, type, open , onSuccess, onClose, width } = props;
    const {
          SubjectId,
          SubjectName,
          Sort,
          CreateTime,
          CreateUser,
          UpdateTime,
          UpdateUser,
          Display,
        } = useHisSubjectField();
    const columns = [
        SubjectId,
        SubjectName,
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
                return getHisSubjectInfo(subjectId);
            }}
            onFinish={async (values) => {
                const response = await saveHisSubject(subjectId, values);
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

export default HisSubjectEdit;
