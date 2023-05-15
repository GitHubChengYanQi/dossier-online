import React from "react";
import {ProCard} from "@ant-design/pro-components";
import {styled, useRequest} from "umi";
import {request} from "@/utils/Request";
import {Col, Row, Typography} from "antd";

const Div = styled.div`
  text-align: right;
`;

type AllMedicalProps = {
    onClick?: (value: {
        key: string | number;
        title: string;
    }) => void;
}
const AllMedical: React.FC<AllMedicalProps> = (props) => {
    const {onClick} = props;

    const {data} = useRequest(async () => {
        const response = await request("/medical/listSelect");
        return response.data;
    });
    return (
        <ProCard
            split={"horizontal"}
        >
            <ProCard title={"常用"}></ProCard>
            <ProCard
                title={"所有检查"}
                gutter={16}
            >
                <Row gutter={8}>
                    {data && data.map((item: any, index: number) => {
                        return (
                            <Col key={index} span={8}>
                                <div onClick={() => {
                                    onClick?.({
                                        key:item.value,
                                        title:item.label
                                    });
                                }}>
                                    <ProCard bordered style={{width: "100%"}}>
                                        <div>{item.label}</div>
                                        <Div><Typography.Link>设为常用</Typography.Link></Div>
                                    </ProCard>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </ProCard>
        </ProCard>
    );
}

export default AllMedical;