import {TreeSelect} from "antd";
import {useModel} from "@@/exports";

type SelectDeptProps = {

    value?: any;
    onChange?: (values: number[]) => void;

    multiple?: boolean
}
const SelectDept: React.FC<SelectDeptProps> = (props) => {

    const {multiple = true, onChange,value} = props;

    const {data: deptData} = useModel("dept");

    return (
        <TreeSelect
            multiple={multiple}
            treeDefaultExpandAll
            treeData={deptData}
            value={value}
            onChange={(values) => {
                onChange?.(values);
            }}
        />
    );
}
export default SelectDept;
