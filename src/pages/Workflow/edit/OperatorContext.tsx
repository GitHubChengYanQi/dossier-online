import React from 'react';
import {actionType, ProcessNodeType} from '@/pages/Workflow/edit/type';
import {conditionType} from '@/pages/Workflow/edit/type';
import {RenderFieldType} from "@/components/sysCompoents/renderField";

type WfcProps = {
    width?: number;
    config?: object;
    updateNode?: () => void;
    onAddNode?: (type: string, pRef?: ProcessNodeType, objRef?: ProcessNodeType) => void;
    onDeleteNode?: (pRef: ProcessNodeType, objRef: ProcessNodeType, type?: any, index?: number) => void;
    onSelectNode?: (pRef: ProcessNodeType, objRef: ProcessNodeType) => void;
    auditNodeType?: {
        value: string;
        label: string;
    }[],
    condition?: conditionType[],
    action?: actionType[];
    auditExtend?: RenderFieldType;
};

const WFC = React.createContext<WfcProps>({});
export default WFC;
