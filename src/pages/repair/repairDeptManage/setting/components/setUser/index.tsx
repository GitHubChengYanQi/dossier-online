import {ProForm, ProFormInstance} from "@ant-design/pro-components";
import {Form, FormInstance, Modal, Select} from "antd";
import {useRef, useState} from "react";
import {useRequest} from "@@/exports";
import {request} from "@/utils/Request";
import SelectUser from "@/components/sysCompoents/selectUser";
import useAlert from "@/components/useAlert";

type SetUserProps = {
    areaId?: number;

    partitionId?: number;

    onCancel?: () => void;

    success?: () => void;
}

const SetUser: React.FC<SetUserProps> = (props) => {

    const {areaId, partitionId, onCancel,success} = props;

    const [bnId, setBnId] = useState<number[]>([]);
    const [unitId, setUnitId] = useState<number[]>([]);
    const [floorId, setFloorId] = useState<number[]>([]);

    const {data: bnData} = useRequest(async () => {
        if (!areaId || !partitionId) {
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
            bnId?.length !== 1) {
            return []
        }
        const response = await request("/build/getUnit", {
            method: "GET",
            params: {
                areaId,
                partitionId,
                bnId: bnId[0]
            }
        });

        return response.data
    }, {
        refreshDeps: [areaId, partitionId, bnId],
    });
    const {data: floorData} = useRequest(async () => {
        if (!areaId ||
            !partitionId ||
            bnId?.length !== 1 ||
            unitId?.length !== 1) {
            return []
        }
        const response = await request("/build/getFloor", {
            method: "GET",
            params: {
                areaId,
                partitionId,
                bnId: bnId[0],
                unitId: unitId[0]
            }
        });

        return response.data
    }, {
        refreshDeps: [areaId, partitionId, bnId, unitId],
    });

    const {error,notification} = useAlert();
    const formRef = useRef<ProFormInstance>();

    return (
        <Modal
            maskClosable={false}
            destroyOnClose
            open={(partitionId !== undefined && partitionId > 0)}
            onCancel={onCancel}
            onOk={() => {
                formRef.current?.submit();
            }}
        >
            <ProForm
                formRef={formRef}
                onFinish={async (values) => {
                    values.areaId = areaId;
                    values.partitionId = partitionId;
                    const response = await request("/repairHousekeeperManage/add",{
                        data:values
                    })
                    if(response.errCode!==0){
                        error(response.message);
                    }else{
                        notification.success({
                            message:"设置成功"
                        });
                        success?.();
                    }
                }}
                submitter={false}
            >
                <Form.Item
                    name={"bns"}
                    style={{minWidth: 100}}
                    label={"楼号"}
                    rules={[
                        {
                            required: true, message: "楼号为必选字段"
                        }
                    ]}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder={"请选择"}
                        value={bnId}
                        options={bnData}
                        onChange={(value) => {
                            setUnitId([]);
                            setFloorId([]);
                            setBnId(value)
                        }}
                    />
                </Form.Item>
                {bnId?.length === 1 &&
                    <Form.Item
                        name={"units"}
                        style={{minWidth: 100}}
                        label={"单元"}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder={"请选择"}
                            value={unitId}
                            options={unitData}
                            onChange={(value) => {
                                setFloorId([]);
                                setUnitId(value)

                            }}
                        />
                    </Form.Item>}
                {unitId?.length === 1 &&
                    <Form.Item
                        name={"floors"}
                        style={{minWidth: 100}}
                        label={"楼层"}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder={"请选择"}
                            value={floorId}
                            options={floorData}
                            onChange={(value) => {
                                setFloorId(value)
                            }}
                        />
                    </Form.Item>}
                <Form.Item
                    label={"主负责管家"}
                    name={"userIds"}
                    rules={[
                        {
                            required: true, message: "主负责管家为必选"
                        }
                    ]}
                >
                    <SelectUser/>
                </Form.Item>
                <Form.Item
                    label={"次负责管家"}
                    name={"secUserIds"}
                >
                    <SelectUser/>
                </Form.Item>
            </ProForm>
        </Modal>
    );
}

export default SetUser;