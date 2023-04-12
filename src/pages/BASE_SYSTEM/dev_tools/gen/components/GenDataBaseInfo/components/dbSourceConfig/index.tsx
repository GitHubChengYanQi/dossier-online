import React, {useState, useRef} from 'react';
import {Button, Modal, Select, Tabs, Tooltip} from 'antd';
import {
    BetaSchemaForm,
    ProForm,
    ProFormGroup, ProFormInstance,
    ProFormList,
    ProFormText
} from "@ant-design/pro-components";
import {getApiDocs} from "@/pages/BASE_SYSTEM/dev_tools/gen/components/GenDataBaseInfo/service";
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";
// import Options from './options';

type params = { options?: any[], apiUrl?: string }
const DbSourceConfig = (
    {value, type, onChange}: {
        value?: params,
        type?: string,
        onChange?: (config: params) => void
    }
) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const actionRef = useRef<ProFormInstance>();

    const renderButton = () => {
        switch (type) {
            case 'select':
            case 'treeSelect':
            case 'cascader':
            case 'checkbox':
            case 'radio':
                return (
                    <>
                        <Button onClick={() => {
                            setIsModalVisible(true);
                        }}>{!!value?.apiUrl || !!value?.options ? `已配置` : '配置'}</Button>
                    </>
                );
            default:
                return (<span>无需配置</span>);
        }
    };

    const getApi = (name: string, paths: any) => {
        const result: any = [];
        Object.keys(paths).forEach((pathKey: any) => {
            Object.keys(paths[pathKey]).forEach((method: any) => {
                if (paths[pathKey][method].tags.findIndex((t: string) => t === name) !== -1) {
                    result.push({
                        label: `【${method}】${paths[pathKey][method].summary}${pathKey}`,
                        value: pathKey,
                        key: `${method}-${pathKey}`
                    })
                }
            });
        });
        return result;
    }

    return (
        <>
            <div style={{width:80,textAlign:"center"}}>{renderButton()}</div>
            <Modal
                destroyOnClose={true}
                title="配置数据"
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                }}
                onOk={() => {
                    actionRef.current?.submit();
                }}
                width={740}
                centered

            ><ProForm
                formRef={actionRef}
                submitter={false}
                initialValues={value}
                onFinish={async (values) => {
                    onChange?.(values);
                    setIsModalVisible(false);
                    return true;
                }}
            >
                <Tabs
                    defaultActiveKey={value?.apiUrl?"swagger":(type === "cascader" ? "swagger" : "enum")}
                    items={[
                        {
                            label: "自定义",
                            key: "enum",

                            disabled: type === "cascader",
                            children: <ProFormList
                                name={"options"}

                                actionRender={(field, action, defaultActionDom, count) => {

                                    return [
                                        <Tooltip placement="top" title={"向上移动"} key={1}>
                                            <div onClick={() => {
                                                action.move(field.name, field.name - 1);
                                            }} style={{marginLeft: 8, cursor: "pointer"}}><ArrowUpOutlined/></div>
                                        </Tooltip>,
                                        <Tooltip placement="top" title={"向下移动"} key={2}>
                                            <div onClick={() => {
                                                action.move(field.name, field.name + 1);
                                            }} style={{marginLeft: 8, cursor: "pointer"}}><ArrowDownOutlined/></div>
                                        </Tooltip>,
                                        defaultActionDom
                                    ];
                                }}>
                                <ProFormGroup>
                                    <ProFormText rules={[
                                        {
                                            required: true,
                                        },
                                    ]} name={"label"} label={"显示名称"}/>
                                    <ProFormText rules={[
                                        {
                                            required: true,
                                        },
                                    ]} name={"value"} label={"选中值"}/>
                                </ProFormGroup>
                            </ProFormList>
                        },
                        {
                            label: "选择接口数据",
                            key: "swagger",
                            children: <BetaSchemaForm
                                columns={[
                                    {
                                        dataIndex: "apiUrl",
                                        renderFormItem: (schema, config: any) => {
                                            return <Select
                                                showSearch={true}
                                                allowClear
                                                options={config.options}
                                            />
                                        },
                                        request: async () => {
                                            const data = await getApiDocs();
                                            const {tags, paths} = data
                                            return tags.map((tag: any, index: number) => {
                                                return {
                                                    label: tag.name,
                                                    value: index,
                                                    options: getApi(tag.name, paths),
                                                    // key:index
                                                }
                                            })
                                        }
                                    }
                                ]}
                                layoutType={"Embed"}

                            />
                        }
                    ]}></Tabs>
            </ProForm>
            </Modal>
        </>
    );
};

export default DbSourceConfig;
