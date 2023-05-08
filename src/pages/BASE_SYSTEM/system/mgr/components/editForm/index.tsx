import {Button, Col, Result, Row, Space, Typography} from 'antd';
import React, {useRef, useState} from 'react';
import {styled, useModel, useParams} from "umi"
import {
    BetaSchemaForm,
    GridContent,
    PageContainer,
    ProCard,
    ProFormInstance
} from "@ant-design/pro-components";
import {getUserInfo, save} from "@/services/BASE_SYSTEM/user";
import {ModalFormProps} from "@ant-design/pro-form/es/layouts/ModalForm";
import useAlert from "@/components/useAlert";
import {ColumnsType} from "@/types/common";
import useUserField from "@/pages/BASE_SYSTEM/system/mgr/schema";
import FormWrap from "@/components/FormWrap";
import {DeptTreeType} from "@/models/dept";
import classNames from 'classnames';
import useTabList from "@/components/TabList/useTabList";

type deptConfigProps = {
    deptId: number | string;
    isHead: boolean;

    isMain: boolean;
}
const Div = styled.div`
  width: 160px;
`;

const getDeptByKey = (data: DeptTreeType[], key: number | string): DeptTreeType | null => {
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item.key === key) {
            return item;
        }
        if (item.children) {
            return getDeptByKey(item.children, key)
        }
    }
    return null;
}
const DeptRenderItem = (props: {
    value?: number | string,
    onChange?: () => void
}) => {
    const {value} = props;

    const {data} = useModel("dept");
    const dept = getDeptByKey(data, value || "");
    return (
        <Div>{dept?.title}</Div>
    )
}
const HeadDiv = styled.div`
  width: 80px;

  .active {
    color: #dedede;
  }
`
const Head = (props: {
    value?: boolean;
    onChange?: (v: boolean) => void
}) => {
    const {value, onChange} = props;
    const btn = classNames(
        {
            active: !value
        }
    );
    return (
        <HeadDiv>
            <Typography.Link className={btn} onClick={() => {
                onChange?.(!value);
            }}>部门负责人</Typography.Link>
        </HeadDiv>
    );
}
const MainDiv = styled.div`
  width: 80px;

  .active {
    color: #dedede;
  }
`
const Main = (props: {
    value?: boolean;
    onChange?: (v: boolean) => void
}) => {
    const {value, onChange} = props;
    const btn = classNames(
        {
            active: !value
        }
    );
    return (
        <MainDiv>
            <Typography.Link className={btn} onClick={() => {
                onChange?.(!value);
            }}>主部门</Typography.Link>
        </MainDiv>
    );
}

export interface userEditProps {
    modalVisible: boolean,
    onCancel: (flag?: boolean) => void,
    userId?: number
}

