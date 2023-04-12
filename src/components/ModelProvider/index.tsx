import React, {useEffect} from "react";
import {useModel} from "umi";

declare type ModelProviderProps = {

    children:React.ReactNode
}
const ModelProvider:React.FC<ModelProviderProps> = (props)=>{
    const {children} = props;
    /**
     * 用这个延迟 数据流 的请求
     */
    const {run:deptRun} = useModel("dept");
    const {run:positionRun} = useModel("position");

    useEffect(()=>{
        deptRun();
        positionRun();
    },[]);

    return <>{children}</>
    // if(deptData && positionData){
    //
    // }
    // return <div>
    //     基础数据初始化失败
    // </div>

}
export default ModelProvider;