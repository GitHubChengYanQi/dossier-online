import React, {useRef} from 'react';
import {
    PageContainer,
    ProForm,
    ProFormText,
    ProFormRadio,
    ProFormDatePicker,
    ProFormSelect,
    ProTable, ProFormTreeSelect, ProFormDependency, GridContent,
} from '@ant-design/pro-components';
import AddressSelect from '@/components/AddressSelect';
import {Card, Tabs, Row, Col, Input, Form, Space, Affix} from 'antd';
import zjlxList from '@/utils/zjType';
import mzList from '@/utils/nation';
import whcdList from '@/utils/whcd';
import {ProFormInstance} from "@ant-design/pro-form/lib";
import {request} from "@/utils/Request";
import {useRequest} from "umi";
import FooterBar from "@/components/FooterBar";

const {TabPane} = Tabs;

interface msgItem {
    a?: number,
    b?: number,
}

interface Msg {
    success: boolean,
    total: number,
    result?: msgItem[]
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
    }, {
        // manual:true
    });

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

    function DatePickerChange(date: any, dateString: string) {
        const _Y: number = parseInt(dateString.split('-')[0], 0);
        const _date = new Date();
        const currentY: number = _date.getFullYear();
        formRef?.current?.setFieldValue('age', currentY - _Y);
    }

    return (
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
                                  onValuesChange={(values) => {
                                      const {subjectId} = values;
                                      if (subjectId) {
                                          console.log(values)
                                          formRef.current?.resetFields(["department", "type"]);
                                          deptRun(values);
                                          typeRun(values);
                                      }


                                  }}
                                  onFinish={async (values) => {
                                      console.log(values, 'values');
                                  }}
                                  onFinishFailed={async (values) => {
                                      console.log(values, 'onFinishFailed');
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
                                              treeData: deptData, loading: deptLoading
                                          }}

                                      />

                                      <ProFormSelect
                                          width='md'
                                          name='type'
                                          label='号别'
                                          placeholder='请选择号别'
                                          options={typeData && typeData.map((item: any) => {
                                              return {
                                                  value: item.costConfigId,
                                                  label: item.costName
                                              }
                                          })}
                                          fieldProps={{
                                              loading: typeLoading
                                          }}
                                      />

                                      <ProFormText width='md' name='comapany' label='医生'
                                                   placeholder='请输入医生'
                                                   rules={[{required: true, message: '请输入医生'}]}/>

                                      <ProFormText width='md' name='company' label='金额'
                                                   placeholder='请输入金额'
                                                   rules={[{required: true, message: '请输入金额'}]}/>

                                  </Card>
                                  <Card title='病人信息' style={{width: '100%', margin: '10px 0 20px 0'}}>
                                      <Row gutter={8}>
                                          <Col span={5}>
                                              <ProFormText width='md' name='a1' label='姓名' placeholder='请输入姓名'
                                                           rules={[{required: true, message: '请输入姓名'}]}/>
                                          </Col>
                                          <Col span={5}>
                                              <ProFormDatePicker
                                                  width={"xl"}
                                                  name='a2'
                                                  label='出生日期' placeholder='请选择出生日期'
                                                  rules={[{required: true, message: '请选择出生日期'}]}
                                                  onChange={DatePickerChange}/>
                                          </Col>
                                          <Col span={4}>
                                              <ProFormText width='md' name='age' label='年龄' placeholder='请输入年龄'
                                                           rules={[{required: true, message: '请输入年龄'}]}/>
                                          </Col>
                                          <Col span={5}>
                                              <ProFormText width='md' name='a3' label='手机号'
                                                           placeholder='请输入手机号'
                                                           rules={[{required: true, message: '请输入手机号'}]}/>
                                          </Col>
                                          <Col span={5}>
                                              <ProFormRadio.Group
                                                  name='company'
                                                  label='性别'
                                                  rules={[{required: true, message: '请选择性别'}]}
                                                  options={[
                                                      {
                                                          label: '男',
                                                          value: '男',
                                                      },
                                                      {
                                                          label: '女',
                                                          value: '女',
                                                      },
                                                  ]}
                                              />
                                          </Col>
                                      </Row>
                                      <Row gutter={8}>
                                          <Col span={5}>
                                              <ProFormSelect
                                                  name='select'
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
                                                  rules={[{required: true, message: '请输入证件号码'}]}
                                                  label='证件号码'
                                                  name='gzdw' width={"xl"}/>
                                          </Col>
                                          <Col span={6}>
                                              <ProFormSelect
                                                  name='select'
                                                  label='民族'
                                                  placeholder='请选择民族'
                                                  rules={[{required: true, message: '请选择民族'}]}
                                                  options={mzList}
                                              />
                                          </Col>
                                          <Col span={5}>
                                              <ProFormSelect
                                                  name='select'
                                                  label='文化程度'
                                                  placeholder='请选择文化程度'
                                                  rules={[{required: true, message: '请选择文化程度'}]}
                                                  options={whcdList}
                                              />
                                          </Col>
                                      </Row>
                                      <Row gutter={8}>
                                          <Col span={5}>
                                              <ProFormSelect
                                                  name='select'
                                                  label='婚姻状况'
                                                  placeholder='请选择婚姻状况'
                                                  rules={[{required: true, message: '请选择婚姻状况'}]}
                                                  options={[
                                                      {value: '已婚', label: '已婚'},
                                                      {value: '未婚', label: '未婚'},
                                                  ]}
                                              />
                                          </Col>
                                          <Col span={4}>
                                              <ProFormSelect
                                                  name='select'
                                                  label='费别'
                                                  placeholder='请选择费别'
                                                  rules={[{required: true, message: '请选择费别'}]}
                                                  options={[
                                                      {value: '费别1', label: '费别1'},
                                                      {value: '费别2', label: '费别2'},
                                                  ]}
                                              />
                                          </Col>
                                          <Col span={4}>
                                              <ProFormText width='md' name='age' label='就诊编号'
                                                           placeholder='请输入就诊编号'
                                                           rules={[{required: true, message: '请输入就诊编号'}]}/>
                                          </Col>
                                          <Col span={6}> </Col>
                                          <Col span={5}></Col>
                                      </Row>
                                      <Row gutter={8}>
                                          <Col span={5}>
                                              <Form.Item
                                                  label='户籍地'
                                                  name='gzdw'
                                                  rules={[{required: true, message: '请选择户籍地'}]}
                                              >
                                                  <AddressSelect/>
                                              </Form.Item>
                                          </Col>
                                          <Col span={4}>
                                              <ProFormText width='md' name='company' label='街道/乡镇'
                                                           placeholder='请输入街道/乡镇'
                                                           rules={[{required: true, message: '请输入街道/乡镇'}]}/>
                                          </Col>
                                          <Col span={4}>
                                              <ProFormText width='md' name='age' label='社区/村'
                                                           placeholder='请输入社区/村'
                                                           rules={[{required: true, message: '请输入社区/村'}]}/>
                                          </Col>
                                          <Col span={6}>
                                              <ProFormText width='md' name='company' label='组/门牌号'
                                                           placeholder='请输入组/门牌号'
                                                           rules={[{required: true, message: '请输入组/门牌号'}]}/>
                                          </Col>
                                          <Col span={5}>
                                          </Col>
                                      </Row>
                                      <Row gutter={8}>
                                          <Col span={5}>
                                              <Form.Item
                                                  label='现住址'
                                                  name='gzdw'
                                                  rules={[{required: true, message: '请选择现住址'}]}
                                              >
                                                  <AddressSelect/>
                                              </Form.Item>
                                          </Col>
                                          <Col span={4}>
                                              <ProFormText width='md' name='company' label='街道/乡镇'
                                                           placeholder='请输入街道/乡镇'
                                                           rules={[{required: true, message: '请输入街道/乡镇'}]}/>
                                          </Col>
                                          <Col span={4}>
                                              <ProFormText width='md' name='age' label='社区/村'
                                                           placeholder='请输入社区/村'
                                                           rules={[{required: true, message: '请输入社区/村'}]}/>
                                          </Col>
                                          <Col span={6}>
                                              <ProFormText width='md' name='company' label='组/门牌号'
                                                           placeholder='请输入组/门牌号'
                                                           rules={[{required: true, message: '请输入组/门牌号'}]}/>
                                          </Col>
                                          <Col span={5}>
                                          </Col>
                                      </Row>
                                  </Card>
                              </ProForm>,

                          },
                          {
                              key: "2",
                              label: "缴费",
                              children: <ProTable
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

    );
};

export default Sf;
