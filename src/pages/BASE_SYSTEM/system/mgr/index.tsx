import React, {useRef, useState} from 'react';
import {PageContainer, ProColumns, ProTable, ActionType} from "@ant-design/pro-components";
import {Button, Divider, Dropdown, Layout, Space, Spin, Tree, Typography} from "antd";
import EditButton from "@/components/EditButton";
import useUserField from "./schema";
import RoleSet from "../role/components/roleSet";
import useAlert from "@/components/useAlert";
import {getUserList, resetPassWord} from "@/services/BASE_SYSTEM/user";
import {RestUserResult} from "@/pages/BASE_SYSTEM/system/mgr/types";
import {useModel, useNavigate, useRequest} from "umi";
import {MoreOutlined} from "@ant-design/icons";
import {FormInstance} from "antd/lib";

const {DirectoryTree} = Tree;

import {styled} from "umi";
import {ItemType} from "antd/es/menu/hooks/useItems";
import DeptEdit from "@/pages/BASE_SYSTEM/system/dept/deptEdit";
import DeptDel from "@/pages/BASE_SYSTEM/system/dept/deptDel";
import {DeptTreeType} from "@/models/dept";

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


export default function UserList() {

    const {modal} = useAlert();
    // const [, handleModalVisible] = useState(false);
    const [roleSet, handleRoleSet] = useState(false);
    const [treeLoading, setTreeLoading] = useState<boolean>(false);

    const [drop, setDrop] = useState<string>("");
    const [deptOpen, setDeptOpen] = useState<boolean>(false);
    const [deptId, setDeptId] = useState<string>("");
    const [sDeptId, setSdeptId] = useState<string>("");
    const [pid, setPid] = useState<string>("");


    const [editId, setEditId] = useState<number>(0);
    const [tableTitle, setTableTitle] = useState<string>("全部");

    const {Account, Birthday, CreateTime, DeptName, Name, PositionName, roleName, SexName, Status} = useUserField();

    const {data: deptData} = useModel("dept");

    const navigate = useNavigate();

    const columns: ProColumns[] = [
        {
            ...Account,
        },
        {
            ...Name,
        },
        {
            ...roleName,
        },
        {
            ...SexName,
        },
        {
            ...Birthday,
        },
        {
            ...DeptName,
        },
        {
            ...PositionName,
        },
        {
            ...CreateTime,
        },
        {
            ...Status,
        },
        // {
        //     hideInSearch: true
        // },
        {
            title: '操作',
            hideInForm: true,
            hideInSearch: true,
            width: 200,
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
                            // setEditId(record.userId);
                            // handleModalVisible(true)
                            navigate(`/BASE_SYSTEM/system/mgr/${record.userId}`)
                        }}/>
                    </Space>
                );
            }
        }
    ];

    const {run} = useRequest(async (params, sorter, filter) => {
        return  await getUserList<RestUserResult>(params, sorter, filter);

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
                                defaultSelectedKeys={["0"]}
                                expandAction={false}
                                blockNode
                                defaultExpandAll
                                treeData={[
                                    {
                                        title:"全部",
                                        key:"0",
                                        index:0,
                                        count:0
                                    },
                                    ...deptData
                                ]}
                                checkStrictly
                                onSelect={(selectedKeys, info) => {
                                    setTableTitle(info.node.title)
                                    setSdeptId(`${selectedKeys[0]}`);
                                    // formRef.current?.setFieldValue("deptId", selectedKeys[0]);
                                    formRef.current?.submit();
                                }}
                                titleRender={(nodeData: DeptTreeType) => {
                                    const item: ItemType[] = [];
                                    if (nodeData.count > 1) {
                                        item.push({
                                            type: 'divider',
                                        });
                                        if (nodeData.index !== 0) {
                                            item.push({
                                                label: (<Typography.Link onClick={() => {
                                                }}>上移</Typography.Link>),
                                                key: '3',
                                            })
                                        }
                                        if (nodeData.count - nodeData.index > 1) {
                                            item.push({
                                                label: (<Typography.Link onClick={() => {
                                                }}>下移</Typography.Link>),
                                                key: '4',
                                            })
                                        }
                                    }


                                    return (<div className={"title-line"}>
                                        <span className={"title"}>{nodeData.title}</span>
                                        {nodeData.key!=="0"&&<Dropdown
                                            destroyPopupOnHide={true}
                                            placement={"bottom"}
                                            trigger={['click']}
                                            open={`${drop}`===nodeData.key}
                                            onOpenChange={(v)=>{
                                                if(v){
                                                    setDrop(nodeData.key);
                                                }else{
                                                    setDrop("")
                                                }
                                            }}
                                            menu={{
                                                onClick:({domEvent})=>{
                                                    domEvent.stopPropagation();
                                                    setDrop("")
                                                },
                                                items: [
                                                    {
                                                        label: (<Typography.Link onClick={() => {
                                                            setDeptId("")
                                                            setPid(nodeData.key)
                                                            setDeptOpen(true);
                                                        }}>添加子部门</Typography.Link>),
                                                        key: '0',
                                                    },
                                                    {
                                                        label: (<Typography.Link onClick={() => {
                                                            setDeptId(nodeData.key)
                                                            setDeptOpen(true);
                                                        }}>修改名称</Typography.Link>),
                                                        key: 'edit',
                                                    },
                                                    {
                                                        label: (<Typography.Link onClick={() => {
                                                        }}>设置负责人</Typography.Link>),
                                                        key: '1',
                                                    },
                                                    ...item,
                                                    {
                                                        type: "divider",
                                                    },
                                                    {
                                                        label: (<DeptDel deptId={nodeData.key} />),
                                                        key: '5',
                                                    }
                                                ]
                                            }}>
                                            <a onClick={(e) => e.stopPropagation()}>
                                                <MoreOutlined/>
                                            </a>
                                        </Dropdown>}
                                    </div>);
                                }}
                            />}
                        </StyleDiv>
                        <DeptEdit
                            pid={pid}
                            deptId={deptId}
                            open={deptOpen}
                            onClose={() => {
                                setDeptOpen(false);
                            }}
                            onSuccess={()=>{
                                setDeptId("")
                                setPid("")
                                setDeptOpen(false);
                            }}
                            type={"Modal"}
                        />
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
                            syncToUrl: true,
                        }}
                        actionRef={actionRef}
                        formRef={formRef}
                        search={{
                            filterType: "query"
                        }}
                        rowKey="userId"
                        columns={columns}
                        request={async (params, sorter, filter) => {
                            if(sDeptId){
                                params.deptId = sDeptId;
                            }
                            return await run(params, sorter, filter);

                        }}
                        toolBarRender={() => [
                            <>
                                <Button
                                    key="1"
                                    type="primary"
                                    onClick={() => {
                                        navigate(`/BASE_SYSTEM/system/mgr/0`)
                                        // handleModalVisible(true);
                                        // setEditId(0);
                                    }}
                                >
                                    添加成员
                                </Button></>,
                        ]}
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
