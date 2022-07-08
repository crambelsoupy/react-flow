
import React, { CSSProperties, memo } from "react";


export const ContentHeaderStyle: CSSProperties = {
    padding: "8px 0px",
    flexGrow: 1,
    backgroundColor: "#eee"
}

export const ContentIOStyle: CSSProperties = {
    position: "relative",
    padding: "8px 16px",
    flexGrow: 1
}

export const ContentLeftStyle: CSSProperties = {
    left: "-8px"
}

export const ContentHandleStyle: CSSProperties = {
    width: "10px", // Does not work
    height: "10px",
    margin: "auto",
    background: "#ddd",
    borderRadius: "15px",
    border: "2px solid #ddd",
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 1px 3px 0px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 2px 1px -1px"
}

export const ContentTextLeftStyle: CSSProperties = {
    textAlign: "left"
}

export const ContentRightStyle: CSSProperties = {
    right: "-8px"
}

export const ContentTextRightStyle: CSSProperties = {
    textAlign: "right"
}

const NodeBodyStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    border: "0px solid #bbb",
    fontSize: "10pt"
}

const NodeBodySelectedStyle: CSSProperties = {
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
}

const NodeBodyTitleStyle: CSSProperties = {
    position: "relative",
    padding: "8px 32px",
    flexGrow: 1,
    backgroundColor: "#eee"
}

const NodeBodyContentWrapperStyle: CSSProperties = {
    padding: "8px 0px"
}


interface NodeProps {
    label: string;
    selected: boolean;
    color?: string;
    content: React.ReactNode;
}
const Node: React.FC<NodeProps> = ({
    label,
    selected,
    color,
    content
}: NodeProps) => {
    // Collapse contentWrapper on icon click
    return (
        <div style={{ ...NodeBodyStyle, ...(selected && NodeBodySelectedStyle) }}>
            <div style={{ ...NodeBodyTitleStyle, ...(color && { backgroundColor: color }) }}>{label}</div>
            <div style={NodeBodyContentWrapperStyle}>{content}</div>
        </div>
    );
};

export default memo(Node);
