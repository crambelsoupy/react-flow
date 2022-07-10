import React, { memo } from "react";
import * as R from "ramda";
import { Connection, Handle, Position } from "react-flow-renderer";
import Node, { ContentHandleStyle, ContentHeaderStyle, ContentIOStyle, ContentLeftStyle, ContentRightStyle, ContentTextLeftStyle, ContentTextRightStyle, toSnakeCase } from "./Node";
import { ResourceStructure, ProcessStructure, PropertyStructure, EventStructure, Table } from "@elaraai/edk/lib";


interface ResourceNodeProps {
  data: {
    name: string,
    value: number,

    // real
    concept: string,
    properties: Record<string, PropertyStructure>,
    instance_table: Table

  },
  selected: boolean;
}
const ResourceNode: React.FC<ResourceNodeProps> = ({
  data,
  selected,
}: ResourceNodeProps) => {
  return (
    <Node
      label={data.concept}
      selected={selected}
      color={"#4A82F2"}
      content={
        <>
          <div style={ContentHeaderStyle}>{"Properties"}</div>
          {
            Object.entries(data.properties).map((property: [string, PropertyStructure]) => (
              <div
                key={toSnakeCase(property[0])}
                style={{ ...ContentIOStyle, ...ContentTextLeftStyle }}
              >
                {property[0]}
                <Handle
                  type="target"
                  position={Position.Left}
                  id={toSnakeCase(property[1].parent + "." + property[1].concept + '.input')}
                  style={{ ...ContentHandleStyle, ...ContentLeftStyle }}
                  isConnectable={false}
                />
                <Handle
                  type="source"
                  position={Position.Right}
                  id={toSnakeCase(property[1].parent + "." + property[1].concept + '.output')}
                  style={{ ...ContentHandleStyle, ...ContentRightStyle }}
                  isConnectable={false}
                />
              </div>
            ))
          }
        </>
      }
    />
  );
};

export default memo(ResourceNode);
