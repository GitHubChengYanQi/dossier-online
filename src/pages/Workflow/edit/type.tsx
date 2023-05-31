import {requestType} from '@/components/sysCompoents/renderField';

export declare type AuditNodePositionType = {
    deptId: number;
    positionId: number
}

export declare type AuditNodeType = {
    auditNode?: NodeSettingType;
    conditions?: conditionType[];
    actions?: actionType[]
}

export declare type NodeSettingType = {

    type: string[];

    userList?: number[];

    deptIds?: number[];

    headDeptIds?: number[];

    positionIds?: AuditNodePositionType[];

    andOr?: 'AND' | 'OR',

    action?: string[]

    extend?: string
}

export declare type ProcessNodeType = {

    auditType: string;

    remark?: string[];

    childNode?: ProcessNodeType | null;  // 下级步骤

    conditionNodeList?: ProcessNodeType[]; // 分支

    nodeSetting?: AuditNodeType;

}

export declare type conditionType = {
    fieldName: string;

    fieldTitle: string;

    condition: 'eq' | 'ne' | 'lt' | 'gt' | 'ge' | 'le';

    type: any;

    enums?: Record<string, any>;

    request?: requestType;

    value: string
}

export declare type actionType = {
    title: string;

    type: any;
}
