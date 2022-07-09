import React, { memo } from "react";
import * as R from "ramda";
import { Connection, Handle, Position } from "react-flow-renderer";
import Node, { ContentHandleStyle, ContentHeaderStyle, ContentIOStyle, ContentLeftStyle, ContentRightStyle, ContentTextLeftStyle, ContentTextRightStyle } from "./Node";
import { ResourceStructure, ProcessStructure, PropertyStructure, EventStructure, Table } from "@elaraai/edk/lib";

const isValidEvent = (connection: Connection, value: string) => {
  console.log('Resource.isValidEvent', { connection, value})
  return connection.targetHandle ? connection.targetHandle === value : false
};

const isValidGetProperty = (connection: Connection, value: string) => {
  console.log('Resource.isValidGetProperty', { connection, value})
  return connection.sourceHandle ? connection.sourceHandle === value : false
};

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
      color={"#E0FFE0"}
      content={
        <>
          <div style={ContentHeaderStyle}>{"Properties"}</div>
          {
            Object.entries(data.properties).map((property: [string, PropertyStructure]) => (
              <div
                key={property[0]}
                style={{ ...ContentIOStyle, ...ContentTextLeftStyle }}
              >
                {property[0]}
                <Handle
                  type="target"
                  position={Position.Left}
                  id={property[1].parent + "." + property[1].concept + '.event'}
                  style={{ ...ContentHandleStyle, ...ContentLeftStyle }}
                  isConnectable={false}
                  isValidConnection={(connection: Connection) =>
                    isValidEvent(connection, property[1].parent + "." + property[1].concept + '.event')
                  }
                />
                <Handle
                  type="source"
                  position={Position.Right}
                  id={property[1].parent + "." + property[1].concept + '.property'}
                  style={{ ...ContentHandleStyle, ...ContentRightStyle }}
                  isConnectable={false}
                  isValidConnection={(connection: Connection) =>
                    isValidGetProperty(connection, property[1].parent + "." + property[1].concept + '.property')
                  }
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
