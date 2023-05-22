import {Button, Result} from "antd";
import {history} from "@@/core/history";
import React from "react";

const Page404 = ()=>{

    return (
        <Result
            status={'404'}
            title={'404'}
            subTitle={'抱歉，你访问的页面不存在'}
            extra={
                <Button type="primary" onClick={() => history.push('/')}>
                    返回首页
                </Button>
            }
        />
    );
}
export default Page404;