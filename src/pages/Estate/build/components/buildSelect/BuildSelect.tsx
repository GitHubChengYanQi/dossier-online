import {Card, Typography, Form, Select, Table, Space, Button} from "antd";
import CitySelect, {CityType} from "@/components/CitySelect";
import {useState} from "react";
import {BetaSchemaForm, ProFormGroup} from "@ant-design/pro-components";
import {selectBuildAreaInfo} from "@/pages/Estate/buildArea/service";
import {useRequest} from "umi";
import {request} from "@/utils/Request";
import LinkButton from "@/components/LinkButton";


export declare type BuildSelectValueType = {
    areaId?: number;
    areaName?: string;
    partitionId?: number;
    partitionName?: string;
    bnId?: string;
    bnName?: string;
    unitId?: number;
    unitName?: string;
    floorId?: number;
    floorName?: string;
    buildId?: number;

    address?: string;
}

type BuildSelectProps = {
    value?: number;
    cityData?: CityType;

    onChange?: (value?: BuildSelectValueType) => void;

    selectBuild?: boolean
}
const BuildSelect: React.FC<BuildSelectProps> = (props) => {

    const {cityData, onChange, selectBuild = true} = props;

    const [cityTmpData, setCityData] = useState<CityType>(cityData || {});
    const [areaId, setAreaId] = useState<number>();
    const [areaName, setAreaName] = useState<string>();
    const [partitionId, setPartitionId] = useState<number>();
    const [partitionName, setPartitionName] = useState<string>();
    const [bnId, setBnId] = useState<string>();
    const [bnName, setBnName] = useState<string>();
    const [unitId, setUnitId] = useState<number>();
    const [unitName, setUnitName] = useState<string>();
    const [floorId, setFloorId] = useState<number>();
    const [floorName, setFloorName] = useState<string>();
    const [buildId, setBuildId] = useState<BuildSelectValueType>();

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
        if ((!areaId ||
            !partitionId) && selectBuild
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
        refreshDeps: [areaId, partitionId, bnId, unitId, floorId, selectBuild],
    });

    const set = (record?: any) => {
        const value: BuildSelectValueType = {
            areaId,
            areaName,
            partitionId,
            partitionName,
            bnId,
            bnName,
            unitId,
            unitName,
            floorId,
            floorName,
            buildId: record?.id,
            address: record?.address
        }
        onChange?.(value);
        setBuildId(value);
    }

    const reSet = () => {
        // setAreaId(undefined);
        // setAreaName(undefined);
        // setPartitionId(undefined);
        // setPartitionName(undefined);
        // setBnId(undefined);
        // setBnName(undefined);
        // setUnitId(undefined);
        // setUnitName(undefined);
        // setFloorId(undefined);
        // setFloorName(undefined);

        setBuildId(undefined);

        onChange?.(undefined)
    }
    if (buildId) {
        return (
            <Space>
                <Typography.Text
                    strong>{selectBuild ? buildId.address : (buildId.areaName || "") + "_" + (buildId.partitionName || "") + "_" + (buildId.bnName || "") + "_" + (buildId.unitName || "") + "_" + (buildId.floorName || "")}</Typography.Text>
                <LinkButton
                    onClick={() => {
                        reSet();
                    }}>重选</LinkButton>
            </Space>
        );
    }

    return (
        <Card>
            <Form.Item

                label={"省/市/区"}>
                <CitySelect
                    value={cityTmpData}
                    onChange={(values) => {
                        setCityData(values)
                    }}
                />
            </Form.Item>
            <BetaSchemaForm
                layoutType={"Embed"}
                // initialValue={{
                //     area:areaId
                // }}
                columns={[
                    {
                        title: "小区",
                        valueType: "select",
                        params: {
                            areaId: cityTmpData?.area
                        },
                        dataIndex: "area",
                        initialValue: areaId,
                        fieldProps: {
                            onChange: (value: number, options: any) => {
                                setPartitionId(undefined);
                                setPartitionName(undefined);
                                setBnId(undefined);
                                setBnName(undefined);
                                setUnitId(undefined);
                                setUnitName(undefined);
                                setFloorId(undefined);
                                setFloorName(undefined);
                                setAreaId(value);
                                setAreaName(options.label);
                            }
                        },
                        request: async () => {
                            console.log(areaId)
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
                    style={{minWidth: 120}}
                    label={"分区"}
                >
                    <Select
                        placeholder={"请选择"}
                        value={partitionId}
                        options={partitionData}
                        onChange={(value, option: any) => {
                            setBnId(undefined);
                            setBnName(undefined);
                            setUnitId(undefined);
                            setUnitName(undefined);
                            setFloorId(undefined);
                            setFloorName(undefined);
                            if(value) {
                                setPartitionId(value)
                                setPartitionName(option.label)
                            }
                        }}
                    />
                </Form.Item>
                <Form.Item
                    style={{minWidth: 100}}
                    label={"楼号"}
                >
                    <Select
                        allowClear
                        placeholder={"请选择"}
                        value={bnId}
                        options={bnData}
                        onChange={(value, option: any) => {
                            setUnitId(undefined);
                            setUnitName(undefined);
                            setFloorId(undefined);
                            setFloorName(undefined);
                            if(value){
                                setBnId(value)
                                setBnName(option.label)
                            }else{
                                setBnId(undefined)
                                setBnName(undefined)
                            }
                        }}
                    />
                </Form.Item>
                <Form.Item
                    style={{minWidth: 100}}
                    label={"单元"}
                >
                    <Select
                        allowClear
                        placeholder={"请选择"}
                        value={unitId}
                        options={unitData}
                        onChange={(value, option: any) => {
                            setFloorId(undefined);
                            setFloorName(undefined);
                            if(value){
                                setUnitId(value)
                                setUnitName(option.label)
                            }else{
                                setUnitId(undefined)
                                setUnitName(undefined)
                            }

                        }}
                    />
                </Form.Item>
                <Form.Item
                    style={{minWidth: 100}}
                    label={"楼层"}
                >
                    <Select
                        allowClear
                        placeholder={"请选择"}
                        value={floorId}
                        options={floorData}
                        onChange={(value, option: any) => {
                            if(value) {
                                setFloorId(value)
                                setFloorName(option.label)
                            }else{
                                setFloorId(undefined)
                                setFloorName(undefined)
                            }
                        }}
                    />
                </Form.Item>
                {!selectBuild && <Form.Item
                    label={"操作"}>
                    <Button type={"primary"} onClick={() => {
                        set();
                    }}>确认区域</Button>
                </Form.Item>}
            </ProFormGroup>
            {selectBuild && <Table
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
                }, {
                    width: 100,
                    title: "选择",
                    render: (value: any, record: any) => {
                        return <LinkButton onClick={() => {
                            set(record);
                        }}>选择</LinkButton>
                    }
                }]}
            />}
        </Card>
    );
}
export default BuildSelect;