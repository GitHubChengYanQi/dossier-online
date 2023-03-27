import React, { useEffect, useState } from 'react';
import {
  PageContainer,
  ProForm,
  ProFormText,
  ProFormRadio,
  ProFormDatePicker,
  ProFormSelect,
  ProFormDigit,
  ProTable,
} from '@ant-design/pro-components';
import AddressSelect from '@/components/AddressSelect';
import { Card, Tabs, Row, Col, Input, Form, Space } from 'antd';
import zjlxList from '@/utils/zjType';
import mzList from '@/utils/nation';
import whcdList from '@/utils/whcd';

const { TabPane } = Tabs;

const Sf = (props) => {
  const formRef = React.createRef();

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

  function DatePickerChange(date, dateString) {
    const _Y = dateString.split('-')[0];
    const _date = new Date();
    const currentY = _date.getFullYear();
    formRef.current.setFieldValue('age', currentY - _Y);
  }

  return (
    <PageContainer
      ghost
      header={{
        breadcrumb: {},
      }}>
      <Card bordered={false} style={{ width: '100%' }}>
        <Tabs defaultActiveKey='1'>
          <TabPane tab='挂号' key='1'>
            <ProForm
              labelAlign='left'
              layout='horizontal'
              formRef={formRef}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              submitter={{
                render: (props, doms) => {
                  return (
                    <Row>
                      <Col span={14} offset={10}>
                        <Space>{doms}</Space>
                      </Col>
                    </Row>
                  );
                },
              }}
              onFinish={async (values) => {
                console.log(values, 'values');
              }}
              onFinishFailed={async (values) => {
                console.log(values, 'onFinishFailed');
              }}
            >
              <Card title='号源' style={{ width: '100%' }}>
                <Row gutter={26}>
                  <Col span={5}>

                    <ProFormText width='md' name='company' label='科室' placeholder='请输入科室'
                                 rules={[{ required: true, message: '请输入科室' }]} />
                  </Col>
                  <Col span={4}>
                    <ProFormText width='md' name='comapany' label='医生' placeholder='请输入医生'
                                 rules={[{ required: true, message: '请输入医生' }]} />
                  </Col>
                  <Col span={4}>
                    <ProFormText width='md' name='company' label='号别' placeholder='请输入号别'
                                 rules={[{ required: true, message: '请输入号别' }]} />
                  </Col>
                  <Col span={6}>
                    <ProFormRadio.Group
                      name='company'
                      label='诊别/科目'
                      rules={[{ required: true, message: '请选择诊别/科目' }]}
                      options={[
                        {
                          label: '孕产保健',
                          value: '孕产保健',
                        },
                        {
                          label: '儿童保健',
                          value: '儿童保健',
                        },
                        {
                          label: '诊疗',
                          value: '诊疗',
                        },
                      ]}
                    />
                  </Col>
                  <Col span={5}>
                    <ProFormText width='md' name='company' label='金额' placeholder='请输入金额'
                                 rules={[{ required: true, message: '请输入金额' }]} />
                  </Col>
                </Row>
              </Card>
              <Card title='病人信息' style={{ width: '100%', margin: '10px 0 20px 0' }}>
                <Row gutter={26}>
                  <Col span={5}>
                    <ProFormText width='md' name='a1' label='姓名' placeholder='请输入姓名'
                                 rules={[{ required: true, message: '请输入姓名' }]} />
                  </Col>
                  <Col span={4}>
                    <ProFormDatePicker name='a2' label='出生日期' placeholder='请选择出生日期'
                                       rules={[{ required: true, message: '请选择出生日期' }]} onChange={DatePickerChange} />
                  </Col>
                  <Col span={4}>
                    <ProFormText width='md' name='age' label='年龄' placeholder='请输入年龄'
                                 rules={[{ required: true, message: '请输入年龄' }]} />
                  </Col>
                  <Col span={6}>
                    <ProFormText width='md' name='a3' label='手机号' placeholder='请输入手机号'
                                 rules={[{ required: true, message: '请输入手机号' }]} />
                  </Col>
                  <Col span={5}>
                    <ProFormRadio.Group
                      name='company'
                      label='性别'
                      rules={[{ required: true, message: '请选择性别' }]}
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
                <Row gutter={26}>
                  <Col span={5}>
                    <ProFormSelect
                      name='select'
                      label='证件类型'
                      placeholder='请选择证件类型'
                      rules={[{ required: true, message: '请选择证件类型' }]}
                      options={zjlxList}
                    />
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      labelCol={{ span: 4 }}
                      wrapperCol={{ span: 20 }}
                      rules={[{ required: true, message: '请输入证件号码' }]}
                      label='证件号码'
                      name='gzdw'
                    >
                      <Input placeholder='请输入证件号码' />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <ProFormSelect
                      name='select'
                      label='民族'
                      placeholder='请选择民族'
                      rules={[{ required: true, message: '请选择民族' }]}
                      options={mzList}
                    />
                  </Col>
                  <Col span={5}>
                    <ProFormSelect
                      name='select'
                      label='文化程度'
                      placeholder='请选择文化程度'
                      rules={[{ required: true, message: '请选择文化程度' }]}
                      options={whcdList}
                    />
                  </Col>
                </Row>
                <Row gutter={26}>
                  <Col span={5}>
                    <ProFormSelect
                      name='select'
                      label='婚姻状况'
                      placeholder='请选择婚姻状况'
                      rules={[{ required: true, message: '请选择婚姻状况' }]}
                      options={[
                        { value: '已婚', label: '已婚' },
                        { value: '未婚', label: '未婚' },
                      ]}
                    />
                  </Col>
                  <Col span={4}>
                    <ProFormSelect
                      name='select'
                      label='费别'
                      placeholder='请选择费别'
                      rules={[{ required: true, message: '请选择费别' }]}
                      options={[
                        { value: '费别1', label: '费别1' },
                        { value: '费别2', label: '费别2' },
                      ]}
                    />
                  </Col>
                  <Col span={4}>
                    <ProFormText width='md' name='age' label='就诊编号' placeholder='请输入就诊编号'
                                 rules={[{ required: true, message: '请输入就诊编号' }]} />
                  </Col>
                  <Col span={6}> </Col>
                  <Col span={5}></Col>
                </Row>
                <Row gutter={26}>
                  <Col span={5}>
                    <Form.Item
                      label='户籍地'
                      name='gzdw'
                      rules={[{ required: true, message: '请选择户籍地' }]}
                    >
                      <AddressSelect />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <ProFormText width='md' name='company' label='街道/乡镇' placeholder='请输入街道/乡镇'
                                 rules={[{ required: true, message: '请输入街道/乡镇' }]} />
                  </Col>
                  <Col span={4}>
                    <ProFormText width='md' name='age' label='社区/村' placeholder='请输入社区/村'
                                 rules={[{ required: true, message: '请输入社区/村' }]} />
                  </Col>
                  <Col span={6}>
                    <ProFormText width='md' name='company' label='组/门牌号' placeholder='请输入组/门牌号'
                                 rules={[{ required: true, message: '请输入组/门牌号' }]} />
                  </Col>
                  <Col span={5}>
                  </Col>
                </Row>
                <Row gutter={26}>
                  <Col span={5}>
                    <Form.Item
                      label='现住址'
                      name='gzdw'
                      rules={[{ required: true, message: '请选择现住址' }]}
                    >
                      <AddressSelect />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <ProFormText width='md' name='company' label='街道/乡镇' placeholder='请输入街道/乡镇'
                                 rules={[{ required: true, message: '请输入街道/乡镇' }]} />
                  </Col>
                  <Col span={4}>
                    <ProFormText width='md' name='age' label='社区/村' placeholder='请输入社区/村'
                                 rules={[{ required: true, message: '请输入社区/村' }]} />
                  </Col>
                  <Col span={6}>
                    <ProFormText width='md' name='company' label='组/门牌号' placeholder='请输入组/门牌号'
                                 rules={[{ required: true, message: '请输入组/门牌号' }]} />
                  </Col>
                  <Col span={5}>
                  </Col>
                </Row>
              </Card>
            </ProForm>
          </TabPane>
          <TabPane tab='缴费' key='2'>
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
                // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
                // 如果需要转化参数可以在这里进行修改
                const msg = await new Promise((resolve, reject) => {
                  resolve({
                    success: true,
                    total: 12,
                    result: [
                      { a: 123, b: 234 },
                      { a: 123, b: 234 },
                      { a: 123, b: 234 },
                      { a: 123, b: 234 },
                      { a: 123, b: 234 },
                      { a: 123, b: 234 },
                      { a: 123, b: 234 },
                      { a: 123, b: 234 },
                      { a: 123, b: 234 },
                      { a: 123, b: 234 },
                      { a: 123, b: 234 },
                      { a: 123, b: 234 },
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
          </TabPane>
        </Tabs>,
      </Card>
    </PageContainer>
  );
};

export default Sf;
