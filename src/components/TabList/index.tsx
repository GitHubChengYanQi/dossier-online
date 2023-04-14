import {createGlobalStyle,history, styled} from "umi";
import React, {useEffect, useRef} from "react";
import {Tabs, TabsProps, theme} from "antd";
import {GlobalToken} from "antd/es/theme/interface";
import useTabList from "@/components/TabList/useTabList";


const {useToken} = theme;
const GlobalStyle = styled.div<{ token: GlobalToken }>`
  #iframe {
    .ant-tabs-nav {
      .ant-tabs-tab {
        background: ${props => {
          return props.token.colorBgContainer
        }};
        border-radius: 0 !important;
        border-top: none;
        padding: 6px 16px;

        .ant-tabs-tab-remove {
          margin-left: 0;
          margin-right: -12px;
        }

        .ant-tabs-tab-btn {
          > a {
            color: ${props => props.token.colorTextSecondary}
          }
        }

      }

      .ant-tabs-tab-active {
        .ant-tabs-tab-btn {
          > a {
            color: ${props => props.token.colorPrimaryActive}
          }
        }

        background: ${props => (props.token.colorBgLayout)};
        border-bottom-color: ${props => (props.token.colorBgLayout)};
      }
    }

  }
`;

const TabList: React.FC<Partial<any>> = (props) => {

    const {children} = props;
    const {token} = useToken();

    const {onEdit, renderRoute, element, routes} = useTabList();
    const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
        <div id="iframe" style={{top: 56, position: "sticky", zIndex: 1}}>
            <DefaultTabBar {...props}  />
        </div>);

    return (
        <>
            {element?.props?.to && element}
            {routes ?
                <>
                    <GlobalStyle token={token}>
                    <Tabs
                        onTabClick={(key) => {
                            history.replace(key);
                        }}
                        size="small"

                        activeKey={renderRoute.path}
                        tabBarStyle={{
                            paddingLeft: 40,
                            backgroundColor: "#fff"
                        }}
                        renderTabBar={renderTabBar}
                        type="editable-card"
                        hideAdd
                        // animated
                        onEdit={onEdit}
                        items={routes}/>
                    </GlobalStyle></>
                : children}
        </>
    );
}
export default TabList;