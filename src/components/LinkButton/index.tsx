import React, {ReactNode} from "react";
import {Typography} from "antd";

type LinkButtonProps = {
    disabled?: boolean;

    type?: "secondary" | "success" | "warning" | "danger"

    onClick?: () => void;

    children?: string | ReactNode;
}

const {Text, Link} = Typography;
const Index: React.FC<LinkButtonProps> = (props) => {

    const {disabled = false, type, onClick, children} = props;

    console.log(disabled)
    if (disabled) {
        return <Text disabled>{children}</Text>
    }
    return (
        <Link onClick={onClick}>
            {type ? <Text type={type}>{children}</Text> : children}
        </Link>
    );
}
export default Index;