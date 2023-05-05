import React, {useEffect} from "react";
import useAlert from "@/components/useAlert";
import {ConfigProvider as AntConfigProvider, App} from "antd";
import zhCN from 'antd/locale/zh_CN';
import dayjs from "dayjs";

dayjs.locale('zh-cn');

type alertProps = {
    children?: any
}
const ConfigProvider: React.FC<alertProps> = (props) => {

    const {children} = props;

    return (

        <AntConfigProvider
            locale={zhCN}
        >
            <App>{children}</App>
        </AntConfigProvider>

    )
};
export default ConfigProvider;