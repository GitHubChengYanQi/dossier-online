import React, {useContext, useRef, useState} from 'react';
import AddNode from '../AddNode';
import Render from '../Render';
import {NodeTypes} from '../Constants';
import WFC from '../../OperatorContext';
import styles from './index.module.scss';
import {conditionType, NodeSettingType} from "../../type";
import {DrawerForm} from "@ant-design/pro-components";
import {FormInstance} from "antd";


const CoverLine = ({first = false, last = false}) => {

    return (<React.Fragment>
        {first && <div className='top-left-cover-line'/>}
        {first && <div className='bottom-left-cover-line'/>}
        {last && <div className='top-right-cover-line'/>}
        {last && <div className='bottom-right-cover-line'/>}
    </React.Fragment>);
};

const BranchNode = (props) => {


    const ref = useRef<FormInstance>();

    const {width, condition} = useContext(WFC);

    const [open, setOpen] = useState<boolean>(false);

    const {first = false, last = false} = props;

    const onClick = () => {
        setOpen(true);
        props.onBranchClick(props.objRef)
    }

    return (
        <>
            <div className='condition-node'>
                <div className='condition-node-box'>
                    <div className='auto-judge'>
                        {!first && <div className='sort-left' onClick={props.sortLeft}/>}
                        <div className='title-wrapper'>
                            <span className='editable-title'>{props.nodeName}</span>
                            <div className='close' onClick={props.delBranch}>icon</div>
                        </div>
                        {!last && <div className='sort-right' onClick={props.sortRight}/>}
                        <div className='content' onClick={() => {
                            onClick();
                        }}>
                            <div className='text'>
                                {'无条件'}
                            </div>
                            {/* <i className="anticon anticon-right arrow"></i> */}
                        </div>
                    </div>
                    <AddNode objRef={props.objRef}/>
                </div>
            </div>
            <DrawerForm<NodeSettingType>
                drawerProps={{
                    destroyOnClose: true,
                    maskClosable: false
                }}
                formRef={ref}
                title={"分支条件配置"}
                width={width}
                open={open}
                onOpenChange={(v) => {
                    setOpen(v);
                }}
                onValuesChange={(changedFields) => {

                }}
                onFinish={async (values) => {
                    props.objRef.nodeSetting = values;
                    setOpen(false)
                }}
            >
                {
                    condition && condition.map((item: conditionType) => {
                        return (
                            <div key={item.fieldName}>{item.fieldName}</div>
                        );
                    })
                }
            </DrawerForm>
        </>
    );
};


function ConditionNode({conditionNodeList: branches = [], ...restProps}) {

    const {onAddNode, onDeleteNode, onSelectNode} = useContext(WFC);

    function addBranch() {
        onAddNode(NodeTypes.BRANCH, restProps.pRef, restProps.objRef);
    }

    function delBranch(i) {
        if (branches.length === 2) {
            onDeleteNode(restProps.pRef, restProps.objRef);
            return;
        }
        onDeleteNode(restProps.pRef, restProps.objRef, NodeTypes.BRANCH, i);
    }

    function sortLeft() {

    }

    function sortRight() {

    }

    function onBranchClick(objRef) {
        onSelectNode?.(restProps.objRef, objRef);
    }

    return (
        branches && branches.length > 0 && <div className={styles.branchWrap}>
            <div className='branch-box-wrap'>
                <div className='branch-box'>
                    <div className='add-branch' onClick={addBranch}>添加条件</div>
                    {branches.map((item, index) => {
                        return (<div className='col-box' key={index.toString()}>
                            <BranchNode
                                {...item}
                                first={index === 0}
                                onBranchClick={onBranchClick}
                                delBranch={() => delBranch(index)}
                                last={index === branches.length - 1} objRef={item}/>
                            {item.childNode && <Render pRef={item} config={item.childNode}/>}
                            <CoverLine first={index === 0} last={index === branches.length - 1}/>
                        </div>);
                    })}
                </div>
                <AddNode objRef={restProps.objRef}/>
            </div>
        </div>
    );
}

export default ConditionNode;
