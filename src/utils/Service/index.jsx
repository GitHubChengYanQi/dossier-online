import cookie from 'js-cookie';
import axios from 'axios';
import {message, Modal} from 'antd';

const baseURI = "http://127.0.0.1";//config.baseURI || window.sing.sysURI;



const ajaxService = axios.create({
  baseURL: baseURI,
  withCredentials: true,
  headers: {
    // 'Content-Type':'application/json;charset=UTF-8',
  }
});

ajaxService.interceptors.request.use((config) => {
  const token = cookie.get('tianpeng-token');
  config.headers.Authorization = token || '';
  return config;
}, (error) => {
  return error;
});

ajaxService.interceptors.response.use((response) => {
  if (response.status !== 200) {
    throw new Error('网络错误');
  }
  console.log(response)
  response = response.data;
  const errCode = typeof response.errCode !== 'undefined' ? parseInt(response.errCode, 0) : 0;
  if (errCode !== 0) {
    if (errCode === 1502) {
      // cookie.remove('tianpeng-token');
      Modal.error({
        title: '提示',
        content: '您已登录超时，请重新登录。',
        okText: '重新登录',
        onOk: () => {
          Modal.destroyAll();
          try {
          } catch (e) {
            window.location.href = `/#/login?backUrl=${encodeURIComponent(window.location.href)}`;
          }
        }
      });
      throw new Error(response.message);
    } else if (errCode === 1001) {
      return response;
    } else if (errCode !== 200) {
      message.error(response.message);
    }
    throw new Error(response.message);
  }
  return response;
}, (error) => {
  // message.error('请求超时！');
  // if (error.errCode !== 0) {
  throw new Error(error.message);
  // }
  // return error;
});
export default ajaxService;