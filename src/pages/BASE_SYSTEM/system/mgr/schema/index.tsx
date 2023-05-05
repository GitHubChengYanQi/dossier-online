import {Radio, Switch} from "antd";
import React, {useState} from "react";
import {ColumnsType} from "@/types/common";
import {freeze, unfreeze} from "@/services/BASE_SYSTEM/user";
import {useModel} from "umi";


interface statusProps {
    record: any
}

export const StatusRender: React.FC<statusProps> = (props) => {
    const {record} = props;

    const [value, setValue] = useState(record.status);
    const [loading, setLoading] = useState(false);

    return <Switch
        checkedChildren="启用"
        unCheckedChildren="冻结"
        style={{width: 60}}
        checked={value === 'ENABLE'}
        loading={loading}
        onChange={async (checked) => {
            if (checked) {
                setLoading(true)
                await unfreeze(record.userId);
                setValue("ENABLE")
                setLoading(false)
            } else {
                setLoading(true)
                await freeze(record.userId);
                setValue("LOCKED")
                setLoading(false)
            }
        }}
    />
}

const useUserField = () => {
    const {data: deptData, run: deptRun} = useModel("dept");
    const {data: positionData, run: positionRun} = useModel("position");

    const Account: ColumnsType = {
        title: '账号', dataIndex: 'account', order: 10,
        fieldProps: {},
        formItemProps: {
            name: "account",
            rules: [
                {
                    required: true,
                    message: '请输入账号!',

                }
            ]
        }
    };
    const Birthday: ColumnsType = {
        title: '生日', dataIndex: 'birthday',
        valueType: "date", order: 1

    };
    const Email: ColumnsType = {
        title: '电子邮件', dataIndex: 'email',
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: '请输入电子邮件地址!',

                }
            ]
        }

    };
    const Name: ColumnsType = {
        title: '名称', dataIndex: 'name', order: 9,
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: '请输入名称!',

                }
            ]
        }
    }
    const SexName: ColumnsType = {
        title: '性别', dataIndex: 'sexName',  formItemProps: {
            name: "sex",
        }, renderFormItem: () => {
            return (<Radio.Group>
                <Radio value="M">男</Radio>
                <Radio value="F">女</Radio>
            </Radio.Group>)
        }
    };
    const PassWord: ColumnsType = {
        title: '密码', order: 8, formItemProps: {
            name: "password",
            rules: [
                {
                    required: true,
                    message: '请输入密码!',

                }
            ]
        },
        valueType: "password"
    };
    const RePassWord: ColumnsType = {
        title: '确认密码',
        order: 7,
        formItemProps: {
            name: "rePassword",
            rules: [
                {
                    required: true,
                    message: '请输入确认密码!',

                },
                ({getFieldValue}) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('两次密码输入不一致!'));
                    },
                })
            ]
        }, valueType: "password",
    };
    const DeptId: ColumnsType = {
        title: '部门',
        dataIndex: 'deptId',
        order: 6,
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: '请选择部门!',
                }
            ]
        },
        fieldProps: {
            treeDefaultExpandAll: true,
            treeData:deptData
        },
        valueType: "treeSelect",
    };
    const DeptName: ColumnsType = {
        title: '部门',
        dataIndex: 'deptName',
        order: 0,
        formItemProps: {
            hidden:true,
            name: "deptId",
            rules: [
                {
                    required: true,
                    message: '请选择部门!',
                }
            ]
        },
        fieldProps: {
            treeDefaultExpandAll: true,
            treeData:deptData
        },
        valueType: "treeSelect",
    };
    const PositionName: ColumnsType = {
        title: '职位', dataIndex: 'positionName', order: 5,
        formItemProps: {
            name: "position",
            rules: [
                {
                    required: true,
                    message: '请选择职位!',

                }
            ]
        },
        fieldProps: {
            mode: "multiple"
        },
        request: async () => {
            if (!positionData) {
                const response = await positionRun();
                return response;
            }
            return positionData;
        }
    };
    const CreateTime: ColumnsType = {
        title: '创建时间', dataIndex: 'createTime', hideInSearch: true, hideInForm: true
    };
    const roleName: ColumnsType = {
        title: '角色', dataIndex: 'roleName', hideInSearch: true, hideInForm: true
    };
    const Status: ColumnsType = {
        order:1,
        title: '状态', valueType: "radio", formItemProps: {
            name: "status"
        },
        // align: "center",
        valueEnum: {
            ENABLE: {
                text: '启用', status: 'Error',
            }, closed: {
                text: '禁用', status: 'Success',
            },
        }, render: (value, record) => {
            return <StatusRender record={record}/>;
        }
    }
    return {
        Account,
        Birthday,
        Email,
        Name,
        SexName,
        PassWord,
        RePassWord,
        DeptName,
        PositionName,
        CreateTime,
        roleName,
        Status,
        DeptId
    }
}
export default useUserField;
