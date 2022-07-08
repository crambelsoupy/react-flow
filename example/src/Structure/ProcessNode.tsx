import React, { memo } from "react";
import * as R from "ramda";
import { Connection, Handle, Position } from "react-flow-renderer";
import Node, { ContentHandleStyle, ContentHeaderStyle, ContentIOStyle, ContentLeftStyle, ContentTextLeftStyle, ContentTextRightStyle } from "./Node";

const isValidInput = (connection: Connection, type: string) => connection.source ? R.last(R.split("__", connection.source)) === type : false;
const isValidOutput = (connection: Connection, type: string) => connection.target ? R.last(R.split("__", connection.target)) === type : false;

interface ProcessNodeProps {
    data: {
      name: string,
      inputs: { label: string, type: string }[],
      outputs:  { label: string, type: string }[],
    },
    selected: boolean;
}
const ProcessNode: React.FC<ProcessNodeProps> = ({
    data,
    selected,
}: ProcessNodeProps) => {
  return (
    <Node
      label={data.name}
      selected={selected}
      color={"Lavender"}
      content={
        <>
          <div style={ContentHeaderStyle}>{"Inputs"}</div>
          {data.inputs.map((input: { label: string, type: string }) => (
            <div
              key={"i-" + input.label}
              style={{ ...ContentIOStyle, ...ContentTextLeftStyle }}
            >
              {input.label}
              <Handle
                type="target"
                position={Position.Left}
                id={"i-" + input.label + "__" + input.type}
                style={{ ...ContentHandleStyle, ...ContentLeftStyle }}
                isValidConnection={(connection: Connection) =>
                  isValidInput(connection, input.type)
                }
              />
            </div>
          ))}
          <div style={ContentHeaderStyle}>{"Outputs"}</div>
          {data.outputs.map((output: { label: string, type: string }) => (
            <div
              key={"o-" + output.label}
              style={{ ...ContentIOStyle, ...ContentTextRightStyle }}
            >
              {output.label}
              <Handle
                type="source"
                position= {Position.Right}
                id={"o-" + output.label + "__" + output.type}
                style={{ ...ContentHandleStyle, ...ContentTextRightStyle }}
                isValidConnection={(connection: Connection) =>
                  isValidOutput(connection, output.type)
                }
              />
            </div>
          ))}
        </>
      }
    />
  );
};

export default memo(ProcessNode);
