import { TreeSelect } from 'antd';
import { useModel } from '@@/exports';
import { DeptTreeType } from '@/models/dept';
import React from 'react';

type SelectDeptProps = {

  preData?: DeptTreeType[];
  value?: any;
  onChange?: (values: number[]) => void;

  multiple?: boolean
}
const SelectDept: React.FC<SelectDeptProps> = (props) => {

  const { multiple = true, onChange, value, preData } = props;

  const { data: deptData } = useModel('dept');

  const treeData = preData ? [...preData, ...deptData] : deptData;
  return (
    <TreeSelect
      multiple={multiple}
      treeDefaultExpandAll
      treeData={treeData}
      value={value && (multiple ? value.map((item: any) => `${item}`) : `${value}`)}
      onChange={(values) => {
        onChange?.(values);
      }}
    />
  );
};
export default SelectDept;
