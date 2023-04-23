import React from "react";
import {
    DrawerForm,
    ModalForm,
    ProForm,
    ModalFormProps,
    DrawerFormProps,
    ProFormProps, ProCard
} from "@ant-design/pro-components";

export declare type FormWrapProps<T> = {
    type?: "Form" | "Modal" | "Drawer";
    open?: boolean;
    onSuccess?: () => void;
    onClose?: () => void;
    children?: React.ReactNode | React.ReactNode[];
} & Omit<ModalFormProps<T>, "children"> & Omit<DrawerFormProps<T>, "children"> & Omit<ProFormProps<T>, "children">
const FormWrap = <T extends Record<string, any>>(props: FormWrapProps<T>) => {

    const {open = false, type, title, onClose, children,width, ...otherProps} = props;

    switch (type) {
        case "Modal":
            return (
                <ModalForm<T>
                    open={open}
                    title={title}
                    width={width}
                    modalProps={{
                        centered:true,
                        destroyOnClose:true
                    }}
                    onOpenChange={(visible) => {
                        if(!visible){
                            onClose?.()
                        }
                    }}
                    {...otherProps}
                >
                    {children}
                </ModalForm>
            );
        case "Form":
            return (
                <ProCard>
                    <ProForm<T>
                        {...otherProps}
                    >
                        {children}
                    </ProForm>
                </ProCard>
            );
        case "Drawer":
        default:
            return (
                <DrawerForm<T>
                    open={open}
                    title={title}
                    width={width}
                    drawerProps={{
                        destroyOnClose:true
                    }}
                    onOpenChange={(visible) => {
                        if(!visible){
                            onClose?.()
                        }
                    }}
                    {...otherProps}
                >
                    {children}
                </DrawerForm>
            );
    }

}
export default FormWrap;