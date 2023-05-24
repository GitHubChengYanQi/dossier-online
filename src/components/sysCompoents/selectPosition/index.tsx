import { Select } from 'antd';
import { useModel } from 'umi';

type SelectPositionProps = {

  value?: any;
  onChange?: (values: number[]) => void;

}
const SelectPosition: React.FC<SelectPositionProps> = (props) => {

  const { onChange, value } = props;

  const { data: positionData } = useModel('position');

  return (
    <Select
      value={value&&`${value}`}
      options={positionData}
      onChange={(values) => {
        onChange?.(values as any);
      }}
    />
  );
};
export default SelectPosition;
