import {GridContent, PageContainer, ProCard, ProList} from "@ant-design/pro-components";
import {Layout, Tabs} from "antd";
import {pageRequest} from "@/utils/Request";
import React, {useState} from "react";
import AllMedical from "@/pages/BJ/components/allMedical";

type Tab = {
    key: string;
    label: React.ReactNode;
    children?: React.ReactNode;
}
const BJ = () => {


    const [openItems, setOpenItems] = useState<Tab[]>([]);
    const [defaultKey,setDefaultKey] = useState("all");
    return (
        <PageContainer>
            <GridContent contentWidth={"Fixed"}>
                <ProCard>
                    <Layout>
                        <Layout.Sider
                            width={240}
                            theme={"light"}
                        >
                            <ProList
                                rowKey="patientId"
                                toolbar={{
                                    search: {
                                        onSearch: (value: string) => {
                                            alert(value);
                                        },
                                    },
                                }}
                                metas={{

                                    title: {
                                        dataIndex: "name"
                                    },
                                    description: {
                                        dataIndex: 'idNumber',
                                    }
                                }}
                                request={async () => {
                                    const response = await pageRequest("/hisPatient/listByRegister")
                                    console.log(response.data)
                                    return response;
                                }}
                                onRow={(record) => {
                                    return {
                                        onClick: () => {
                                            console.log(record)
                                        },
                                    };
                                }}
                            />

                        </Layout.Sider>
                        <Layout.Content style={{padding: "8px 16px"}}>
                            <Tabs
                                onTabClick={(key)=>{
                                    setDefaultKey(key)
                                }}
                                activeKey={defaultKey}
                                items={[
                                ...openItems,
                                {
                                    key: "all",
                                    label: "全部",
                                    children: <AllMedical onClick={(value) => {
                                        const index = openItems.findIndex((item: any) => {
                                            return item.key === value.key;
                                        })
                                        if (index === -1) {

                                            setOpenItems([
                                                ...openItems,
                                                {
                                                    key: `${value.key}`,
                                                    label: value.title,
                                                    children: null
                                                }
                                            ]);
                                            // setDefaultKey(`${value.key}`)
                                        }
                                        setDefaultKey(`${value.key}`)
                                    }}/>
                                }
                            ]}/>
                        </Layout.Content>
                    </Layout>
                </ProCard>
            </GridContent>
        </PageContainer>
    );
}
export default BJ;