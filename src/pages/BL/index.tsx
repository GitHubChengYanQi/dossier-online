import {GridContent, PageContainer, ProCard} from "@ant-design/pro-components";
import {Col, Layout, Row, Tabs} from "antd";
import React, {useState} from "react";
import MedicalResultList from "@/pages/BL/components/medicalResult/medicalResultList";
import PatientInfo from "@/pages/BL/components/patientInfo";
import PatientLeftList from "@/pages/BL/components/patientLeftList";
import InspectList from "@/pages/BL/components/inspect/inspectList";
import PatientIdLayout from "@/pages/BL/components/PatientLayout";

type Tab = {
    key: string;
    label: React.ReactNode;
    children?: React.ReactNode;
}
const RenderBL = (props: {
    patientId?: number
}) => {
    const {patientId} = props;
    return (<Tabs
        tabPosition={"left"}
        items={[
            {
                label: "检查",
                key: "2",
                children: <InspectList patientId={patientId}/>
            },
            {
                label: "病例",
                key: "1",
                children: <MedicalResultList patientId={patientId||0}/>
            },
        ]}/>);
}
const BL = () => {

    return (
        <PatientIdLayout>
            <RenderBL/>

        </PatientIdLayout>
    );
}
export default BL;