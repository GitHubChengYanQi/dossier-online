import React from 'react';
import {Button, ButtonProps} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import useAlert from "@/components/useAlert";

type delButtonProps = {
    onSuccess?: () => void;
    onCancel?: () => void;
    disabled?: boolean;
    request?: () => Promise<any>;
} & ButtonProps
const DelButton = (props: delButtonProps) => {

    const {
        onSuccess, onCancel, disabled, children, icon,request, ...other
    } = props
    const {modal} = useAlert();


    const onClick = () => {
        modal.confirm({
            title: '提示',
            content: '删除后不可恢复，是否确认删除？',
            centered:true,
            onOk: async () => {
                await request?.();
                onSuccess?.();
            },
            onCancel: () => {
                onCancel?.();
            }
        });
    };

    return (
        <Button
            disabled={disabled}
            size="small" danger onClick={onClick} icon={icon || <DeleteOutlined/>}
            type="text" {...other} >{children || '删除'}</Button>
    );
};

export default DelButton;
