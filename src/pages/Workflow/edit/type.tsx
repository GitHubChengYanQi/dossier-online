import { requestType } from '@/components/sysCompoents/renderField';

export declare type AuditNodePositionType = {
  deptId: number;
  positionId: number
}

export declare type AuditNodeType = {
  auditNode?: NodeSettingType;
  condition?: conditionType[]
}

export declare type NodeSettingType = {

  type: string[];

  userList?: number[];

  deptIds?: number[];

  headDeptIds?: number[];

  positionIds?: AuditNodePositionType[];

  andOr?: 'AND' | 'OR',
}

export declare type ProcessNodeType = {

    auditType: string;

    remark?: string;
    childNode?: ProcessNodeType | null;  // 下级步骤
    conditionNodeList?: ProcessNodeType[]; // 分支
    nodeSetting?: NodeSettingType;

}

export declare type conditionType = {
  fieldName: string;

  fieldTitle: string;

  condition: 'eq' | 'ne' | 'lt' | 'gt' | 'ge' | 'le';

  type: any;

  enums?: Record<string, any>;

  request?: requestType;

  repairPosition: string
}
