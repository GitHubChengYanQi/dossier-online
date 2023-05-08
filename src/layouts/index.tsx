import React from "react";

import ConfigProvider from "@/components/ConfigProvider";
import Main from "@/layouts/main";

const DiyLayout =()=> {

    return (
        <ConfigProvider>
            <Main />
        </ConfigProvider>);
}
export default DiyLayout;