import React from "react";
import {
    DrawerForm,
    ModalForm,
    ProForm,
    ModalFormProps,
    DrawerFormProps,
    ProFormProps, ProCard, PageContainer
} from "@ant-design/pro-components";
import omit from "omit.js";

export declare type FormWrapProps<T> = {
    type?: "Form" | "Modal" | "Drawer";
    open?: boolean;
    onSuccess?: () => void;
    onClose?: () => void;
    children?: React.ReactNode | React.ReactNode[];
    isPage?: boolean;
} & Omit<ModalFormProps<T>, "children"> & Omit<DrawerFormProps<T>, "children"> & Omit<ProFormProps<T>, "children">

const FormWrap = <T extends Record<string, any>>(props: FormWrapProps<T>) => {

    const {open = false, isPage = true, type, title, onClose, children, width, modalProps, ...otherProps} = props;

    const renderForm = () => {
        return (
            <ProForm<T>
                {...omit(otherProps, ["onOpenChange"])}
            >
                {children}
            </ProForm>
        );
    }

    switch (type) {
        case "Modal":
            return (
                <ModalForm<T>
                    open={open}
                    title={title}
                    width={width}
                    modalProps={{
                        centered: true,
                        destroyOnClose: true
                    }}
                    onOpenChange={(visible) => {
                        if (!visible) {
                            onClose?.()
                        }
                    }}
                    {...modalProps}
                    {...otherProps}
                >
                    {children}
                </ModalForm>
            );
        case "Form":
            if (isPage) {
                return (
                    <PageContainer

                        header={{
                            title
                        }}
                    >
                        {renderForm()}
                    </PageContainer>
                );
            }
            return renderForm();
        case "Drawer":
        default:
            return (
                <DrawerForm<T>
                    open={open}
                    title={title}
                    width={width}
                    drawerProps={{
                        destroyOnClose: true
                    }}
                    onOpenChange={(visible) => {
                        if (!visible) {
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