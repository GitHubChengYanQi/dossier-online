import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />;

const Loading = ()=>{
    return <div
        style={{
            minHeight:"500px",
            // background: '#fafafa',
            paddingTop: 12,
            paddingLeft:40,
            paddingRight:40,
            textAlign:"center",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }}
    ><Spin indicator={antIcon} /></div>
}
export default Loading;