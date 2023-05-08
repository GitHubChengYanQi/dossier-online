import {App} from "antd";
import {history} from "umi";

let sessionExpireShow: boolean = false
const useAlert = () => {

    const {modal, notification, message} = App.useApp();

    const sessionExpire = () => {
        /**
         * hash模式取 hash判断
         */
        const path = window.location.pathname || window.location.hash
        if (path !== "/user/login" && !sessionExpireShow) {
            sessionExpireShow = true
            modal.error({
                title: "会话过期",
                content: "当前登录信息已过期，请重新登录",
                okText: "重新登录",
                onOk: () => {
                    sessionExpireShow = false
                    history.push("/user/login?backUrl=" + window.location.href)
                }
            });
        }
    }
    const success = (message:string)=>{
        notification.success({
            message,
            placement:"bottomRight"
        });
    }
    const error = (message: string|undefined) => {
        modal.error({
            title: "操作失败",
            content: message,
            centered: true
        });
    }


    return {
        sessionExpire,
        modal,
        notification,
        message,
        error,
        success
    }
};
export default useAlert;