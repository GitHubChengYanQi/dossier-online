import React from "react";

interface TableOptionsWrapProps {
    children: React.ReactNode,
    justifyContent?:"flex-start"|"flex-end"
}

const TableOptionsWrap: React.FC<TableOptionsWrapProps> = (props) => {
    const {children,justifyContent="flex-end"} = props;
    return <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent,
        gap: 8
    }}>
        {children}
    </div>
}
export default TableOptionsWrap;