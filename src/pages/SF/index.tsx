import React, {useRef, useState} from 'react';
import {
    PageContainer,
    ProForm,
    ProFormText,
    ProFormRadio,
    ProFormDatePicker,
    ProFormSelect,
    ProTable, ProFormTreeSelect, GridContent, ProFormInstance, ProFormMoney, ProFormDigit, ProFormDependency,
} from '@ant-design/pro-components';
import AddressSelect from '@/components/AddressSelect';
import {Card, Tabs, Row, Col, Form, Space, Affix, Radio, Result, Button} from 'antd';
import zjlxList from '@/utils/zjType';
import mzList from '@/utils/nation';
import whcdList from '@/utils/whcd';
import {request} from "@/utils/Request";
import {useRequest} from "umi";
import FooterBar from "@/components/FooterBar";
import dayjs from "dayjs";
import useAlert from "@/components/useAlert";
import useTabList from "@/components/TabList/useTabList";

interface msgItem {
    a?: number,
    b?: number,
}

interface Msg {
    success: boolean,
    total: number,
    result?: msgItem[]
}

const tree2list = (data: any[]): any[] => {
    if (!Array.isArray(data)) {
        return [];
    }
    const list = [];
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        list.push(item.key)

        if (item.children) {
            list.push(...tree2list(item.children));
        }
    }
    return list;
}
const Sf = () => {
        const formRef = useRef<ProFormInstance>();
        const columns = [
            {
                title: 'aaa',
                dataIndex: 'a',
                ellipsis: true,
            },
            {
                title: 'bbb',
                dataIndex: 'b',
                ellipsis: true,
            },
        ]
        const [loading, setLoading] = useState(false);
        const [result, setResult] = useState<boolean>(false);
        const {closeCurrent} = useTabList();
        const {
            data: deptData,
            run: deptRun,
            loading: deptLoading
        } = useRequest(async (params: { subjectId?: number } = {}) => {
            const {subjectId} = params;
            const response = await request("/hisSubject/list/dept", {
                method: "GET",
                params: {
                    subjectId
                }
            });
            return response.data;
        }, {});
        const {data: userData, loading: userLoading, run: userRun} = useRequest(async (data) => {
            const response = await request("/rest/mgr/list", {
                method: "POST",
                data: {
                    ...data,
                    deptIds: formRef.current?.getFieldValue("department") ? [formRef.current?.getFieldValue("department")] : tree2list(deptData)
                }
            });
            return response.data;
        }, {
            // manual: true
        })


        const {
            data: typeData,
            run: typeRun,
            loading: typeLoading
        } = useRequest(async (params: { subjectId?: number } = {}) => {
            const {subjectId} = params;
            const response = await request("/hisSubject/list/cost", {
                method: "GET",
                params: {
                    subjectId
                }
            });
            return response.data;
        }, {
            // manual:true
        });

        const {error, notification} = useAlert();

        if (result) {
            return (
                <Result
                    status="success"
                    title="操作成功!"
                    subTitle="用户资料已保存成功."
                    extra={[
                        <Button
                            type="primary"
                            key="buy"
                            onClick={() => {
                                setResult(false);
                            }}
                        >继续操作</Button>,
                        <Button

                            key="console"
                            onClick={() => {
                                closeCurrent();
                            }}
                        >
                            关闭编辑
                        </Button>,

                    ]}
                />
            );
        }

        return (
            <PageContainer>
                <GridContent contentWidth={"Fixed"}>
                    <Card bordered={false} style={{width: '100%'}}>
                        <Tabs defaultActiveKey='1'
                              items={[
                                  {
                                      key: "1",
                                      label: "挂号",
                                      children: <ProForm
                                          layout='horizontal'
                                          formRef={formRef}
                                          labelCol={{span: 9}}
                                          wrapperCol={{span: 17}}
                                          submitter={{
                                              render: (props, doms) => {
                                                  return (
                                                      <Affix offsetBottom={0}>
                                                          <FooterBar>
                                                              <Row>
                                                                  <Col span={14} offset={10}>
                                                                      <Space>{doms}</Space>
                                                                  </Col>
                                                              </Row>
                                                          </FooterBar></Affix>
                                                  );
                                              },
                                          }}
                                          onValuesChange={(values, allValues) => {
                                              const {subjectId, department, type, idNumber} = values;
                                              if (subjectId) {
                                                  formRef.current?.resetFields(["department", "type", "doctor", "money"]);
                                                  deptRun(values).then(() => {
                                                      userRun({});
                                                  });
                                                  typeRun(values);
                                              }
                                              if (department) {
                                                  formRef.current?.resetFields(["doctor"]);
                                                  userRun({});
                                              }
                                              if (type) {
                                                  formRef.current?.resetFields(["doctor"]);
                                                  const tmpData = typeData.find((item: any) => `${type}` === item.costConfigId);
                                                  formRef.current?.setFieldValue("money", tmpData.money);
                                                  const costList = tmpData.costList.filter((item: any) => {
                                                      const tmpSubjectId = formRef.current?.getFieldValue("subjectId")
                                                      console.log(tmpSubjectId)
                                                      if (tmpSubjectId) {
                                                          return item.subjectId === tmpSubjectId
                                                      }
                                                      return true;
                                                  });
                                                  if (costList) {
                                                      const positionIds = [];

                                                      for (let i = 0; i < costList.length; i++) {
                                                          if (Array.isArray(costList[i].positionIds)) {
                                                              positionIds.push(...costList[i].positionIds)
                                                          }
                                                      }
                                                      userRun({positionIds})
                                                  }

                                              }
                                              /**
                                               * 证件号码发生变更的时候
                                               */
                                              if (idNumber && allValues["idType"] === `${1}`) {
                                                  if (idNumber.length === 18) {
                                                      setLoading(true)
                                                      request("/hisPatient/list", {
                                                          data: {
                                                              idType: 1,
                                                              idNumber
                                                          }
                                                      }).then((response) => {
                                                          setLoading(false)
                                                          if (response.data.length > 0) {
                                                              const data = response.data[0];
                                                              formRef.current?.setFieldValue("gender", data.gender);
                                                              formRef.current?.setFieldValue("birthday", dayjs(data.birthday));
                                                              formRef.current?.setFieldValue('age', data.age);
                                                              formRef.current?.setFieldValue('name', data.name);
                                                              formRef.current?.setFieldValue('patientId', data.patientId);
                                                          } else {
                                                              formRef.current?.setFieldValue('patientId', "");
                                                              formRef.current?.setFieldValue('name', "");
                                                              /**
                                                               * 设置性别
                                                               */
                                                              if (idNumber.charAt(16) % 2 === 0) {
                                                                  formRef.current?.setFieldValue("gender", "F");
                                                              } else {
                                                                  formRef.current?.setFieldValue("gender", "M");
                                                              }
                                                              /**
                                                               * 设置生日
                                                               */
                                                              const year = idNumber.substring(6, 10);
                                                              const month = idNumber.substring(10, 12);
                                                              const day = idNumber.substring(12, 14);
                                                              formRef.current?.setFieldValue("birthday", dayjs(`${year}-${month}-${day}`));
                                                              /**
                                                               * 设置年龄
                                                               */
                                                              const age = dayjs().diff(`${year}-${month}-${day}`, "year");
                                                              formRef?.current?.setFieldValue('age', age);
                                                          }
                                                      })

                                                  } else {
                                                      formRef.current?.setFieldValue("gender", "");
                                                      formRef.current?.setFieldValue("birthday", dayjs());
                                                      formRef.current?.setFieldValue('age', "");
                                                      formRef.current?.setFieldValue('patientId', "");
                                                      formRef.current?.setFieldValue('name', "");
                                                  }

                                              }
                                          }}
                                          onFinish={async (values) => {
                                              const response = await request("/hisRegister/add", {
                                                  data: values
                                              });
                                              if (response.errCode !== 0) {
                                                  error(response.message);
                                              } else {
                                                  notification.success({message: '操作成功'});
                                                  setResult(true)
                                              }
                                          }}
                                          onFinishFailed={async (values) => {
                                              console.log(values, 'onFinishFailed');
                                          }}
                                          initialValues={{
                                              idType: "1",
                                              domicile: {
                                                  sf: "503",
                                                  city: '565', area: '573',
                                                  jd: ""
                                              },
                                              residence: {
                                                  sf: "503",
                                                  city: '565', area: '573',
                                                  jd: ""
                                              }
                                          }}
                                      >
                                          <Card title='号源' style={{width: '100%'}}>

                                              <ProFormRadio.Group
                                                  name='subjectId'
                                                  label='诊别/科目'
                                                  request={async () => {
                                                      const response = await request("/hisSubject/listSelect")
                                                      return response.data;
                                                  }}
                                              />

                                              <ProFormTreeSelect

                                                  width='md'
                                                  name='department'
                                                  label='科室'
                                                  placeholder='请输入科室'
                                                  fieldProps={{
                                                      treeDefaultExpandAll: true,
                                                      treeData: deptData,
                                                      loading: deptLoading
                                                  }}

                                              />

                                              <ProFormSelect
                                                  width='md'
                                                  name='type'
                                                  label='号别'
                                                  placeholder='请选择号别'
                                                  options={typeData ? typeData.map((item: any) => {
                                                      return {
                                                          value: item.costConfigId,
                                                          label: item.costName
                                                      }
                                                  }) : []}
                                                  rules={[{required: true, message: '请选择号别'}]}
                                                  fieldProps={{
                                                      loading: typeLoading
                                                  }}
                                              />

                                              <ProFormSelect

                                                  options={userData ? userData.map((item: any) => {
                                                      return {
                                                          label: item.name,
                                                          key: item.userId,
                                                          value: item.userId
                                                      }
                                                  }) : []}
                                                  showSearch
                                                  fieldProps={{
                                                      loading: userLoading,
                                                      onSearch: (params) => {
                                                          userRun({data: {name: params}})
                                                      }
                                                  }}
                                                  width='md'
                                                  name='doctor'
                                                  label='医生'
                                                  placeholder='请输入医生'
                                                  rules={[{required: true, message: '请输入医生'}]}
                                              />

                                              <ProFormMoney
                                                  width='md'
                                                  name='money'
                                                  label='金额'
                                                  placeholder='请输入金额'
                                                  rules={[{required: true, message: '请输入金额'}]}
                                              />

                                          </Card>
                                          <Card title='病人信息' style={{width: '100%', margin: '10px 0 20px 0'}}
                                                loading={loading}>
                                              <div style={{
                                                  display: "none"
                                              }}>
                                                  <ProFormText

                                                      name={"patientId"}
                                                  />
                                              </div>
                                              <Row gutter={8}>
                                                  <Col span={5}>
                                                      <ProFormSelect
                                                          name='idType'
                                                          label='证件类型'
                                                          placeholder='请选择证件类型'
                                                          rules={[{required: true, message: '请选择证件类型'}]}
                                                          options={zjlxList}
                                                      />
                                                  </Col>
                                                  <Col span={8}>
                                                      <ProFormText
                                                          labelCol={{span: 6}}
                                                          wrapperCol={{span: 18}}
                                                          rules={[
                                                              {required: true, message: '请输入证件号码'},
                                                              {len: 18, message: '证件号码为18位'},
                                                          ]}
                                                          label='证件号码'
                                                          name='idNumber'
                                                          width={"xl"}/>
                                                  </Col>
                                              </Row>
                                              <Row gutter={8}>
                                                  <Col span={5}>
                                                      <ProFormText
                                                          width='md'
                                                          name='name'
                                                          label='姓名'
                                                          placeholder='请输入姓名'
                                                          rules={[{required: true, message: '请输入姓名'}]}/>
                                                  </Col>
                                                  <Col span={6}>
                                                      <ProFormText
                                                          width='md'
                                                          name='mobile'
                                                          label='手机号'
                                                          placeholder='请输入手机号'
                                                      />
                                                  </Col>
                                                  <Col span={5}>
                                                      <ProFormRadio.Group
                                                          name='gender'
                                                          label='性别'
                                                          rules={[{required: true, message: '请选择性别'}]}
                                                          options={[
                                                              {
                                                                  label: '男',
                                                                  value: 'M',
                                                              },
                                                              {
                                                                  label: '女',
                                                                  value: 'F',
                                                              },
                                                          ]}
                                                      />
                                                  </Col>
                                              </Row>
                                              <Row gutter={8}>
                                                  <Col span={5}>
                                                      <ProFormDatePicker
                                                          width={"xl"}
                                                          name='birthday'
                                                          label='出生日期' placeholder='请选择出生日期'
                                                          rules={[{required: true, message: '请选择出生日期'}]}
                                                          // onChange={DatePickerChange}
                                                      />
                                                  </Col>
                                                  <Col span={6}>
                                                      <ProFormDigit
                                                          width='md'
                                                          name='age'
                                                          label='年龄'
                                                          placeholder='请输入年龄'
                                                          rules={[{required: true, message: '请输入年龄'}]}
                                                      />
                                                  </Col>


                                              </Row>
                                              <ProFormDependency
                                                  name={["patientId"]}>
                                                  {({patientId}) => {
                                                      if (patientId) {
                                                          return null;
                                                      }
                                                      return (<>
                                                          <Row gutter={8}>

                                                              <Col span={5}>
                                                                  <ProFormSelect
                                                                      name='nation'
                                                                      label='民族'
                                                                      placeholder='请选择民族'
                                                                      options={mzList}
                                                                  />
                                                              </Col>
                                                              <Col span={5}>
                                                                  <ProFormSelect
                                                                      name='education'
                                                                      label='文化程度'
                                                                      placeholder='请选择文化程度'
                                                                      options={whcdList}
                                                                  />
                                                              </Col>
                                                          </Row>
                                                          <Row gutter={8}>
                                                              <Col span={5}>
                                                                  <ProFormSelect
                                                                      name='hyzk'
                                                                      label='婚姻状况'
                                                                      placeholder='请选择婚姻状况'
                                                                      options={[
                                                                          {value: '已婚', label: '已婚'},
                                                                          {value: '未婚', label: '未婚'},
                                                                      ]}
                                                                  />
                                                              </Col>
                                                              <Col span={6}>
                                                                  <Form.Item
                                                                      label='是否本地'
                                                                      name='sfbd'
                                                                  >
                                                                      <Radio.Group>
                                                                          <Radio value='本地'>本地</Radio>
                                                                          <Radio value='非本地'>非本地</Radio>
                                                                      </Radio.Group>
                                                                  </Form.Item>
                                                              </Col>
                                                              <Col span={6}>
                                                                  <Form.Item
                                                                      label='户籍性质 '
                                                                      name='hjxz'
                                                                  >
                                                                      <Radio.Group>
                                                                          <Radio value='农业'>农业</Radio>
                                                                          <Radio value='非农业'>非农业</Radio>
                                                                      </Radio.Group>
                                                                  </Form.Item>
                                                              </Col>
                                                          </Row>
                                                          <Form.Item
                                                              labelCol={{span: 2}}
                                                              wrapperCol={{span: 20}}
                                                              label='户籍地'
                                                              name='domicile'
                                                          >
                                                              <AddressSelect/>
                                                          </Form.Item>

                                                          <Form.Item
                                                              label='现住址'
                                                              name='residence'
                                                              labelCol={{span: 2}}
                                                              wrapperCol={{span: 20}}
                                                          >
                                                              <AddressSelect/>
                                                          </Form.Item>
                                                      </>);
                                                  }}
                                              </ProFormDependency>

                                          </Card>
                                      </ProForm>,

                                  },
                                  {
                                      key: "2",
                                      label: "缴费",
                                      children:
                                          <ProTable
                                              columns={columns}
                                              // params 是需要自带的参数
                                              // 这个参数优先级更高，会覆盖查询表单的参数
                                              request={async (
                                                  // 第一个参数 params 查询表单和 params 参数的结合
                                                  // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
                                                  params: {
                                                      pageSize: number;
                                                      current: number;
                                                  },
                                              ) => {
                                                  console.log(params)
                                                  // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
                                                  // 如果需要转化参数可以在这里进行修改
                                                  const msg = await new Promise<Msg>((resolve) => {
                                                      resolve({
                                                          success: true,
                                                          total: 12,
                                                          result: [
                                                              {a: 123, b: 234},
                                                              {a: 123, b: 234},
                                                              {a: 123, b: 234},
                                                              {a: 123, b: 234},
                                                              {a: 123, b: 234},
                                                              {a: 123, b: 234},
                                                              {a: 123, b: 234},
                                                              {a: 123, b: 234},
                                                              {a: 123, b: 234},
                                                              {a: 123, b: 234},
                                                              {a: 123, b: 234},
                                                              {a: 123, b: 234},
                                                          ],
                                                      });
                                                  });
                                                  return {
                                                      data: msg.result,
                                                      // success 请返回 true，
                                                      // 不然 table 会停止解析数据，即使有数据
                                                      success: msg.success,
                                                      // 不传会使用 data 的长度，如果是分页一定要传
                                                      total: msg.total,
                                                  };
                                              }
                                              }
                                          />
                                  }
                              ]}
                        >
                        </Tabs>
                    </Card>
                </GridContent>
            </PageContainer>
        )
            ;
    }
;

export default Sf;
