import React, {useMemo, useState} from 'react';
import {
    PageContainer,
    GridContent,
    ProCard,
} from '@ant-design/pro-components';
import {Row, Col} from 'antd';

import PatientLeftList from "@/pages/BL/components/patientLeftList";
import PatientInfo from "@/pages/BL/components/patientInfo";


const PatientIdLayout = (props: { children?: any, marginLeft?: number } & Record<string, any>) => {

        const {children, marginLeft = 100, onChange, ...restProps} = props;

        const [patientId, setPatientId] = useState<number>(0);
        const onPatientChange = (patientId: number) => {
            setPatientId(patientId)
        }

        const childrenRender = useMemo(() => {
            console.log(children.props)
            if (children) {
                if (React.isValidElement(children)) {
                    return React.cloneElement(children, {
                        ...{patientId},
                        ...restProps,
                        ...children.props as object,
                    });
                }
                return <>{children}</>;
            }
            return;
        }, [children, onChange, restProps]);

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
                                onPatientChange(patientId)
                            }}/>
                        </Col>
                        <Col
                            sm={24}
                            xl={16}
                        >
                            <Row gutter={[0, 16]}>
                                <Col span={24}>
                                    <div style={{marginLeft}}>
                                        <ProCard>
                                            <PatientInfo patientId={patientId}/>
                                        </ProCard>
                                    </div>
                                </Col>
                                {patientId > 0 && <Col
                                    span={24}
                                >
                                    {childrenRender}
                                </Col>}
                            </Row>
                        </Col>
                    </Row>
                </GridContent>
            </PageContainer>
        );
    }
;

export default PatientIdLayout;
