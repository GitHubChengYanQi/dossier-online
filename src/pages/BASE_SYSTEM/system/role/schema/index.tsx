import {getTree} from "@/services/BASE_SYSTEM/role";
import {ColumnsType} from "@/types/common";
import {Transfer, Tree} from "antd";
import {request} from "@/utils/Request";
import {menuTreeList} from "@/pages/BASE_SYSTEM/system/menu/service";
import React, {useState} from "react";
import {TransferItem} from "antd/es/transfer";


type TreeFieldProps = {
    value?: string[];
    onChange?: (keys: any[]) => void;
    options?: MenuNode[];
}


interface MenuNode {
    title: string,
    key: string,
    children?: MenuNode[],
}

const TreeField: React.FC<TreeFieldProps> = (props) => {
    const {value, onChange, options} = props;

    const defaultValue = value&&Array.isArray(value) ? value.map((item: any) => {
        return `${item}`;
    }) : [];
    const [targetKeys, setTargetKeys] = useState<string[]>(defaultValue);

    const targetKeysFunc = (menus: MenuNode[] | undefined, keys: string[], delFlag: boolean = false): string[] => {
        let selectKeys: string[] = keys?[...keys]:[];
        if (!menus) return [];
        menus.forEach((item: MenuNode) => {
            if (delFlag) {
                selectKeys.push(item.key);
                if (item.children) {
                    selectKeys = targetKeysFunc(item.children, selectKeys, true);
                }
            } else {
                const index = selectKeys.findIndex((i: string) => {
                    return i === item.key;
                });
                if (index >= 0) {
                    selectKeys.push(item.key);

                }
                if (item.children) {
                    selectKeys = targetKeysFunc(item.children, selectKeys, index >= 0);
                }
            }
        })
        return selectKeys;
    }
    /**
     * 删除菜单中子菜单的keys
     * @param menus
     * @param keys
     * @param delFlag
     */
    const filterKeysFunc = (menus: MenuNode[] | undefined, keys: string[], delFlag: boolean = false): string[] => {
        let selectKeys: string[] = keys?[...keys]:[];
        if (!menus) return [];
        menus.forEach((item: MenuNode) => {

            const index = selectKeys.findIndex((i: string) => {
                return i === item.key;
            });
            if (index >= 0) {
                if (delFlag) {
                    selectKeys.splice(index, 1);
                }
                if (item.children) {
                    selectKeys = filterKeysFunc(item.children, selectKeys, true);
                }
            } else {
                if (item.children) {
                    selectKeys = filterKeysFunc(item.children, selectKeys, false);
                }
            }
        })
        return selectKeys;
    }
    /**
     * 穿梭框的事件
     * @param keys
     */
    const onTChange = (keys: string[]) => {
        const filterKeys = filterKeysFunc(options, keys);
        setTargetKeys(filterKeys);
        onChange?.(filterKeys);
    };
    const isChecked = (selectedKeys: (string | number)[], eventKey: string | number) =>
        selectedKeys.includes(eventKey);

    /**
     * 禁用左侧Tree 子菜单
     * @param treeNodes
     * @param checkedKeys
     * @param isDisabled
     */
    const generateTree = (treeNodes: any[] = [], checkedKeys: string[] = [], isDisabled: boolean = false): any[] =>
        treeNodes.map(({children, ...props}) => {
            let disabled = isDisabled;
            if (!isDisabled) {
                disabled = checkedKeys.includes(props.key as string);
            }
            return {
                ...props,
                // disabled,
                children: generateTree(children, checkedKeys, disabled),
            }
        });

    const transferDataSource: TransferItem[] = [];

    /**
     * 把所有菜单的数据平铺到穿梭框
     * @param list
     */
    function flatten(list: MenuNode[] = []) {
        list.forEach((item: any) => {
            transferDataSource.push(item as TransferItem);
            if (item.children) {
                flatten(item.children);
            }
        });
    }

    flatten(options);

    return (
        <Transfer
            onChange={onTChange}
            targetKeys={targetKeys}
            dataSource={transferDataSource}
            render={(item: any) => item.title}
        >
            {(p) => {
                const {direction, onItemSelect,selectedKeys} = p;
                if (direction === 'left') {
                    console.log(selectedKeys)
                    console.log(targetKeys)
                    const checkedKeys = targetKeysFunc(options, [...selectedKeys, ...targetKeys]);
                    console.log(checkedKeys)
                    return options && <Tree
                        blockNode
                        // checkStrictly
                        checkedKeys={checkedKeys}
                        checkable
                        treeData={generateTree(options, targetKeys)}
                        onCheck={(_, {node: {key}}) => {
                            onItemSelect(key as string, !isChecked(checkedKeys, key));
                        }}
                        onSelect={(_, {node: {key}}) => {
                            onItemSelect(key as string, !isChecked(checkedKeys, key));
                        }}
                    />
                }
            }}
        </Transfer>);

}

const formatResult = (options: []): any[] => {
    return options.map((item: any) => {
        return {
            title: item.label,
            key: item.value,
            children: formatResult(item.children),
        }
    })
}
const useRoleField = () => {
    const Name: ColumnsType = {
        title: '名称',
        dataIndex: 'name',
        formItemProps: {
            rules: [
                {required: true, message: "名称必填"}
            ]
        }
    };
    const pName: ColumnsType = {
        title: '上级角色',
        width: 200,
        dataIndex: 'pName',
        formItemProps: {}
    };
    const description: ColumnsType = {
        title: '备注',
        dataIndex: 'description',
        valueType: "textarea"
    }

    const menuTree: ColumnsType = {
        dataIndex: "checked",

        request: async () => {
            const response = await request(menuTreeList.url);
            if (response.errCode === 0) {
                return formatResult(response.data);
            }
            return []
        },
        renderFormItem: (schema: any, config: any) => {
            return <TreeField options={config.options}/>
        },
    }


    const roleTreeByUser: ColumnsType = {
        formItemProps: {
            name: "checked"
        },
        fieldProps: {
            treeDefaultExpandAll: true
        },
        request: async (): Promise<any> => {
            return await getTree();
        },
        title: '角色',
        valueType: "treeSelect",
    }
    return {
        menuTree,
        Name,
        pName,
        description,
        roleTreeByUser
    }
}
export default useRoleField;