const EditForm: React.FC<userEditProps & ModalFormProps> = (props) => {

    const {onCancel, userId,} = props;

    const {error} = useAlert();
    const {Account, Birthday, DeptId, Email, Name, PassWord, PositionName, RePassWord, SexName} = useUserField();

    const [result,setResult]= useState<boolean>(false);

    const {userId: pUserId} = useParams();

    const eUserId = userId || pUserId || 0;

    const formRef = useRef<ProFormInstance>();

    const {closeCurrent} = useTabList();

    const columns: Array<ColumnsType> = [
        {
            order: 15,
            valueType: 'dependency',
            name: [],
            columns: (): Array<ColumnsType> => {
                return eUserId === 0 || eUserId === "0" ? [
                    Account,
                    PassWord,
                    RePassWord,
                ] : []
            }
        },
        {
            valueType: "divider"
        },
        Name,
        Email,
        SexName,
        Birthday,
        {
            valueType: "divider"
        },
        DeptId,
        {
            title: "部门设置",
            dataIndex: "deptIds",
            valueType: "formList",
            fieldProps: {
                deleteIconProps: false,
                copyIconProps: false,
                creatorButtonProps: false
            },
            formItemProps: {
                rules:[{
                    validator:(rule,value)=>{
                        return new Promise((resolve, reject)=>{
                            if(!value || !Array.isArray(value)){
                                reject("请设置一个主部门");
                            }
                            for (let i=0;i<value.length;i++){
                                if (value[i].isMain){
                                    resolve("ok");
                                    break;
                                }
                            }
                            reject("请设置一个主部门");
                        });
                    }
                }],
                wrapperCol: {span: 19}
            },
            columns: [
                {
                    valueType: 'group',
                    columns: [
                        {
                            dataIndex: "deptId",
                            renderFormItem: () => {
                                return <DeptRenderItem/>
                            }
                        },
                        {
                            dataIndex: "isHead",
                            renderFormItem: () => {
                                return <Head/>
                            }
                        },
                        {
                            dataIndex: "isMain",
                            renderFormItem: () => {
                                return <Main/>
                            }
                        },
                    ]
                }
            ],

        },
        PositionName
    ];
    if(result){
        return (
            <Result
                status="success"
                title="操作成功!"
                subTitle="用户资料已保存成功."
                extra={[
                    <Button
                        type="primary"
                        key="console"
                        onClick={()=>{
                            closeCurrent();
                        }}
                    >
                        关闭编辑
                    </Button>,
                    <Button
                        key="buy"
                        onClick={()=>{
                            setResult(false);
                        }}
                    >重新编辑</Button>,
                ]}
            />
        );
    }

    return (
        <PageContainer
            header={{
                title: "用户管理"
            }}
        >
            <GridContent
                contentWidth={"Fixed"}>
                <Row gutter={16}>
                    {/*<Col style={{width: 460}}>*/}
                    {/*    <ProCard colSpan="30%" bordered>*/}
                    {/*        300px*/}
                    {/*    </ProCard>*/}
                    {/*</Col>*/}
                    <Col flex={"auto"}>
                        <ProCard bordered headerBordered title={"基本资料"}>
                            <FormWrap
                                formRef={formRef}
                                onValuesChange={(changedFields, allFields) => {

                                    const {deptId,deptIds} = changedFields;
                                    if (deptId) {
                                        const list: deptConfigProps[] = [];
                                        if (allFields.deptIds && Array.isArray(allFields.deptIds)) {
                                            deptId.forEach((item: string) => {
                                                const tmpItem = allFields.deptIds.find((it: any) => {
                                                    return it.deptId === item;
                                                });
                                                if(tmpItem){
                                                    list.push(tmpItem);
                                                }else{
                                                    list.push({
                                                        deptId: item,
                                                        isHead: false,
                                                        isMain: false
                                                    });
                                                }
                                            })
                                        } else {
                                            deptId.forEach((item: string) => {
                                                list.push({
                                                    deptId: item,
                                                    isHead: false,
                                                    isMain: false
                                                });
                                            })

                                        }
                                        formRef.current?.setFieldValue("deptIds", list);
                                    }
                                    /**
                                     * 处理部门设置
                                     */
                                    if (deptIds && deptIds[deptIds.length - 1].isMain) {
                                        allFields.deptIds.forEach((item: any) => {
                                            item.isMain = false;
                                        });
                                        allFields.deptIds[deptIds.length - 1].isMain = deptIds[deptIds.length - 1].isMain;
                                        formRef.current?.setFieldValue("deptIds", allFields.deptIds);
                                    }
                                }}
                                isPage={false}
                                title={"用户管理"}
                                type={"Form"}
                                width={540}
                                modalProps={{
                                    centered: true,
                                    destroyOnClose: true
                                }}
                                request={async () => {
                                    return getUserInfo(eUserId);
                                }}
                                onFinish={async (values) => {
                                    console.log(values)
                                    const response = await save(eUserId, values);
                                    if(response.errCode!==0){
                                        error(response.message);
                                    }
                                    setResult(true);
                                    // notification.success({message: '操作成功'});
                                    onCancel?.(true)
                                }}
                                onOpenChange={(v) => {
                                    if (!v) {
                                        onCancel?.();
                                    }
                                }}
                                layout={"horizontal"}
                                wrapperCol={{span: 10}}
                                labelCol={{span: 5}}
                                submitter={{
                                    render: (props, doms) => {
                                        return (
                                            <Row>
                                                <Col span={14} offset={5}>
                                                    <Space>{doms}</Space>
                                                </Col>
                                            </Row>
                                        )
                                    },
                                }}
                            >
                                <BetaSchemaForm layoutType="Embed" columns={columns}/>
                            </FormWrap>
                        </ProCard>
                    </Col>
                </Row>
            </GridContent>
        </PageContainer>
    );
};

export default EditForm;