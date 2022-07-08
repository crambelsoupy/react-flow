import React, { memo } from "react";
import * as R from "ramda";
import { Connection, Handle, Position } from "react-flow-renderer";
import Node, { ContentHandleStyle, ContentHeaderStyle, ContentIOStyle, ContentLeftStyle, ContentTextLeftStyle, ContentTextRightStyle } from "./Node";
import { ResourceStructure, ProcessStructure, PropertyStructure, EventStructure } from "@elaraai/edk/lib";

const isValidProperty = (connection: Connection, value: string) => {
  console.log('Process.isValidProperty', { connection, value, ret: connection.source ? connection.sourceHandle === value : false})
  return connection.source ? connection.sourceHandle === value : false;
}
const isValidEvent = (connection: Connection, value: string) => {
  console.log('Process.isValidEvent', { connection, value, ret: connection.target ? connection.targetHandle === value : false})
  return connection.source ? connection.sourceHandle === value : false;
}

interface ProcessNodeProps {
  data: {
    name: string,
    inputs: { label: string, type: string }[],
    outputs: { label: string, type: string }[],

    // real
    concept: string,
    properties: Record<string, PropertyStructure>
    events: Record<string, EventStructure>
  },
  selected: boolean;
}
const ProcessNode: React.FC<ProcessNodeProps> = ({
  data,
  selected,
}: ProcessNodeProps) => {
  return (
    <Node
      label={data.concept}
      selected={selected}
      color={"Lavender"}
      content={
        <>
          <div style={ContentHeaderStyle}>{"Properties"}</div>
          {
            Object.entries(data.properties).map((property: [string, PropertyStructure]) => (
              property[1].kind === 'function' &&
                (
                  property[1].function.function === 'getproperty' ||
                  property[1].function.function === 'getproperties'
                ) ?
                <div
                  key={property[0]}
                  style={{ ...ContentIOStyle, ...ContentTextLeftStyle }}
                >
                  {property[0]}
                  <Handle
                    type="target"
                    position={Position.Left}
                    id={property[1].parent + "." + property[1].concept}
                    style={{ ...ContentHandleStyle, ...ContentLeftStyle }}
                    isValidConnection={(connection: Connection) =>
                      isValidProperty(connection, property[1].parent + "." + property[1].concept)
                    }
                  />
                </div> :
                <div
                  key={property[0]}
                  style={{ ...ContentIOStyle, ...ContentTextLeftStyle }}
                >
                  {property[0]} ({property[1].kind === 'function' ? property[1].function.function : property[1].kind})
                </div>
            ))
          }
          <div style={ContentHeaderStyle}>{"Events"}</div>
          {
            Object.entries(data.events).map((property: [string, EventStructure]) => (
              <div
                key={"o-" + property[0]}
                style={{ ...ContentIOStyle, ...ContentTextRightStyle }}
              >
                {property[0]}
                <Handle
                  type="source"
                  position={Position.Right}
                  id={property[1].process + "." + property[1].event}
                  style={{ ...ContentHandleStyle, ...ContentTextRightStyle }}
                  isValidConnection={(connection: Connection) =>
                    isValidEvent(connection, property[1].process + "." + property[1].event)
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

export default memo(ProcessNode);
