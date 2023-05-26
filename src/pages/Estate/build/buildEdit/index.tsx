/**
 * 房屋管理-房间表编辑页
 *
 * @author Sing
 * @Date 2023-05-26 10:05:29
 */

import React from 'react';
import {BetaSchemaForm} from "@ant-design/pro-components";
import useBuildField from "../schema";
import { saveBuild,getBuildInfo } from "../service";
import useAlert from "@/components/useAlert";
import FormWrap,{FormWrapProps} from "@/components/FormWrap";

type BuildEditProps<T> = {
    id:number
} & FormWrapProps<T>

const BuildEdit = <T extends Record<string, any>>(props: BuildEditProps<T>) => {
    const { id, type, open , onSuccess, onClose, width } = props;
    const {
          Id,
          EstateId,
          CommonAreaId,
          BuildAreaId,
          BuildPartitionId,
          BuildTypeId,
          BuildStatusId,
          Name,
          Bn,
          BnNo,
          Unit,
          Floor,
          Number,
          Address,
          Acreage,
          TrueAcreage,
          FalseAcreage,
          Openid,
          Display,
          Inputtime,
          Updatetime,
          Remarks,
          UniqueChar,
          Phone,
          Numid,
          Urgent,
          OwnerName,
          IsGas,
          IsProperty,
          IsHeating,
          Key,
          Qgp,
          IntoTime,
          DeliveryTime,
          Subarea,
          NewTime,
          HousekeeperId,
          ProjectId,
        } = useBuildField();
    const columns = [
        Id,
        EstateId,
        CommonAreaId,
        BuildAreaId,
        BuildPartitionId,
        BuildTypeId,
        BuildStatusId,
        Name,
        Bn,
        BnNo,
        Unit,
        Floor,
        Number,
        Address,
        Acreage,
        TrueAcreage,
        FalseAcreage,
        Openid,
        Display,
        Inputtime,
        Updatetime,
        Remarks,
        UniqueChar,
        Phone,
        Numid,
        Urgent,
        OwnerName,
        IsGas,
        IsProperty,
        IsHeating,
        Key,
        Qgp,
        IntoTime,
        DeliveryTime,
        Subarea,
        NewTime,
        HousekeeperId,
        ProjectId,
        ];

    const {error,notification} = useAlert();

    return (
        <FormWrap
            open={open}
            type={type}
            onClose={onClose}
            width={width}
            request={async () => {
                return getBuildInfo(id);
            }}
            onFinish={async (values) => {
                const response = await saveBuild(id, values);
                if (response.errCode !== 0) {
                    error(response.message);
                } else {
                    onSuccess?.();
                    notification.success({message: '操作成功'});
                }
            }}
        >
            <BetaSchemaForm layoutType="Embed" columns={columns}/>
        </FormWrap>
    );
};

export default BuildEdit;
