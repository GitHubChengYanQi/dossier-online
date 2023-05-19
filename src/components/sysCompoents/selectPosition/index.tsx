import {Select} from "antd";
import {useModel} from "@@/exports";

type SelectPositionProps = {

    value?: any;
    onChange?: (values: number[]) => void;

}
const SelectPosition: React.FC<SelectPositionProps> = (props) => {

    const { onChange} = props;

    const {data: positionData} = useModel("position");

    return (
        <Select
            options={positionData}
            onChange={(values) => {
                onChange?.(values);
            }}
        />
    );
}
export default SelectPosition;