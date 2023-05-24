import {Form} from "antd";
import SelectUser from "@/components/sysCompoents/selectUser";
import SelectDept from "@/components/sysCompoents/selectDept";
import {BetaSchemaForm, ProFormDependency, ProFormGroup, ProFormList} from "@ant-design/pro-components";
import SelectPosition from "@/components/sysCompoents/selectPosition";
import React from "react";

const findEle = (ele: string | string[], find: string): boolean => {
    if (!ele) {
        return false;
    }
    if (Array.isArray(ele)) {
        return -1 !== ele.findIndex((i: string) => i === find)
    } else {
        return ele === find;
    }
}
const AuditNode = () => {
    return (
        <ProFormDependency name={["type"]}>
            {({type}) => {
                const items = [];
                if (findEle(type, "ASSIGNER")) {
                    items.push(
                        <Form.Item
                            key={"ASSIGNER"}
                            name={"userList"}
                            label={"选择人员"}
                            help={"选定的人员可以进行操作"}
                        ><SelectUser/>
                        </Form.Item>
                    );
                }
                if (findEle(type, "DEPTID")) {
                    items.push(
                        <Form.Item
                            key={"DEPTID"}
                            name={"deptIds"}
                            label={"选择部门"}
                            help={"选定的部门人员都可以进行操作"}
                        >
                            <SelectDept preData={[
                                {
                                    title: "发起的部门",
                                    key: "-1",
                                    value: "-1",
                                    index: 0,
                                    count: 0
                                }
                            ]}
                            />
                        </Form.Item>
                    );
                }
                if (findEle(type, "DEPTHEAD")) {
                    items.push(
                        <Form.Item
                            key={"DEPTHEAD"}
                            name={"headDeptIds"}
                            label={"部门负责人"}
                            help={"选定部门中的负责人可以进行操作"}
                        >
                            <SelectDept preData={[
                                {
                                    title: "发起的部门",
                                    key: "-1",
                                    value: "-1",
                                    index: 0,
                                    count: 0
                                }
                            ]}
                            />
                        </Form.Item>
                    );
                }
                if (findEle(type, "POSITION")) {
                    items.push(
                        <ProFormList
                            key={"POSITION"}
                            label={"指定职位"}
                            name={"positionIds"}>
                            <ProFormGroup>
                                <BetaSchemaForm layoutType={"Embed"} columns={[
                                    {
                                        title: "部门",
                                        dataIndex: "deptId",
                                        formItemProps: {
                                            help: "选定的部门后指定职位"
                                        },
                                        renderFormItem: () => {
                                            return <SelectDept
                                                multiple={false}
                                                preData={[
                                                    {
                                                        title: "发起的部门",
                                                        key: "-1",
                                                        value: "-1",
                                                        index: 0,
                                                        count: 0
                                                    }
                                                ]}
                                            />
                                        }
                                    }
                                ]}/>
                                <BetaSchemaForm layoutType={"Embed"} columns={[
                                    {
                                        title: "职位",
                                        dataIndex: "positionId",
                                        formItemProps: {
                                            help: "选定的职位可以进行操作"
                                        },
                                        renderFormItem: () => {
                                            return <SelectPosition/>
                                        }
                                    }
                                ]}/>
                            </ProFormGroup>

                        </ProFormList>
                    );
                }
                return items;
            }}
        </ProFormDependency>
    );
}
    export default AuditNode;
