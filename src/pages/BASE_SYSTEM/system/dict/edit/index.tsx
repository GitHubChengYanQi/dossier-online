import FormWrap, {FormWrapProps} from "@/components/FormWrap";
import useDictField from "@/pages/BASE_SYSTEM/system/dict/schema";
import {useParams} from "@@/exports";
import {ColumnsType} from "@/types/common";
import {BetaSchemaForm} from "@ant-design/pro-components";
import {request} from "@/utils/Request";
import useAlert from "@/components/useAlert";

type DictEditProps<T> = {
    dictId?: number;
} & FormWrapProps<T>;
const DictEdit: React.FC<DictEditProps<any>> = (props) => {
    const {dictId, open, onClose, onSuccess} = props;
    const {dictType, name, code, status, description, sort} = useDictField();

    const {type: dictTypeId} = useParams();
    const {error, notification} = useAlert();

    const columns: ColumnsType[] = [
        dictType,
        name,
        code,
        {
            ...dictType,
            title: "上级字典筛选",
            dataIndex: "dictType",
            formItemProps: {
                wrapperCol: {
                    span: 12
                }
            }
        },
        {
            title: "上级字典",
            valueType: "dependency",
            name: ["dictType"],
            columns: ({dictType}) => {
                console.log(dictType)
                return [{
                    title: "上级字典",
                    dataIndex: "parentId",
                    valueType: "select",
                    formItemProps: {
                        rules: [
                            {
                                required: true, message: "上级字典为必选项"
                            }
                        ],
                        wrapperCol: {
                            span: 12
                        }
                    },
                    params: {
                        dictTypeId: dictType
                    },
                    request: async (params) => {
                        if (!params.dictTypeId) {
                            return [
                                {
                                    label: "无上级",
                                    value: 0,
                                }
                            ]
                        }
                        const {data} = await request("/rest/dict/listDicts", {
                            params
                        })
                        console.log(data)
                        return [
                            {
                                label: "无上级",
                                value: 0,
                            },
                            ...data.map((item: any) => {
                                return {
                                    label: item.name,
                                    value: item.dictId,
                                }
                            })
                        ];
                    }
                },];
            }
        },
        status,
        description,
        sort
    ];
    return (
        <FormWrap
            width={640}
            params={{dictTypeId}}
            open={open}
            onClose={onClose}
            grid
            request={async () => {
                console.log(dictId)
                if (dictId === 0) {
                    return {
                        status: "ENABLE",
                        dictTypeId
                    }
                } else {
                    const {data} = await request("/rest/dict/detail", {
                        params: {
                            dictId
                        }
                    })
                    return data;
                }

            }}
            onFinish={async (values) => {
                let response
                if (dictId === 0) {
                    response = await request("/rest/dict/addItem", {
                        data: values
                    });

                } else {
                    values.dictId = dictId;
                    response = await request("/rest/dict/editItem", {
                        data: values
                    })
                }
                if (response.errCode !== 0) {
                    error(response.message);
                } else {
                    onSuccess?.(dictId === 0);
                    notification.success({message: '操作成功'});
                }
            }}
        >
            <BetaSchemaForm columns={columns} layoutType={"Embed"}/>
        </FormWrap>
    );
}
export default DictEdit;