/**
 * 检查项目配置列表页
 *
 * @author 
 * @Date 2023-04-14 11:48:58
 */

import React, {useRef} from 'react';
import useMedicalItemField from "../schema";
import {getMedicalItemList} from "../service";
import EditButton from "@/components/EditButton";
import TableOptionsWrap from "@/components/TableOptionsWrap";
import {PageContainer, ProTable,ActionType} from "@ant-design/pro-components";
import {Button} from "antd";

const MedicalItemList = () => {
    const {
        MedicalItemId,
        MedicalGroupId,
        Title,
        Type,
        Config,
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    } = useMedicalItemField();

    const columns = [
        MedicalItemId,
        MedicalGroupId,
        Title,
        Type,
        Config,
        Sort,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
        ];


    const actionRef = useRef<ActionType>();

    return (
        <PageContainer>
             <ProTable
                scroll={{x: "max-content"}}
                actionRef={actionRef}
                rowKey="medicalItemId"
                columns={columns}
                request={async (params, sorter, filter) => {
                    const {data, success} = await getMedicalItemList(params, sorter, filter);
                    return {
                        data: data || [],
                        success
                    };
                }}
                toolBarRender={() => [
                                <>
                                    <Button
                                        key="1"
                                        type="primary"
                                        onClick={() => {

                                        }}
                                    >
                                    新建
                                    </Button>
                                </>,
                            ]}
                        />
        </PageContainer>
    );
};

export default MedicalItemList;
