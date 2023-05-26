import {Cascader} from "antd";
import React from "react";
import {useModel} from "@@/exports";

export declare type CityType = {
    province?: number | string;

    city?: number | string;

    area?: number | string;


}

interface CitySelectProps {
    value?: CityType;

    onChange?: (values: CityType) => void;

}

const CitySelect: React.FC<CitySelectProps> = (props) => {

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

    const tmpValue = [];

    if (value?.province) {
        tmpValue.push(value.province);
        if (value?.city) {
            tmpValue.push(value.city);
            if (value?.area) {
                tmpValue.push(value.area);
            }
        }

    }

    return (

        <Cascader
            placeholder='请选择城市/地区'
            options={data}
            onChange={(values: any) => {
                if (values && values.length === 3) {
                    onChange?.({
                        province: values[0],
                        city: values[1],
                        area: values[2],
                    });
                }
            }}
            value={tmpValue}
        />
    );
}
export default CitySelect;