/**
 * 检查分组列表页
 *
 * @author 
 * @Date 2023-04-14 11:48:58
 */

import React, {useRef} from 'react';
import useMedicalGroupField from "../schema";
import {getMedicalGroupList} from "../service";
import EditButton from "@/components/EditButton";
import TableOptionsWrap from "@/components/TableOptionsWrap";
import {PageContainer, ProTable,ActionType} from "@ant-design/pro-components";
import {Button} from "antd";

const MedicalGroupList = () => {
    const {
        MedicalGroupId,
        Name,
        Code,
        CreateTime,
        CreateUser,
        UpdateTime,
        UpdateUser,
        Display,
    } = useMedicalGroupField();

    const columns = [
        MedicalGroupId,
        Name,
        Code,
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
                rowKey="medicalGroupId"
                columns={columns}
                request={async (params, sorter, filter) => {
                    const {data, success} = await getMedicalGroupList(params, sorter, filter);
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

export default MedicalGroupList;
