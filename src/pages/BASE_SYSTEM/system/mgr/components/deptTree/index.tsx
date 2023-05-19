import {DeptTreeType} from "@/models/dept";
import {ItemType} from "antd/es/menu/hooks/useItems";
import {Dropdown, Tree, Typography} from "antd";
import DeptDel from "@/pages/BASE_SYSTEM/system/dept/deptDel";
import {MoreOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {styled, useModel} from "@@/exports";
import DeptEdit from "@/pages/BASE_SYSTEM/system/dept/deptEdit";

const {DirectoryTree} = Tree;

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

type DeptTreeProps = {

    editable?:boolean;

    onSelect?:(selectedKeys: any[], info: any)=>void;
}
const DeptTree:React.FC<DeptTreeProps> = (props) => {

    const {onSelect,editable = false} = props;

    const {data: deptData} = useModel("dept");

    const [drop, setDrop] = useState<string>("");
    const [deptOpen, setDeptOpen] = useState<boolean>(false);
    const [deptId, setDeptId] = useState<string>("");
    const [pid, setPid] = useState<string>("");

    if (!deptData) {
        return null;
    }

    return (
        <>
            <StyleDiv>
                {deptData && <DirectoryTree
                    // draggable
                    defaultSelectedKeys={["0"]}
                    expandAction={false}
                    blockNode
                    defaultExpandAll
                    treeData={[
                        {
                            title: "全部",
                            key: "0",
                            index: 0,
                            count: 0
                        },
                        ...deptData
                    ]}
                    checkStrictly
                    onSelect={(selectedKeys, info) => {
                        onSelect?.(selectedKeys, info);
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
                            {editable && nodeData.key !== "0" && <Dropdown
                                destroyPopupOnHide={true}
                                placement={"bottom"}
                                trigger={['click']}
                                open={`${drop}` === nodeData.key}
                                onOpenChange={(v) => {
                                    if (v) {
                                        setDrop(nodeData.key);
                                    } else {
                                        setDrop("")
                                    }
                                }}
                                menu={{
                                    onClick: ({domEvent}) => {
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
                                            label: (<DeptDel deptId={nodeData.key}/>),
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
                onSuccess={() => {
                    setDeptId("")
                    setPid("")
                    setDeptOpen(false);
                }}
                type={"Modal"}
            />
        </>
    );
}
export default DeptTree;