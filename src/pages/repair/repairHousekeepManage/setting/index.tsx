import {PageContainer, ProCard, ProForm, QueryFilter} from "@ant-design/pro-components";
import {useRequest} from "umi";
import {selectBuildAreaInfo} from "@/pages/Estate/buildArea/service";
import React, {useState} from "react";
import CitySelect, {CityType} from "@/components/CitySelect";
import {Form, Tag} from "antd";
import LinkButton from "@/components/LinkButton";
import SetUser from "@/pages/repair/repairDeptManage/setting/components/setUser";
import {request} from "@/utils/Request";
import {delRepairHousekeeperManageInfo} from "@/pages/repair/repairHousekeepManage/service";
import {UserOutlined} from "@ant-design/icons";


const RepairUserManageSetting = () => {

    const [cityTmpData] = useState<CityType>({
        province: "503",
        city: "600"
    });

    const [partitionId, setPartitionId] = useState<number>();
    const [areaId, setAreaId] = useState<number>();
    const [regionId, setRegionId] = useState<number>();

    const {data} = useRequest(async () => {
        const response = await selectBuildAreaInfo(cityTmpData?.area || 0);
        return response.data;
    })

    const {data: configData, refresh} = useRequest(async () => {
        const response = await request("/repairHousekeeperManage/listSelect");
        return response.data;
    });

    const getUserData = (data: any[], areaId: number, partitionId: number, bn: string, unit: number, floor: number): any => {
        const result = data.filter((i: any) => {
            return i.areaId === areaId && i.partitionId === partitionId && i.bn === bn && i.unit === unit && i.floor === floor;
        });

        if (result.length === 0) {
            return null
        }
        return (
            <ProCard
                key={`${areaId}` + `${partitionId}` + `${bn}` + `${unit}` + `key`}
            >
                {result.map((n: any) => (
                    <Tag
                        icon={<UserOutlined/>}
                        key={n.repairDeptManageId}
                        closable
                        onClose={async () => {
                            await delRepairHousekeeperManageInfo(n.repairDeptManageId);
                            refresh();
                        }}
                        color={n.isMain ? "#55acee" : ""}
                    >
                        {n.userName}
                    </Tag>
                ))}
            </ProCard>
        );
    }

    const getFloorData = (data: any[], areaId: number, partitionId: number, bn: string, unit: number): any => {
        const floor: number[] = [];
        const result = data.filter((i: any) => {
            const index = floor.findIndex((j: any) => j === i.floor);
            if (i.areaId === areaId && i.partitionId === partitionId && i.bn === bn && i.unit === unit && i.floor !== 0 && index === -1) {
                floor.push(i.floor);
                return true;
            } else {
                return false
            }
        });
        // console.log(!!result)

        return [
            getUserData(configData, areaId, partitionId, bn, unit, 0)
            ,
            ...result.map((m: any) => {
                if (m.floor !== 0) {
                    return (
                        <ProCard
                            key={`${areaId}` + `${partitionId}` + `${bn}` + `${unit}` + `${m.floor}`}
                            ghost
                            split={"vertical"}
                        >
                            <ProCard
                                colSpan={"100px"}
                            >
                                {m.floor}层
                            </ProCard>
                            {getUserData(configData, areaId, partitionId, bn, unit, m.floor)}
                        </ProCard>
                    );
                } else {
                    return null;
                }
            })]

    }

    const getUnitData = (data: any[], areaId: number, partitionId: number, bn: string): any => {
        const units: number[] = [];
        const result = data.filter((i: any) => {
            const index = units.findIndex((j: any) => j === i.unit);
            if (i.areaId === areaId && i.partitionId === partitionId && i.bn === bn && i.unit !== 0 && index === -1) {
                units.push(i.unit);
                return true;
            } else {
                return false
            }
        });


        return [
            getUserData(configData, areaId, partitionId, bn, 0, 0),
            ...result.map((l: any) => {
                return (
                    <ProCard
                        key={`${areaId}` + `${partitionId}` + `${bn}` + `${l.unit}`}
                        ghost
                        split={"vertical"}
                    >
                        <ProCard
                            colSpan={"100px"}
                        >
                            {l.unit}单元
                        </ProCard>
                        <ProCard
                            ghost
                            split={"horizontal"}
                        >
                            {getFloorData(configData, areaId, partitionId, bn, l.unit)}
                        </ProCard>
                    </ProCard>
                );
            })];

    }

    const getBnData = (data: any[], areaId: number, partitionId: number): any => {

        const bns: string[] = [];
        const result = data.filter((i: any) => {
            const index = bns.findIndex((j: any) => j === i.bn);

            if( i.areaId === areaId && i.partitionId === partitionId && index === -1){
                bns.push(i.bn);
                return true
            }
            return false
        });
        return [
            ...result.map((j: any) => {
                return (
                    <ProCard
                        key={`${areaId}` + `${partitionId}` + `${j.bn}`}
                        ghost
                        split={"vertical"}
                    >
                        <ProCard
                            colSpan={"100px"}
                        >
                            {j.bn}号楼
                        </ProCard>
                        <ProCard
                            ghost
                            split={"horizontal"}
                        >
                            {
                                getUnitData(configData, areaId, partitionId, j.bn)
                            }
                        </ProCard>
                    </ProCard>);
            })]
    }

    const areaData = data?data.filter((i: any) => {
        if (!regionId) {
            return true;
        }
        return `${i.county}` === `${regionId}`;
    }):[];

    return (
        <PageContainer>
            <ProCard
                // split={"horizontal"}
                ghost
                wrap
                gutter={[0, 16]}
            >
                <ProCard>
                    <ProForm
                        submitter={false}
                        initialValues={{
                            city: cityTmpData
                        }}
                        onValuesChange={(changedValues) => {
                            const {city} = changedValues;
                            if (city && city.area) {
                                setRegionId(city.area)
                            }
                        }}
                    >
                        <Form.Item
                            name={"city"}
                            style={{maxWidth: 500}}
                            label={"省/市/区"}>
                            <CitySelect
                                // value={cityTmpData}
                                // onChange={(values) => {
                                //     setCityData(values)
                                // }}
                            />
                        </Form.Item>
                    </ProForm>
                </ProCard>
                <ProCard
                    split={"horizontal"}
                >
                    {areaData && areaData.map((item: any) => {

                        return (
                            <ProCard
                                key={item.id}
                                split={"vertical"}
                            >
                                <ProCard
                                    colSpan={"160px"}
                                >
                                    {item.name}
                                </ProCard>
                                <ProCard
                                    ghost
                                    split={"horizontal"}
                                >
                                    {
                                        item.partitionList && item.partitionList.map((i: any) => {
                                            return (
                                                <ProCard
                                                    key={`${item.id}` + `${i.id}`}
                                                    ghost
                                                    split={"vertical"}
                                                >
                                                    <ProCard

                                                        colSpan={"160px"}
                                                    >
                                                        {i.name}
                                                    </ProCard>
                                                    <ProCard
                                                        ghost
                                                        split={"vertical"}
                                                    >
                                                        <ProCard
                                                            colSpan={"100px"}
                                                        >
                                                            <LinkButton
                                                                onClick={() => {
                                                                    setPartitionId(i.id)
                                                                    setAreaId(item.id);
                                                                }}
                                                            >设置</LinkButton>
                                                        </ProCard>
                                                        <ProCard
                                                            ghost
                                                            split={"horizontal"}
                                                        >
                                                            {
                                                                getBnData(configData, item.id, i.id)
                                                            }
                                                        </ProCard>
                                                    </ProCard>
                                                </ProCard>
                                            );
                                        })
                                    }
                                </ProCard>
                            </ProCard>
                        );
                    })}
                </ProCard>
            </ProCard>

            <SetUser
                areaId={areaId}
                partitionId={partitionId}
                success={() => {
                    setPartitionId(0);
                    refresh();
                }}
                onCancel={() => {
                    setPartitionId(0);
                }}
            />

        </PageContainer>

    )
        ;
}

export default RepairUserManageSetting;