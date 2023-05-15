import {GridContent, PageContainer, ProCard} from "@ant-design/pro-components";
import {Col, Row, Tabs} from "antd";
import React, {useState} from "react";
import AllMedical from "@/pages/BJ/components/allMedical";
import RenderMedical from "@/pages/BL/components/RenderMedical";
import PatientLeftList from "@/pages/BL/components/patientLeftList";
import PatientInfo from "@/pages/BL/components/patientInfo";

type Tab = {
    key: string;
    label: React.ReactNode;
    children?: React.ReactNode;
}
const BJ = () => {


    const [openItems, setOpenItems] = useState<Tab[]>([]);
    const [defaultKey, setDefaultKey] = useState("all");
    const [patientId, setPatientId] = useState<number>(0);

    const onChange = (patientId: number) => {
        setPatientId(patientId)
        const tmp = openItems.map((item: any) => {
            // if (item.key === defaultKey) {
            item.children = <RenderMedical patientId={patientId} medicalId={item.key}/>
            // }
            return item;
        })
        setOpenItems(tmp);
    }


    return (
        <PageContainer>
            <GridContent
                contentWidth={"Fixed"}
                style={{maxWidth: 1600}}
            >
                <Row
                    gutter={[16, 16]}
                >
                    <Col
                        sm={24}
                        xl={8}
                    >
                        <PatientLeftList onChange={(patientId: number) => {
                            onChange(patientId)
                        }}/>
                    </Col>
                    <Col
                        sm={24}
                        xl={16}
                    >
                        <Row gutter={[0, 16]}>
                            <Col>
                                <ProCard>
                                    <PatientInfo patientId={patientId}/>
                                </ProCard>
                            </Col>
                            <Col span={24}>

                                <ProCard>
                                    <Tabs
                                        onTabClick={(key) => {
                                            setDefaultKey(key)
                                        }}
                                        activeKey={defaultKey}
                                        items={[
                                            ...openItems,
                                            {
                                                key: "all",
                                                label: "全部",
                                                children: <AllMedical
                                                    onClick={(value) => {
                                                        const index = openItems.findIndex((item: any) => {
                                                            return item.key === value.key;
                                                        })
                                                        if (index === -1) {

                                                            setOpenItems([
                                                                ...openItems,
                                                                {
                                                                    key: `${value.key}`,
                                                                    label: value.title,
                                                                    children: <RenderMedical patientId={patientId}
                                                                                             medicalId={`${value.key}`}/>
                                                                }
                                                            ]);
                                                            // setDefaultKey(`${value.key}`)
                                                        }
                                                        setDefaultKey(`${value.key}`)
                                                    }}/>
                                            }
                                        ]}/>
                                </ProCard>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </GridContent>
        </PageContainer>
    );
}
export default BJ;