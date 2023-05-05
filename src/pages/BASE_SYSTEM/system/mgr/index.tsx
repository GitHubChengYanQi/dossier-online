import React, {useRef, useState} from 'react';
import {PageContainer, ProColumns, ProTable, ActionType} from "@ant-design/pro-components";
import {Button, Divider, Dropdown, Layout, Space, Spin, Tree, Typography} from "antd";
import EditButton from "@/components/EditButton";
import EditForm from "./components/editForm";
import useUserField from "./schema";
import RoleSet from "../role/components/roleSet";
import useAlert from "@/components/useAlert";
import {getUserList, resetPassWord} from "@/services/BASE_SYSTEM/user";
import {RestUserResult} from "@/pages/BASE_SYSTEM/system/mgr/types";
import {useModel, useRequest} from "umi";
import {MoreOutlined} from "@ant-design/icons";
import {FormInstance} from "antd/lib";

const {DirectoryTree} = Tree;

import {styled} from "umi";
import {ItemType} from "antd/es/menu/hooks/useItems";

const StyleDiv = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;

  .ant-tree-treenode-selected {
    a {
      color: #FFFFFF;
    }
  }

  .ant-tree-treenode {
    padding: 4px 4px 8px 4px;

    .ant-tree-indent-unit {
      width: 10px;
    }

    .ant-tree-node-content-wrapper {
      display: flex;

      .ant-tree-title {
        flex: 1;
        display: flex;

        .title-line {
          width: 100%;
          display: flex;

          .title {
            flex: auto;
          }
        }
      }
    }
  }
