import FormWrap, {FormWrapProps} from "@/components/FormWrap";
import {request} from "@/utils/Request";
import {BetaSchemaForm} from "@ant-design/pro-components";
import useAlert from "@/components/useAlert";

type PositionEditProps<T> = {

    positionId?: number;

} & FormWrapProps<T>;
const PositionEdit: React.FC<PositionEditProps<any>> = (props) => {

    const {positionId, open, onClose, onSuccess} = props;

    const {error, notification} = useAlert();
    const columns = [
        {
            title: '职位名称', dataIndex: 'name'
        },
        {
            title: '职位编码', dataIndex: 'code'
        },
        {
            title: '备注', dataIndex: 'remark'
        },
    ];
    return (
        <FormWrap
            width={600}
            params={{positionId}}
            open={open}
            onClose={onClose}
            grid
            request={async () => {
                if (positionId === 0) {
                    return {
                        systemFlag: "Y",
                        status: "ENABLE"
                    }
                } else {
                    const {data} = await request("/rest/position/detail", {
                        data: {
                            positionId
                        }
                    })
                    return data;
                }

            }}
            onFinish={async (values) => {
                let response
                if (positionId === 0) {
                    response = await request("/rest/position/addItem", {
                        data: values
                    });

                } else {
                    values.positionId = positionId;
                    response = await request("/rest/position/editItem", {
                        data: values
                    })
                }
                if (response.errCode !== 0) {
                    error(response.message);
                } else {
                    onSuccess?.(positionId === 0);
                    notification.success({message: '操作成功'});
                }
            }}
        >
            <BetaSchemaForm columns={columns} layoutType={"Embed"}/>

        </FormWrap>
    );
}
export default PositionEdit;