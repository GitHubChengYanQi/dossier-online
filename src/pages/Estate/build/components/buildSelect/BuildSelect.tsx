import {Card, Cascader, Form, Select, Table} from "antd";
import CitySelect, {CityType} from "@/components/CitySelect";
import {useState} from "react";
import {BetaSchemaForm, ProFormGroup} from "@ant-design/pro-components";
import {selectBuildAreaInfo} from "@/pages/Estate/buildArea/service";
import {useRequest} from "umi";
import {request} from "@/utils/Request";
import LinkButton from "@/components/LinkButton";

type BuildSelectProps = {
    value?: number;
    cityData?: CityType;
}
const BuildSelect: React.FC<BuildSelectProps> = (props) => {

    const {cityData} = props;
    const [cityTmpData, setCityData] = useState<CityType>(cityData || {});
    const [areaId, setAreaId] = useState<number>();
    const [partitionId, setPartitionId] = useState<number>();
    const [bnId, setBnId] = useState<number>();
    const [unitId, setUnitId] = useState<number>();
    const [floorId, setFloorId] = useState<number>();

    const {data: partitionData} = useRequest(async () => {
        if (!areaId) {
            return []
        }
        const response = await request("/buildPartition/listSelect", {
            method: "GET",
            params: {
                areaId
            }
        });

        return response.data.map((i: any) => {
            return {
                label: i.name,
                value: i.id,
                key: i.id
            };
        })
    }, {
        refreshDeps: [areaId]
    });


    const {data: bnData} = useRequest(async () => {
        console.log(areaId)
        console.log(partitionId)
        if (!areaId ||
            !partitionId) {
            return []
        }
        const response = await request("/build/getBn", {
            method: "GET",
            params: {
                areaId,
                partitionId
            }
        });

        return response.data
    }, {
        refreshDeps: [areaId, partitionId],
    });
    const {data: unitData} = useRequest(async () => {
        if (!areaId ||
            !partitionId ||
            !bnId) {
            return []
        }
        const response = await request("/build/getUnit", {
            method: "GET",
            params: {
                areaId,
                partitionId,
                bnId
            }
        });

        return response.data
    }, {
        refreshDeps: [areaId, partitionId, bnId],
    });
    const {data: floorData} = useRequest(async () => {
        if (!areaId ||
            !partitionId ||
            !bnId ||
            !unitId) {
            return []
        }
        const response = await request("/build/getFloor", {
            method: "GET",
            params: {
                areaId,
                partitionId,
                bnId,
                unitId
            }
        });

        return response.data
    }, {
        refreshDeps: [areaId, partitionId, bnId, unitId],
    });

    const {data: buildData, loading} = useRequest(async () => {
        console.log(floorId)
        if (!areaId ||
            !partitionId
        ) {
            return []
        }
        const response = await request("/build/list", {
            data: {
                buildAreaId: areaId,
                buildPartitionId: partitionId,
                bn: bnId,
                unit: unitId,
                floor: floorId
            }
        });

        return response.data
    }, {
        refreshDeps: [areaId, partitionId, bnId, unitId, floorId],
    });

    return (
        <Card>
            <Form.Item

                label={"省/市/区"}>
                <CitySelect
                    value={cityTmpData}
                    onChange={(values) => {
                        setCityData(values)
                    }}/>
            </Form.Item>
            <BetaSchemaForm
                layoutType={"Embed"}
                columns={[
                    {
                        title: "小区",
                        valueType: "select",
                        params: {
                            areaId: cityTmpData?.area
                        },
                        fieldProps: {
                            onChange: (value: number) => {
                                setPartitionId(undefined);
                                setBnId(undefined);
                                setUnitId(undefined);
                                setFloorId(undefined);
                                setAreaId(value);
                            }
                        },
                        request: async () => {
                            const response = await selectBuildAreaInfo(cityTmpData?.area || 0);
                            return response.data.map((i: any) => {
                                return {
                                    label: i.name,
                                    key: i.id,
                                    value: i.id,
                                }
                            });
                        }
                    }
                ]}

            />
            <ProFormGroup>
                <Form.Item
                    style={{minWidth: 100}}
                    label={"分区"}
                >
                    <Select
                        value={partitionId}
                        options={partitionData}
                        onChange={(value) => {
                            setBnId(undefined);
                            setUnitId(undefined);
                            setFloorId(undefined);
                            setPartitionId(value)
                        }}
                    />
                </Form.Item>
                <Form.Item
                    style={{minWidth: 100}}
                    label={"楼号"}
                >
                    <Select
                        value={bnId}
                        options={bnData}
                        onChange={(value) => {
                            setUnitId(undefined);
                            setFloorId(undefined);
                            setBnId(value)
                        }}
                    />
                </Form.Item>
                <Form.Item
                    style={{minWidth: 100}}
                    label={"单元"}
                >
                    <Select
                        value={unitId}
                        options={unitData}
                        onChange={(value) => {
                            setFloorId(undefined);
                            setUnitId(value)
                        }}
                    />
                </Form.Item>
                <Form.Item
                    style={{minWidth: 100}}
                    label={"楼层"}
                >
                    <Select
                        value={floorId}
                        options={floorData}
                        onChange={(value) => {
                            setFloorId(value)
                        }}
                    />
                </Form.Item>
            </ProFormGroup>
            <Table
                loading={loading}
                rowKey={"id"}
                dataSource={buildData}
                columns={[{
                    title: "房间",
                    render: (value: any, record: any) => {
                        return (
                            <>
                                {record.number}室
                            </>
                        );
                    }
                }, {
                    title: "地址",
                    dataIndex: "address"
                },{
                    width:100,
                    title:"选择",
                    render:(value: any, record: any)=>{
                        return <LinkButton onClick={()=>{
                            console.log(record.id)
                        }}>选择</LinkButton>
                    }
                }]}
            />
        </Card>
    );
}
export default BuildSelect;