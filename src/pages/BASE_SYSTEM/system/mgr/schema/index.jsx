import {Radio, Switch} from "antd";
import {ProFormSelect, ProFormText, ProFormTreeSelect} from "@ant-design/pro-components";
import {getTree} from "../../../../../services/BASE_SYSTEM/dept";
import {getAll} from "../../../../../services/BASE_SYSTEM/position";
import React from "react";

export const Account = {
    title: '账号', dataIndex: 'account', order: 10,
    formItemProps: {
        rules: [
            {
                required: true,
                message: '请输入账号!',

            }
        ]
    }
};
export const Birthday = {
    title: '生日', dataIndex: 'birthday',
    valueType: "date",order:1

};
export const Email = {
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
export const Name = {
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
export const SexName = {
    title: '性别', dataIndex: 'sexName', formItemProps: {
        name: "sex"
    }, renderFormItem: () => {
        return (<Radio.Group>
            <Radio value="M">男</Radio>
            <Radio value="F">女</Radio>
        </Radio.Group>)
    }
};
export const PassWord = {
    title: '密码', order:8,formItemProps: {
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
export const RePassWord = {
    title: '确认密码',
    order:7,
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
export const DeptName = {
    title: '部门', dataIndex: 'deptId', order: 6, formItemProps: {
        name: "deptId",
        rules: [
            {
                required: true,
                message: '请选择部门!',
            }
        ]
    },
    fieldProps:{
        treeDefaultExpandAll: true
    },
    valueType: "treeSelect",
    request: async (params) => {
        return await getTree();
    }
};
export const PositionName = {
    title: '职位', dataIndex: 'positionName', order: 5,
    formItemProps:{
        name:"position",
        rules: [
            {
                required: true,
                message: '请选择职位!',

            }
        ]
    },
    fieldProps: {
        mode:"multiple"
    },
    request:async (params) => {
        return await getAll();
    }
};
export const CreateTime = {
    title: '创建时间', dataIndex: 'createTime', hideInSearch: true, hideInForm: true
};
export const Status = {
    title: '状态', valueType: "radio", formItemProps: {
        name: "status"
    }, valueEnum: {
        ENABLE: {
            text: '启用', status: 'Error',
        }, closed: {
            text: '禁用', status: 'Success',
        },
    }, render: (value, record) => {
        return (<Switch
            checkedChildren="启用"
            unCheckedChildren="冻结"
            style={{width: 60}}
            defaultChecked={record.status === 'ENABLE'}
            onChange={(checked) => {
                if (checked) {
                    unfreeze(record.userId);
                } else {
                    freeze(record.userId);
                }
            }}
        />);
    }
}