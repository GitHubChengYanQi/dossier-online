/**
 * 费用配置表编辑页
 *
 * @author Sing
 * @Date 2023-04-26 15:21:31
 */

import React from 'react';
import {BetaSchemaForm} from "@ant-design/pro-components";
import useHisConstConfigField from "../schema";
import {saveHisConstConfig, getHisConstConfigInfo} from "../service";
import useAlert from "@/components/useAlert";
import FormWrap, {FormWrapProps} from "@/components/FormWrap";
import {HisConstConfigType} from "@/pages/Work/His/hisConstConfig/type";
import {ColumnsType} from "@/types/common";
import {request} from "@/utils/Request";

type HisConstConfigEditProps<T> = {
    costConfigId: number
} & FormWrapProps<T>

const HisConstConfigEdit = <T extends Record<string, any>>(props: HisConstConfigEditProps<T>) => {
    const {costConfigId, type, open, onSuccess, onClose, width} = props;
    const {
        CostConfigId,
        ConstName,
        Type,
        TypeKey,
        Money,
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    } = useHisConstConfigField();

    const columns: ColumnsType[] = [
        CostConfigId,
        ConstName,
        Type,
        {
            valueType: "dependency",
            name: ["type"],
            columns: ({type}) => {
                if (type === `1`) {
                    return [
                        {
                            valueType:"formList",
                            dataIndex:"costList",
                            columns:[
                                {
                                    valueType:"group",

                                    columns:[
                                        {
                                            title: "选择科目",
                                            dataIndex: "subjectId",
                                            valueType: "select",
                                            formItemProps: {
                                                rules: [
                                                    {required: true, message: "科目必填"}
                                                ]
                                            },
                                            request: async () => {
                                                const response = await request("/hisSubject/listSelect");
                                                return response.data;
                                            }
                                        },
                                        {
                                            title: "选择职位",
                                            dataIndex: "positionIds",
                                            valueType: "select",
                                            width:240,
                                            fieldProps:{
                                                mode:"multiple"
                                            },
                                            formItemProps: {
                                                rules: [
                                                    {required: true, message: "请至少选择一个职位"}
                                                ]
                                            },
                                            request: async () => {
                                                const response = await request("/rest/position/listPositions");
                                                return response.data;
                                            }
                                        },]
                                }
                            ]
                        }
                    ];
                }
                return [];
            }
        },
        TypeKey,
        Money,
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    ];

    const {error, notification} = useAlert();

    return (
        <FormWrap<HisConstConfigType>
            open={open}
            type={type}
            onClose={onClose}
            width={width}
            request={async () => {
                return getHisConstConfigInfo(costConfigId);
            }}
            onFinish={async (values) => {
                const response = await saveHisConstConfig(costConfigId, values);
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

export default HisConstConfigEdit;
