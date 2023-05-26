import React, {useEffect} from 'react';
import {Card, Cascader, Form, Input} from 'antd';
import {useModel} from "umi";

interface Option {
    id: string | number | null;
    value?: string | number | null;
    label: React.ReactNode;
    children?: Option[];
    isLeaf?: boolean;
    loading?: boolean;
}

type address = {
    sf?: number | string;

    city?: number | string;

    area?: number | string;

    jd?: number | string;

    sq?: number | string;

    mph?: number | string;

}

interface AddressProps {
    value?: address;

    onChange?: (values: address) => void;

}

const AddressSelect: React.FC<AddressProps> = (props) => {

    const {value, onChange: propsChange} = props;
    const {data} = useModel("area");


    const onChange = (values: any) => {
        propsChange?.(
            {
                ...value,
                ...values
            }
        );
    }
    useEffect(() => {
        console.log(value)

        // setFieldsValue({
        //     ...fieldsValue,
        //     ...value,
        // });
    }, [value]);
    const tmpValue = [];
    if (value?.sf){
        tmpValue.push(value.sf);
        if (value?.city){
            tmpValue.push(value.city);
            if (value?.area){
                tmpValue.push(value.area);
            }
        }

    }

    return (
        <Card>
            <Form.Item
                labelCol={{span: 3}}
                wrapperCol={{span: 10}}
                label='城市/地区'
            >
                <Cascader
                    placeholder='请选择城市/地区'
                    options={data}
                    onChange={(values: any) => {
                        if (values && values.length === 3) {
                            onChange?.({
                                sf: values[0],
                                city: values[1],
                                area: values[2],
                            });
                        }
                    }}
                    value={tmpValue}
                />
            </Form.Item>
            <Form.Item
                labelCol={{span: 3}}
                wrapperCol={{span: 10}}
                label='街道/乡镇'
            >
                <Input
                    placeholder='请输入街道/乡镇'
                    onChange={(values: any) => {
                        onChange?.({
                            jd: values.target.value,
                        });
                    }}
                    value={value?.jd}
                />
            </Form.Item>

            <Form.Item
                labelCol={{span: 3}}
                wrapperCol={{span: 10}}
                label='社区/村'

            >
                <Input
                    placeholder='请输入社区/村'

                    onChange={(values: any) => {
                        onChange?.({
                            sq: values.target.value,
                        });
                    }
                    }
                />
            </Form.Item>

            <Form.Item
                labelCol={{span: 3}}
                wrapperCol={{span: 7}}
                label='组/门牌号'
            >
                <Input
                    placeholder='请输入组/门牌号'
                    onChange={(values: any) => {
                        onChange?.({
                            mph: values.target.value,
                        });
                    }
                    }
                />
            </Form.Item>

        </Card>
    );
};

export default AddressSelect;
