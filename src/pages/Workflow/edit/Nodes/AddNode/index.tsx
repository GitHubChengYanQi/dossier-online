import React, { useState, useContext } from 'react';
import { Popover } from 'antd';
import AddNodeList from '../AddNodeList';
import WFC from '../../OperatorContext';
import { PlusOutlined } from '@ant-design/icons';
import { ProcessNodeType } from '@/pages/Workflow/type';
import { styled } from 'umi';


const NodeWrapper = styled.div`
  width: 240px;
  display: inline-flex;
  flex-shrink: 0;
  -webkit-box-flex: 1;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    margin: auto;
    width: 2px;
    height: 100%;
    background-color: #cacaca
  }

  .add-node-btn {
    user-select: none;
    width: 240px;
    padding: 20px 0 32px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    flex-shrink: 0;
    -webkit-box-flex: 1;
    flex-grow: 1;

    .btn {
      outline: none;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
      width: 30px;
      height: 30px;
      background: #3296fa;
      border-radius: 50%;
      position: relative;
      border: none;
      line-height: 30px;
      -webkit-transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      text-align: center;
      cursor: pointer;

      .anticon {
        color: #fff;
        font-size: 30px
      }

      &:hover {
        transform: scale(1.3);
        box-shadow: 0 13px 27px 0 rgba(0, 0, 0, .1)
      }

      &:active {
        transform: none;
        background: #1e83e9;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1)
      }
    }
  }`;
type AddNodeType = {
  pRef?: ProcessNodeType;
  objRef?: ProcessNodeType;
}
const AddNode: React.FC<AddNodeType> = (props) => {

  const { onAddNode } = useContext(WFC);

  function onOptionClick(type: string) {
    onAddNode?.(type, props.pRef as any, props.objRef as any);
  }

  const [visible, setVisible] = useState<boolean>(false);

  return (
    <NodeWrapper>
      <div className='add-node-btn'>
        <Popover
          open={visible}
          onOpenChange={setVisible}
          placement='bottom'
          content={<AddNodeList onOptionClick={(type: string) => {
            setVisible(false);
            onOptionClick(type);
          }} />} trigger='click'>
          <div className='btn'>
            <PlusOutlined />
          </div>
        </Popover>
      </div>
    </NodeWrapper>
  );
};

export default AddNode;
