import React, {useEffect, useState} from 'react';
import {Alert, Space} from "antd";
import {
    AlipayCircleOutlined, LockOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WechatOutlined,
    WeiboCircleOutlined
} from "@ant-design/icons";
import {ProFormText, LoginForm} from "@ant-design/pro-components";
import {login, loginProps} from "@/services/BASE_SYSTEM/user";
import {ResponseData} from "@/types/common";
import useAlert from "@/components/useAlert";
import cookie from "js-cookie";
import {useModel,useNavigate, history} from "umi";
import qs from "qs";

const iconStyles = {
    marginInlineStart: '16px',
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};
const Login = () => {

    const {error} = useAlert();
    const {refresh} = useModel('@@initialState');
    const [message,setMessage] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        window.document.title = '欢迎使用数字化管理系统';
    });

    return (
        <div>
            <div>
                <LoginForm<loginProps>
                    title="妇幼健康"
                    subTitle="妇幼健康服务与管理信息系统"
                    actions={
                        <Space>
                            其他登录方式
                            <AlipayCircleOutlined style={iconStyles}/>
                            <TaobaoCircleOutlined style={iconStyles}/>
                            <WeiboCircleOutlined style={iconStyles}/>
                            <WechatOutlined style={iconStyles}/>
                        </Space>
                    }
                    onFinish={async (values) => {
                        const response: ResponseData<string> = await login(values);
                        if (response.errCode) {
                            error(response.message);
                        }
                        const params: any = qs.parse(location.search.substring(1))
                        cookie.set('Authorization', response.data||"");
                        setMessage("登录成功,请稍后...")
                        if (params.backUrl) {
                            window.location.href = params.backUrl;
                        } else {
                            refresh();
                            // window.location.href = '/ZXJC/quick'
                            navigate('/ZXJC/quick',{replace:true});
                        }
                    }}
                    message={message&&<Alert type="success" showIcon message={message} style={{margin:8}} />}
                >
                    <ProFormText
                        name="username"
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined className={'prefixIcon'}/>,
                        }}
                        placeholder={'用户名: admin or user'}
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    />
                    <ProFormText.Password
                        name="password"
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={'prefixIcon'}/>,
                        }}
                        placeholder={'密码: ant.design'}
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                        ]}
                    />
                </LoginForm>
            </div>
        </div>
    );

};
export default Login;
