import LinkButton from "@/components/LinkButton";
import {Layout, Modal} from "antd";
import DeptTree from "@/pages/BASE_SYSTEM/system/mgr/components/deptTree";
import {RestUserResult} from "@/pages/BASE_SYSTEM/system/mgr/types";
import React, {useState} from "react";
import {ProCard, ProTable} from "@ant-design/pro-components";
import {getUserList} from "@/services/BASE_SYSTEM/user";
import {styled, useRequest} from "umi";
import {request} from "@/utils/Request";
import {CloseOutlined, UserOutlined} from "@ant-design/icons";

type SelectUserProps = {
    name?: string;

    value?: any;
    onChange?: (values: number[]) => void
}
// const {FormItem} = Form;

const Pople = styled.div`
  display: flex;
  padding: 4px 8px;
  border: #dedede 1px solid;
  width: 110px;
  margin-bottom: 8px;
  border-radius: 4px;
  margin-right: 8px;

  span:first-child {
    flex: auto;
    cursor: default;
    .anticon {
      color: #1e83e9;
    }
  }

  span:last-child {
    cursor: pointer;
  }

  &:hover {
    box-shadow: 0 1px 0 #15bc83;
  }
`;
const SelectUser: React.FC<SelectUserProps> = (props) => {

    const {value, onChange} = props;
    const [tableTitle, setTableTitle] = useState<string>("全部");
    const [sDeptId, setDeptId] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    const {data: userData} = useRequest(async () => {
        if (!value || value.length === 0) return [];
        const response = await request("/rest/mgr/getUserNameBtIds", {
            data: value
        });
        return response.data;
    }, {
        refreshDeps: [value]
    });

    const del = (index: number) => {
        const tmp = [...value];
        tmp.splice(index, 1);
        onChange?.(tmp);
    }

    return (
        <>
            <div style={{display: "flex"}}>
                {userData && userData.map((item: any, index: number) => {
                    return (
                        <Pople key={index}><span><UserOutlined/>{item.name}</span><CloseOutlined onClick={() => {
                            del(index);
                        }}/></Pople>
                    );
                })}
                <LinkButton
                    onClick={() => {
                        setOpen(true)
                    }}
                >选择</LinkButton>
            </div>

            {/*</Form.Item>*/}
            <Modal
                title={"选择人员"}
                centered
                width={960}
                open={open}
                onCancel={() => {
                    setOpen(false)
                }}
                onOk={() => {
                    setOpen(false)
                }}
            >
                <ProCard ghost split="vertical" gutter={[32, 0]}>
                    <ProCard colSpan={"70%"} ghost>
                        <Layout>
                            <Layout.Sider theme={"light"} width={180}>
                                <DeptTree onSelect={(selectedKeys, info) => {
                                    setTableTitle(info.node.title)
                                    setDeptId(`${selectedKeys[0]}`);
                                }}/>
                            </Layout.Sider>
                            <Layout.Content>
                                <ProTable<RestUserResult>
                                    search={false}
                                    headerTitle={tableTitle}
                                    rowKey="userId"
                                    columns={[
                                        {
                                            title: "姓名",
                                            dataIndex: "name"
                                        }, {
                                            title: "职务",
                                            dataIndex: "positionName"
                                        }, {
                                            title: "操作",
                                            render: (dom, entity) => {
                                                return (
                                                    <LinkButton
                                                        onClick={() => {
                                                            if (value) {
                                                                const tmp = [...value];
                                                                const index = tmp.findIndex((i: number) => i === entity.userId)
                                                                if (index === -1) {
                                                                    onChange?.([...value, entity.userId || 0]);
                                                                }
                                                            } else {
                                                                onChange?.([entity.userId || 0]);
                                                            }

                                                        }}
                                                    >选择</LinkButton>
                                                );
                                            }
                                        }
                                    ]}
                                    params={{
                                        sDeptId
                                    }}
                                    request={async (params, sorter, filter) => {
                                        if (sDeptId) {
                                            params.deptId = sDeptId;
                                        }
                                        return await getUserList<RestUserResult>(params, sorter, filter);
                                    }}
                                />
                            </Layout.Content>
                        </Layout>
                    </ProCard>
                    <ProCard bordered title={"已选择的成员"} headerBordered
                             style={{height: "100%"}}>{userData && userData.map((item: any, index: number) => {
                        return (
                            <Pople key={index}><span>{item.name}</span><CloseOutlined onClick={() => {
                                del(index);
                            }}/></Pople>
                        );
                    })}</ProCard>
                </ProCard>
            </Modal>
        </>
    );
}
export default SelectUser;