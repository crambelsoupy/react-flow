import React, { memo } from "react";
import * as R from "ramda";
import { Connection, Handle, Position } from "react-flow-renderer";
import Node, { ContentHandleStyle, ContentHeaderStyle, ContentIOStyle, ContentLeftStyle, ContentRightStyle, ContentTextLeftStyle, ContentTextRightStyle, toSnakeCase } from "./Node";
import { ResourceStructure, ProcessStructure, PropertyStructure, EventStructure } from "@elaraai/edk/lib";

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
      color={"#F7DD20"}
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
                  key={toSnakeCase(property[0])}
                  style={{ ...ContentIOStyle, ...ContentTextLeftStyle }}
                >
                  {property[0]}
                  <Handle
                    type="target"
                    isConnectable={false}
                    position={Position.Left}
                    id={toSnakeCase(property[1].parent + "." + property[1].concept + '.input')}
                    style={{ ...ContentHandleStyle, ...ContentLeftStyle }}
                  />
                  <Handle
                    type="source"
                    isConnectable={false}
                    position={Position.Right}
                    id={toSnakeCase(property[1].parent + "." + property[1].concept + '.output')}
                    style={{ ...ContentHandleStyle, ...ContentRightStyle }}
                  />
                </div> :
                <div
                  key={property[0]}
                  style={{ ...ContentIOStyle, ...ContentTextLeftStyle }}
                >
                  {property[0]} ({property[1].kind === 'function' ? property[1].function.function : property[1].kind})
                  <Handle
                    type="source"
                    isConnectable={false}
                    position={Position.Right}
                    id={toSnakeCase(property[1].parent + "." + property[1].concept + '.output')}
                    style={{ ...ContentHandleStyle, ...ContentRightStyle }}
                  />
                </div>
            ))
          }
          <div style={ContentHeaderStyle}>{"Events"}</div>
          {
            Object.entries(data.events).map((event: [string, EventStructure]) => (
              <div
                key={toSnakeCase(event[0])}
                style={{ ...ContentIOStyle, ...ContentTextRightStyle }}
              >
                {event[0]}
                <Handle
                  type="source"
                  isConnectable={false}
                  position={Position.Right}
                  id={toSnakeCase(event[1].process + "." + event[1].event + '.output')}
                  style={{ ...ContentHandleStyle, ...ContentRightStyle }}
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
