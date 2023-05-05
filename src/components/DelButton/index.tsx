import React from 'react';
import {ButtonProps, theme, Typography} from 'antd';
import useAlert from "@/components/useAlert";

type delButtonProps = {
    onSuccess?: () => void;
    onCancel?: () => void;
    disabled?: boolean;
    request?: () => Promise<any>;
} & ButtonProps

const { useToken } = theme;
const DelButton = (props: delButtonProps) => {

    const {
        onSuccess, onCancel,  children, request
    } = props
    const {modal} = useAlert();

    const { token } = useToken();

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
        <Typography.Link
            onClick={onClick}
            // style={{color:token.colorError}}
            >{children || '删除'}</Typography.Link>
    );
};

export default DelButton;
