import {BetaSchemaForm, PageContainer, ProCard, ProForm, ProFormColumnsType} from "@ant-design/pro-components";
import useGenField from "@/pages/BASE_SYSTEM/dev_tools/gen/schema";
import {Col, Row, Space} from "antd";
import {baseURI} from "@/utils/Service";
import {execute} from "@/pages/BASE_SYSTEM/dev_tools/gen/service";
import qs from "qs";
import cookie from "js-cookie";

const GenCode = () => {

    const {
        author,
        proPackage,
        removePrefix,
        version,
        dataSourceId,
        genLocation,
        tables,
    } = useGenField();

    const columns: ProFormColumnsType[] = [
        author,
        proPackage,
        removePrefix,
        version,
        genLocation,
        dataSourceId,
        {
            valueType: "dependency",
            name: ["dataSourceId"],
            columns: ({dataSourceId}) => {
                if (dataSourceId) {
                    return [tables]
                }
                return [];
            }
        }

    ]
    return (
        <PageContainer>
            <ProCard style={{maxWidth: 960}}>
                <ProForm
                    labelCol={{
                        span: 4
                    }}
                    initialValues={{
                        proPackage:"cn.atsoft.dasheng.app",
                        genLocation:"DEFAULT_PATH"
                    }}
                    layout="horizontal"
                    submitter={{
                        render: (props, doms) => {
                            return (
                                <Row>
                                    <Col span={14} offset={4}>
                                        <Space>{doms}</Space>
                                    </Col>
                                </Row>
                            );
                        }
                    }}
                    onFinish={async (values)=>{
                        // console.log(values)
                        const token = cookie.get('Authorization');
                        values.tables = [
                            '',
                            ...values.tables
                        ]
                        values.tables = values.tables.join('CAT');
                        window.open(`${baseURI}${execute.url}?${qs.stringify(values)}&authorization=${token}`);
                    }}
                >
                    <BetaSchemaForm layoutType="Embed" columns={columns}/>
                </ProForm>
            </ProCard>
        </PageContainer>
    );
}

export default GenCode;