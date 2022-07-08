import React, { memo } from "react";
import * as R from "ramda";
import { Connection, Handle, Position } from "react-flow-renderer";
import Node, { ContentHandleStyle, ContentHeaderStyle, ContentIOStyle, ContentLeftStyle, ContentTextLeftStyle, ContentTextRightStyle } from "./Node";

const isValidInput = (connection: Connection) => connection.source ? R.last(R.split("__", connection.source)) === "value" : false;
const isValidOutput = (connection: Connection) => connection.target ? R.last(R.split("__", connection.target)) === "value" : false;

interface ResourceNodeProps {
    data: {
      name: string,
      value: number,
    },
    selected: boolean;
}
const ResourceNode: React.FC<ResourceNodeProps> = ({
    data,
    selected,
}: ResourceNodeProps) => {
  return (
    <Node
      label={data.name}
      selected={selected}
      color={"Lavender"}
      content={
        <div style={ContentIOStyle}>
          {"= " + data.value}
          <Handle
            type="target"
            position={Position.Left}
            id="i__value"
            style={{ ...ContentHandleStyle, ...ContentLeftStyle }}
            isValidConnection={isValidInput}
          />
          <Handle
            type="source"
            position={Position.Right}
            id="o__value"
            style={{ ...ContentHandleStyle, ...ContentTextRightStyle }}
            isValidConnection={isValidOutput}
          />
        </div>
      }
    />
  );
};

export default memo(ResourceNode);
