import React, { CSSProperties, memo, ReactNode } from 'react';
import { EdgeMarkerType, EdgeProps, getBezierPath, getMarkerEnd, getSmoothStepPath, MarkerType, WrapEdgeProps } from 'react-flow-renderer';

export default function StructureEdge({
    id,
    data,
    selected,
    animated,
    label,
    labelStyle,
    labelShowBg,
    labelBgStyle,
    labelBgPadding,
    labelBgBorderRadius,
    style,
    source,
    target,
    sourceHandleId,
    targetHandleId,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    markerStart,
    markerEnd,
}: EdgeProps<{ name: string }>) {
    // Collapse contentWrapper on icon click
    const edgePath = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
                markerStart={markerStart}
            />
            {/* <text>
                <textPath
                    href={`#${id}`}
                    style={{ fontSize: '12px' }}
                    startOffset="50%"
                    textAnchor="middle"
                >
                    {data?.name ?? "Unknown"}
                </textPath>
            </text> */}
        </>
    );
};

// export default memo(StructureEdge);

