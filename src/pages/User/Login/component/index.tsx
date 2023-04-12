import React from 'react';
import {Space} from 'antd';
import {
    UserOutlined,
    LockOutlined,
    AlipayCircleOutlined,
    TaobaoCircleOutlined,
    WeiboCircleOutlined, WechatOutlined
} from '@ant-design/icons';
import cookie from 'js-cookie';
import {useRequest} from '@/utils/Request';
import {useLocation, history, useModel} from 'umi';
import qs from "qs";
import {login} from "@/services/BASE_SYSTEM/user";
import {LoginForm} from "@ant-design/pro-form";
import {ProFormText} from "@ant-design/pro-components";

const loginUrl = {
    url: '/rest/login',
    method: 'POST',
};

const iconStyles = {
    marginInlineStart: '16px',
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};

export interface loginProps {
    submitText?: string
}

const LoginComponent: React.FC<loginProps> = (props) => {

    // const {submitText} = props;
    //
    // const {refresh} = useModel('@@initialState');
    // const location = useLocation();
    // const params: any = qs.parse(location.search.substring(1))
    // const {run, data, error, loading} = useRequest(loginUrl, {
    //     manual: true,
    //     ready: true,
    //     onSuccess: response => {
    //         if (response) {
    //             cookie.set('tianpeng-token', response.data);
    //             refresh();
    //             setTimeout(() => {
    //                 if (params.backUrl) {
    //                     window.location.href = params.backUrl;
    //                 } else {
    //
    //                     history.replace('/ZXJC/quick');
    //                 }
    //             }, 1500);
    //         }
    //     }
    // });

    return (
        <>
            <LoginForm
                title="Github"
                subTitle="全球最大的代码托管平台"
                actions={
                    <Space>
                        其他登录方式
                        <AlipayCircleOutlined style={iconStyles}/>
                        <TaobaoCircleOutlined style={iconStyles}/>
                        <WeiboCircleOutlined style={iconStyles}/>
                        <WechatOutlined style={iconStyles}/>
                    </Space>
                }
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
        </>
    );
}

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
