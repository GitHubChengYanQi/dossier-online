import React from "react";
import {ConfigProvider as AntConfigProvider, App} from "antd";
import zhCN from 'antd/locale/zh_CN';
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';



type alertProps = {
    children?: any
}
const ConfigProvider: React.FC<alertProps> = (props) => {

    const {children} = props;
    dayjs.locale('zh-cn');
    return (

        <AntConfigProvider
            locale={zhCN}
            theme={{
                token:{
                    borderRadius:4
                }
            }}
        >
            <App>{children}</App>
        </AntConfigProvider>

    )
};
export default ConfigProvider;