/**
 * RestRoleResult，角色表
 */
export interface RestRoleResult {
    /**
     * 创建时间
     */
    createTime?: Date;
    /**
     * 创建用户
     */
    createUser?: number;
    deptName: string;
    /**
     * 提示
     */
    description?: string;
    /**
     * 角色名称
     */
    name?: string;
    /**
     * 父角色id
     */
    pid?: number;
    pName: string;
    /**
     * 主键id
     */
    roleid: number;
    /**
     * 序号
     */
    sort?: number;
    /**
     * 修改时间
     */
    updateTime?: Date;
    /**
     * 修改用户
     */
    updateUser?: number;
    /**
     * 乐观锁
     */
    version?: number;
}