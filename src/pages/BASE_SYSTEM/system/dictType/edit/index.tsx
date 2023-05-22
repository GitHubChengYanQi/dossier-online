import FormWrap, {FormWrapProps} from "@/components/FormWrap";
import {request} from "@/utils/Request";
import {BetaSchemaForm} from "@ant-design/pro-components";
import useDictTypeField from "@/pages/BASE_SYSTEM/system/dictType/schema";
import useAlert from "@/components/useAlert";

type DictEditProps<T> = {
    dictTypeId?: number;
} & FormWrapProps<T>;

const DictTypeEdit: React.FC<DictEditProps<any>> = (props) => {

    const {dictTypeId, open, onClose, onSuccess} = props;

    const {
        simpleName,
        code,
        systemFlag,
        description,
        status,sort
    } = useDictTypeField();

    const {error, notification} = useAlert();

    const columns = [
        simpleName,
        code,
        systemFlag,
        description,
        status,
        sort
    ];

    return (
        <FormWrap
            width={600}
            params={{dictTypeId}}
            open={open}
            onClose={onClose}
            grid
            request={async () => {
                if (dictTypeId === 0) {
                    return {
                        systemFlag: "Y",
                        status: "ENABLE"
                    }
                } else {
                    const {data} = await request("/rest/dictType/detail", {
                        params: {
                            dictTypeId
                        }
                    })
                    return data;
                }

            }}
            onFinish={async (values) => {
                let response
                if (dictTypeId === 0) {
                    response = await request("/rest/dictType/addItem", {
                        data: values
                    });

                } else {
                    values.dictTypeId = dictTypeId;
                    response = await request("/rest/dictType/editItem", {
                        data: values
                    })
                }
                if (response.errCode !== 0) {
                    error(response.message);
                } else {
                    onSuccess?.(dictTypeId === 0);
                    notification.success({message: '操作成功'});
                }
            }}
        >
            <BetaSchemaForm columns={columns} layoutType={"Embed"}/>
        </FormWrap>
    );
}
export default DictTypeEdit;