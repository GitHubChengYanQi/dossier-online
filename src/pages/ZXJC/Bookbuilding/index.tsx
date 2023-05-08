import { PageContainer, } from '@ant-design/pro-components';
import styles from './index.less';
import { Card, Button, Checkbox, Form, Input, Select, Col, Row, DatePicker, Radio, InputNumber, Space, message } from 'antd';
import AddressSelect from '@/components/AddressSelect';
import { useState } from 'react';
import zjTypeList from '../../../utils/zjType';
import nationList from '../../../utils/nation'
import zyList from '../../../utils/zy'
import whcdList from '../../../utils/whcd'
import gjList from '../../../utils/gj'
import { useRequest } from "@/utils/Request";
const Bookbuilding: React.FC = () => {
  const addItem = {
    url: '/addItem',
    method: 'POST',
  };
  const [husbandState, setHusbandState] = useState(false);
  const [messageApi] = message.useMessage();
  const { run: runAdd } = useRequest(addItem, {
    manual: true,
    onError: (error:any) => {
      messageApi.error(error.message);
      console.log(error);
    },
    onSuccess: (response:any) => {
      console.log(response);
      if (response.errCode === 0){
        messageApi.open({
          type: 'success',
          content: '保存成功',
        });
      }
    },
  });
  const onFinish = (values: any) => {
    const objData = {
      ...values,
      zfxx:{ // 丈夫信息
        zjType: values.zfZjType,
        zjh: values.zfZjh,
        name: values.zfName,
        csrq: values.zfCsrq,
        nl: values.zfNl,
        hjxz: values.zfHjxz,
        mz: values.zfMz,
        zy: values.zfZy,
        whcd: values.zfWhcd,
        gj: values.zfGj,
        sfbd: values.zfSfbd,
        lxdh: values.zfLxdh,
        gzdw: values.zfGzdw,
        hyzk: values.zfHyzk,
        ssqk: { // 妊娠情况
          mcyjrq: values.mcyjrq,
          ycq: values.ycq,
          jkyz: values.jkyz
        },
        hjdz:{ // 丈夫户籍地址
          sf: values.zfAdz[0] || '',
          city: values.zfAdz[1] || '',
          area: values.zfAdz[2] || '',
          jd: values.zfAjd,
          sq: values.zfAsq,
          mph: values.zfAmph
        },
        xzdz:{ // 丈夫现住地址
          sf: values.zfBdz[0] || '',
          city: values.zfBdz[1] || '',
          area: values.zfBdz[2] || '',
          jd: values.zfBjd,
          sq: values.zfBsq,
          mph: values.zfBmph
        }
      },
      hjdz:{ // 孕妇户籍地址
        sf: values.Adz[0] || '',
        city: values.Adz[1] || '',
        area: values.Adz[2] || '',
        jd: values.Ajd,
        sq: values.Asq,
        mph: values.Amph
      },
      xzdz:{ // 孕妇现住地址
        sf: values.Bdz[0] || '',
        city: values.Bdz[1] || '',
        area: values.Bdz[2] || '',
        jd: values.Bjd,
        sq: values.Bsq,
        mph: values.Bmph
      },
      chxydz:{ // 孕妇产后修养地址
        sf: values.Cdz[0] || '',
        city: values.Cdz[1] || '',
        area: values.Cdz[2] || '',
        jd: values.Cjd,
        sq: values.Csq,
        mph: values.Cmph
      },
    }
    console.log('Success:', objData);
    runAdd({data:{...objData}})
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <PageContainer
        ghost
        header={{
        breadcrumb: {},
      }}>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: '100%' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        labelAlign='left'
      >
        <Card title='孕妇信息' bordered={false} style={{ width: '100%' }}>
          {/* 第一行 -----------------------------------*/}
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label='证件类型'
                name='zjType'
                rules={[{ required: true, message: '请选择证件类型！' }]}
              >
                <Select
                  options={zjTypeList}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='证件号码'
                name='zjh'
                rules={[{ required: true, message: '请填写证件号码' }]}
              >
                <InputNumber placeholder='请填写证件号码' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='孕妇姓名'
                name='name'
                rules={[{ required: true, message: '请填写孕妇姓名' }]}
              >
                <Input placeholder='请填写孕妇姓名' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='保健卡号'
                name='bjkh'
              >
                <InputNumber placeholder='请填写保健卡号' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          {/* 第一行 -----------------------------------*/}

          {/* 第二行 -----------------------------------*/}
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label='保健编号'
                name='bjbh'
                rules={[{ required: true, message: '请填写保健编号' }]}
              >
                <InputNumber placeholder='请填写保健编号' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='出生日期'
                name='csrq'
                rules={[{ required: true, message: '请选择出生日期' }]}
              >
                <DatePicker placeholder='请选择出生日期' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='年龄'
                name='nl'
                rules={[{ required: true, message: '请填写年龄' }]}
              >
                <InputNumber placeholder='请填写年龄' addonAfter='岁' />
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
          {/* 第二行 -----------------------------------*/}

          {/* 第三行 -----------------------------------*/}
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label='民族'
                name='mz'
                rules={[{ required: true, message: '请选择民族' }]}
              >
                <Select
                  options={nationList}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='职业'
                name='zy'
                rules={[{ required: true, message: '请选择职业' }]}
              >
                <Select
                  options={zyList}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='文化程度'
                name='whcd'
                rules={[{ required: true, message: '请选择文化程度' }]}
              >
                <Select
                  options={whcdList}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='家庭经济'
                name='jtjj'
                rules={[{ required: true, message: '请选择家庭经济' }]}
              >
                <Select
                  options={[
                    { value: '低', label: '低' },
                    { value: '中', label: '中' },
                    { value: '高', label: '高' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          {/* 第三行 -----------------------------------*/}

          {/* 第四行 -----------------------------------*/}
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label='国籍'
                name='gj'
                rules={[{ required: true, message: '请选择国籍' }]}
              >
                <Select
                  options={gjList}
                />
              </Form.Item>
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
                label='居住年限'
                name='jznx'
              >
                <Radio.Group>
                  <Radio value='一年以上'>一年以上</Radio>
                  <Radio value='一年以下'>一年以下</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='是否服用叶酸 '
                name='sffyys'
              >
                <Radio.Group>
                  <Radio value='是'>是</Radio>
                  <Radio value='否'>否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          {/* 第四行 -----------------------------------*/}

          {/* 第五行 -----------------------------------*/}
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label='联系电话'
                name='lxdh'
                rules={[{ required: true, message: '请填写联系电话' }]}
              >
                <InputNumber placeholder='请填写联系电话' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 22 }}
                label='工作单位'
                name='gzdw'
              >
                <Input placeholder='请填写工作单位' />
              </Form.Item>
            </Col>
          </Row>
          {/* 第五行 -----------------------------------*/}

          {/* 第六行 -----------------------------------*/}
          <Form.Item
              labelCol={{span:2}}
              wrapperCol={{span:20}}
              label='户籍地址'
              name='Adz'
              rules={[{ required: true, message: '请选择户籍地址' }]}
          >
            <AddressSelect key='addressSelect_1' />
          </Form.Item>
          {/* 第六行 -----------------------------------*/}

          {/* 第七行 -----------------------------------*/}
          <Form.Item
              labelCol={{span:2}}
              wrapperCol={{span:20}}
              label='现住地址'
              name='Bdz'
              rules={[{ required: true, message: '请选择现住地址' }]}
          >
            <AddressSelect key='addressSelect_1' />
          </Form.Item>
          {/* 第七行 -----------------------------------*/}

          {/* 第八行 -----------------------------------*/}
          <Form.Item
              labelCol={{span:2}}
              wrapperCol={{span:20}}
              label='产后修养地址'
              name='Cdz'
              rules={[{ required: true, message: '请选择产后修养地址' }]}
          >
            <AddressSelect key='addressSelect_1' />
          </Form.Item>
          {/* 第八行 -----------------------------------*/}

          {/* 第九行 -----------------------------------*/}
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label='婚姻状况'
                name='hyzk'
                rules={[{ required: true, message: '请选择婚姻状况' }]}
              >
                <Select
                  placeholder='请选择婚姻状况'
                  options={[
                    { value: '已婚', label: '已婚' },
                    { value: '未婚', label: '未婚' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='现存男孩'
                name='xcnh'
                rules={[{ required: true, message: '请填写现存男孩数量' }]}
              >
                <InputNumber placeholder='请填写现存男孩数量' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='现存女孩'
                name='xcnvh'
                rules={[{ required: true, message: '请填写现存女孩数量' }]}
              >
                <InputNumber placeholder='请填写现存女孩数量' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          {/* 第七行 -----------------------------------*/}
        </Card>
        <Card title='丈夫信息' bordered={false} style={{ width: '100%', marginTop: '15px' }} extra={
          <Checkbox onChange={(e) => {
            console.log(e.target.checked, 'checkE');
            setHusbandState(e.target.checked);
          }
          }>未提供</Checkbox>
        }>
          {
            !husbandState && (
              <>
                {/* 第一行 -----------------------------------*/}
                <Row gutter={16}>
                  <Col span={6}>
                    <Form.Item
                      label='丈夫姓名'
                      name='zfName'
                      rules={[{ required: true, message: '请填写丈夫姓名' }]}
                    >
                      <Input placeholder='请填写丈夫姓名' />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label='证件类型'
                      name='zfZjType'
                      rules={[{ required: true, message: '请选择证件类型！' }]}
                    >
                      <Select
                        options={zjTypeList}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label='证件号码'
                      name='zfZjh'
                      rules={[{ required: true, message: '请填写证件号码' }]}
                    >
                      <InputNumber placeholder='请填写证件号码' style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label='出生日期'
                      name='zfCsrq'
                      rules={[{ required: true, message: '请选择出生日期' }]}
                    >
                      <DatePicker placeholder='请选择出生日期' style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                </Row>
                {/* 第一行 -----------------------------------*/}

                {/* 第二行 -----------------------------------*/}
                <Row gutter={16}>
                  <Col span={6}>
                    <Form.Item
                      label='民族'
                      name='zfMz'
                      rules={[{ required: true, message: '请选择民族' }]}
                    >
                      <Select
                        options={nationList}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label='职业'
                      name='zfZy'
                      rules={[{ required: true, message: '请选择职业' }]}
                    >
                      <Select
                        options={zyList}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label='联系电话'
                      name='zfLxdh'
                      rules={[{ required: true, message: '请填写联系电话' }]}
                    >
                      <InputNumber placeholder='请填写联系电话' style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label='文化程度'
                      name='zfWhcd'
                      rules={[{ required: true, message: '请选择文化程度' }]}
                    >
                      <Select
                        options={whcdList}
                      />
                    </Form.Item>
                  </Col>

                </Row>
                {/* 第二行 -----------------------------------*/}

                {/* 第三行 -----------------------------------*/}
                <Row gutter={16}>
                  <Col span={6}>
                    <Form.Item
                      label='国籍'
                      name='zfGj'
                      rules={[{ required: true, message: '请选择国籍' }]}
                    >
                      <Select
                        options={gjList}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={18}>
                    <Form.Item
                      labelCol={{ span: 2 }}
                      wrapperCol={{ span: 22 }}
                      label='工作单位'
                      name='zfGzdw'
                    >
                      <Input placeholder='请填写工作单位' />
                    </Form.Item>
                  </Col>
                </Row>
                {/* 第三行 -----------------------------------*/}

                {/* 第四行 -----------------------------------*/}
                <Row gutter={16}>
                  <Col span={6}>
                    <Form.Item
                      label='年龄'
                      name='zfNl'
                      rules={[{ required: true, message: '请填写年龄' }]}
                    >
                      <InputNumber placeholder='请填写年龄' addonAfter='岁' />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label='婚姻状况'
                      name='zfHyzk'
                      rules={[{ required: true, message: '请选择婚姻状况' }]}
                    >
                      <Select
                        placeholder='请选择婚姻状况'
                        options={[
                          { value: '已婚', label: '已婚' },
                          { value: '未婚', label: '未婚' },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label='是否本地'
                      name='zfSfbd'
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
                      name='zfHjxz'
                    >
                      <Radio.Group>
                        <Radio value='农业'>农业</Radio>
                        <Radio value='非农业'>非农业</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
                {/* 第四行 -----------------------------------*/}

                {/* 第五行 -----------------------------------*/}
                <Form.Item
                    labelCol={{span:2}}
                    wrapperCol={{span:20}}
                    label='户籍地址'
                    name='zfAdz'
                    rules={[{ required: true, message: '请选择户籍地址' }]}
                >
                  <AddressSelect key='addressSelect_1' />
                </Form.Item>
                {/* 第五行 -----------------------------------*/}

                {/* 第六行 -----------------------------------*/}
                <Form.Item
                    labelCol={{span:2}}
                    wrapperCol={{span:20}}
                    label='现住地址'
                    name='zfBdz'
                    rules={[{ required: true, message: '请选择现住地址' }]}
                >
                  <AddressSelect key='addressSelect_1' />
                </Form.Item>
                {/* 第六行 -----------------------------------*/}

              </>
            )
          }
        </Card>
        <Card title='本次妊娠情况' bordered={false} style={{ width: '100%', marginTop: '15px' }} extra={
          <span style={{ color: 'red' }}>注意：本系统预产期计算为标准公式：”末次月经后40周“，而不是心算公式：”月份加九或减三，日数加七“</span>
        }>
          {/* 第一行 -----------------------------------*/}
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label='末次月经'
                name='mcyjrq'
                rules={[{ required: true, message: '请选择末次月经' }]}
              >
                <DatePicker placeholder='请选择末次月经' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='预产期'
                name='ycq'
                rules={[{ required: true, message: '请选择预产期' }]}
              >
                <DatePicker placeholder='请选择预产期' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='建卡孕周'
                name='jkyz'
                rules={[{ required: true, message: '请填写建卡孕周' }]}
              >
                <InputNumber placeholder='请填写建卡孕周' addonAfter='周' />
              </Form.Item>
            </Col>
          </Row>
          {/* 第一行 -----------------------------------*/}
        </Card>
        {/*<Card title='建册信息' bordered={false} style={{ width: '100%', marginTop: '15px' }}>*/}
        {/*  /!* 第一行 -----------------------------------*!/*/}
        {/*  <Row gutter={16}>*/}
        {/*    <Col span={6}>*/}
        {/*      <Form.Item*/}
        {/*        label='建册单位'*/}
        {/*        name='a22'*/}
        {/*        rules={[{ required: true, message: '请选择建册单位' }]}*/}
        {/*      >*/}
        {/*        <Select*/}
        {/*          options={[*/}
        {/*            { value: '1', label: '医院' },*/}
        {/*            { value: '2', label: '医院2' },*/}
        {/*          ]}*/}
        {/*        />*/}
        {/*      </Form.Item>*/}
        {/*    </Col>*/}
        {/*    <Col span={6}>*/}
        {/*      <Form.Item*/}
        {/*        label='建册医生'*/}
        {/*        name='name1'*/}
        {/*        rules={[{ required: true, message: '请填写建册医生' }]}*/}
        {/*      >*/}
        {/*        <Input aceholder='请填写建册医生' />*/}
        {/*      </Form.Item>*/}
        {/*    </Col>*/}
        {/*  </Row>*/}
        {/*  /!* 第一行 -----------------------------------*!/*/}
        {/*</Card>*/}

        <Form.Item wrapperCol={{ span: 24 }}>
          <Space className={styles['flex-row-center']} style={{ width: '100%', justifyContent: 'center', marginTop: '15px' }}>
            <Button type='primary' htmlType='submit'>
              保存
            </Button>
            <Button type='primary' htmlType='submit' danger>
              删除
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </PageContainer>
  );
};

export default Bookbuilding;
