import React, { useEffect, useState } from 'react';
import { TreeSelect, Cascader } from 'antd';
import { useRequest } from '@/utils/Request';

const AddressSelect: React.FC = (props) => {
  const listAll = {
    url: '/rest/area/listAll',
    method: 'POST',
  };
  const [options, setOptions] = useState([]);
  const [targetOption,setTargetOption] = useState('')

  const { run: getTreeData } = useRequest(listAll, {
    manual: true,
    onError: (error) => {
      Message.error(error.message);
      console.log(error);
    },
    onSuccess: (response) => {
      console.log(response);
      if(!response.length){
        targetOption.loading = false;
        targetOption.isLeaf = true;
      }
      response.forEach(e => {
        e.isLeaf = false;
      });
      if (targetOption) {
        setTimeout(() => {
          targetOption.loading = false;
          targetOption.children= response
          setTargetOption('');
          setOptions([...options]);
        },1000);
      } else {
        setOptions(response);
      }
    },
  });

  useEffect(() => {
    getTreeData();
  }, []);

  useEffect(() => {
    if (targetOption) {
      getTreeData({ data: { parentId: targetOption.id } });
    }
  }, [targetOption]);

  const loadData = (selectedOptions) => {
    const targetO= selectedOptions[selectedOptions.length - 1];
    targetO.loading = true;
    setTargetOption(targetO)

  };
  return (
    <Cascader
      options={options}
      loadData={loadData}
      fieldNames={{
        label: 'title',
        value: 'id',
        pid: 'parentid',
      }}
      {...props}
      changeOnSelect />
  );
};

export default AddressSelect;