`;

type nodeDataProps = {
    title: string;
    key: string;
    value: string;
    index: number;
    count: number;
}
export default function UserList() {

    const {modal} = useAlert();
    const [createModalVisible, handleModalVisible] = useState(false);
    const [roleSet, handleRoleSet] = useState(false);
    const [treeLoading, setTreeLoading] = useState<boolean>(false);
    const [editId, setEditId] = useState<number>(0);
    const [tableTitle, setTableTitle] = useState<string>("全部");

    const {Account, Birthday, CreateTime, DeptName, Name, PositionName, roleName, SexName, Status} = useUserField();

    const {data: deptData} = useModel("dept");

    const columns: ProColumns[] = [
        {
            ...Account,
            width: 120
        },
        {
            ...Name,
            width: 120
        },
        {
            ...roleName,
            width: 120
        },
        {
            ...SexName,
            width: 60
        },
        {
            ...Birthday,
            width: 120
        },
        {
            ...DeptName,
            width: 120
        },
        {
            ...PositionName,
            width: 120
        },
        {
            ...CreateTime,
            width: 160
        },
        {
            ...Status,
            width: 80
        },
        // {
        //     hideInSearch: true
        // },
        {
            title: '操作',
            hideInForm: true,
            hideInSearch: true,
            width: 140,
            render: (value: any, record: any) => {
                return (
                    <Space size={0} split={<Divider type="vertical"/>}>
                        <a type='ghost' className="button-left-margin" onClick={() => {
                            setEditId(record.userId);
                            handleRoleSet(true);
                        }}>分配角色</a>
                        <a type='ghost' className="button-left-margin" onClick={() => {
                            modal.confirm({
                                title: '提示',
                                content: '系统初始化为111111，实际请参考系统设置。',
                                centered: true,
                                onOk: async () => {
                                    await resetPassWord(record.userId);
                                },
                                onCancel: () => {
                                }
                            });
                        }}>重置密码</a>
                        <EditButton onClick={() => {
                            // dfRef.current.open(record.userId);
                            setEditId(record.userId);
                            handleModalVisible(true)
                        }}/>
                    </Space>
                );
            }
        }
    ];

    const {run} = useRequest(async (params, sorter, filter) => {
        const {data, success} = await getUserList<RestUserResult>(params, sorter, filter);

        return {
            data: data || [],
            success
        };
    }, {
        manual: true
    })

    const actionRef = useRef<ActionType>();
    const formRef = useRef<FormInstance>();


    return (
        <PageContainer>
            <Layout>
                <Layout.Sider theme={"light"} width={260} style={{marginRight: 16}}>
                    <Spin spinning={treeLoading}>
                        <StyleDiv>
                            {deptData && <DirectoryTree
                                // draggable
                                expandAction={false}
                                blockNode
                                defaultExpandAll
                                treeData={deptData}
                                checkStrictly
                                onSelect={(selectedKeys, info) => {
                                    // console.log(info)
                                    // cancel();
                                    setTableTitle(info.node.title)
                                    formRef.current?.setFieldValue("deptId", selectedKeys[0]);
                                    formRef.current?.submit();
                                }}
                                titleRender={(nodeData: nodeDataProps) => {
                                    const item:ItemType[] = [];
                                    if (nodeData.count > 1) {
                                        item.push({
                                            type: 'divider',
                                        });
                                        if (nodeData.index!==0) {
                                            item.push({
                                                label: (<Typography.Link onClick={(e) => {
                                                    e.stopPropagation()
                                                }}>上移</Typography.Link>),
                                                key: '3',
                                            })
                                        }
                                        if (nodeData.count - nodeData.index > 1) {
                                            item.push({
                                                label: (<Typography.Link onClick={(e) => {
                                                    e.stopPropagation()
                                                }}>下移</Typography.Link>),
                                                key: '4',
                                            })
                                        }
                                    }


                                    return (<div className={"title-line"}>
                                        <span className={"title"}>{nodeData.title}</span>
                                        <Dropdown
                                            placement={"bottom"}
                                            trigger={['click']}
                                            menu={{
                                                items: [
                                                    {
                                                        label: (<Typography.Link onClick={(e) => {
                                                            e.stopPropagation()
                                                        }}>添加子部门</Typography.Link>),
                                                        key: '0',
                                                    },
                                                    {
                                                        label: (<Typography.Link onClick={(e) => {
                                                            e.stopPropagation()
                                                        }}>修改名称</Typography.Link>),
                                                        key: 'edit',
                                                    },
                                                    {
                                                        label: (<Typography.Link onClick={(e) => {
                                                            e.stopPropagation()
                                                        }}>设置负责人</Typography.Link>),
                                                        key: '1',
                                                    },
                                                    ...item,
                                                    {
                                                        type: "divider",
                                                    },
                                                    {
                                                        label: (<Typography.Link onClick={(e) => {
                                                            e.stopPropagation()
                                                        }}><Typography.Text
                                                            type="danger">删除</Typography.Text></Typography.Link>),
                                                        key: '5',
                                                    }
                                                ]
                                            }}>
                                            <a onClick={(e) => e.stopPropagation()}>
                                                <MoreOutlined/>
                                            </a>
                                        </Dropdown>
                                    </div>);
                                }}
                            />}
                        </StyleDiv>
                    </Spin>
                </Layout.Sider>
                <Layout.Content>
                    <ProTable<RestUserResult>
                        onLoadingChange={(v) => {
                            setTreeLoading(v as boolean)
                        }}
                        headerTitle={tableTitle}
                        scroll={{x: "max-content"}}
                        form={{
                            syncToUrl: true
                        }}
                        actionRef={actionRef}
                        formRef={formRef}
                        search={{
                            filterType: "query"
                        }}
                        rowKey="userId"
                        columns={columns}

                        request={async (params, sorter, filter) => {
                            return await run(params, sorter, filter);

                        }}
                        toolBarRender={() => [
                            <>
                                <Button
                                    key="1"
                                    type="primary"
                                    onClick={() => {
                                        handleModalVisible(true);
                                        setEditId(0);
                                    }}
                                >
                                    添加成员
                                </Button></>,
                        ]}
                    />
                    <EditForm
                        userId={editId}
                        onCancel={(v) => {
                            if (v) actionRef?.current?.reload();
                            handleModalVisible(false);
                            setEditId(0);
                        }}
                        modalVisible={createModalVisible}

                    />
                    <RoleSet
                        userId={editId}
                        modalVisible={roleSet}
                        onCancel={flag => {
                            handleRoleSet(false);
                            if (flag) actionRef?.current?.reload();
                        }}
                    /></Layout.Content>
            </Layout>
        </PageContainer>
    );
}
