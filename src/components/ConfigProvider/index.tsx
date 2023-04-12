import React, {useEffect} from "react";
import useAlert from "@/components/useAlert";
import {SettingDrawer} from "@ant-design/pro-layout";


type alertProps = {
    children?: any
}
const ConfigProvider: React.FC<alertProps> = (props) => {

    const useAlertFunc = useAlert();

    const {children} = props;

    useEffect(() => {
        const _window = window as any;
        _window.ds = {
            ...useAlertFunc
        };
    }, [])

    return <>{children}</>
};
export default ConfigProvider;