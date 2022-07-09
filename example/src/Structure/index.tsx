import { EventStructure, FunctionPropertyStructure, ProcessStructure, PropertyStructure } from '@elaraai/edk/lib';
import { MouseEvent as ReactMouseEvent, CSSProperties, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  Node,
  Viewport,
  SnapGrid,
  Connection,
  Edge,
  ReactFlowInstance,
  useNodesState,
  useEdgesState,
  OnSelectionChangeParams,
  MarkerType,
  Position,
} from 'react-flow-renderer';
import { Process, Resource } from './Data';
import ProcessNode from './ProcessNode';
import ResourceNode from './ResourceNode';
import StructureEdge from './StructureEdge';

const onNodeDragStart = (_: ReactMouseEvent, node: Node, nodes: Node[]) => console.log('drag start', node, nodes);
const onNodeDrag = (_: ReactMouseEvent, node: Node, nodes: Node[]) => console.log('drag', node, nodes);
const onNodeDragStop = (_: ReactMouseEvent, node: Node, nodes: Node[]) => console.log('drag stop', node, nodes);
const onNodeDoubleClick = (_: ReactMouseEvent, node: Node) => console.log('node double click', node);
const onPaneClick = (event: ReactMouseEvent) => console.log('pane click', event);
const onPaneScroll = (event?: ReactMouseEvent) => console.log('pane scroll', event);
const onPaneContextMenu = (event: ReactMouseEvent) => console.log('pane context menu', event);
const onSelectionDrag = (_: ReactMouseEvent, nodes: Node[]) => console.log('selection drag', nodes);
const onSelectionDragStart = (_: ReactMouseEvent, nodes: Node[]) => console.log('selection drag start', nodes);
const onSelectionDragStop = (_: ReactMouseEvent, nodes: Node[]) => console.log('selection drag stop', nodes);
const onSelectionContextMenu = (event: ReactMouseEvent, nodes: Node[]) => {
  event.preventDefault();
  console.log('selection context menu', nodes);
};
const onNodeClick = (_: ReactMouseEvent, node: Node) => console.log('node click:', node);
const onSelectionChange = ({ nodes, edges }: OnSelectionChangeParams) => console.log('selection change', nodes, edges);
const onInit = (reactFlowInstance: ReactFlowInstance) => console.log('onInit:', reactFlowInstance);

const onMoveStart = (_: MouseEvent | TouchEvent, viewport: Viewport) => console.log('zoom/move start', viewport);
const onMoveEnd = (_: MouseEvent | TouchEvent, viewport: Viewport) => console.log('zoom/move end', viewport);
const onEdgeContextMenu = (_: ReactMouseEvent, edge: Edge) => console.log('edge context menu', edge);
const onEdgeMouseEnter = (_: ReactMouseEvent, edge: Edge) => console.log('edge mouse enter', edge);
const onEdgeMouseMove = (_: ReactMouseEvent, edge: Edge) => console.log('edge mouse move', edge);
const onEdgeMouseLeave = (_: ReactMouseEvent, edge: Edge) => console.log('edge mouse leave', edge);
const onEdgeDoubleClick = (_: ReactMouseEvent, edge: Edge) => console.log('edge double click', edge);
const onNodesDelete = (nodes: Node[]) => console.log('nodes delete', nodes);
const onEdgesDelete = (edges: Edge[]) => console.log('edges delete', edges);

const initialNodes: Node[] = [
  {
    id: Process.concept,
    type: "process",
    data: Process,
    position: { x: 500, y: 80 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: Resource.concept,
    type: "resource",
    data: Resource,
    position: { x: 700, y: 180 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
];

let getPropertyEdges = initialNodes
  .filter(node => node.type === 'process')
  .flatMap((node: Node<ProcessStructure>) =>
    Object.values(node?.data?.properties)
      .filter((property: PropertyStructure) =>
        property.kind === 'function' &&
        (
          property.function.function === 'getproperty' ||
          property.function.function === 'getproperties'
        )
      )
      .map((property: PropertyStructure) => {
        let funcProperty = property as FunctionPropertyStructure;
        let func = funcProperty.function
        if (func.function === 'getproperty') {
          return {
            id: `${func.property_parent}.${func.property_concept}.${funcProperty.parent}.${funcProperty.concept}`,
            source: `${func.property_parent}`,
            target: `${funcProperty.parent}`,
            sourceHandle: `${func.property_parent}.${func.property_concept}.property`,
            targetHandle: `${funcProperty.parent}.${funcProperty.concept}`,
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            markerEnd: MarkerType.ArrowClosed,
            type: 'custom',
            animated: false
          }
        } else if (func.function === 'getproperties') {
          return {
            id: `${func.property_parent}.${func.property_concept}.${funcProperty.parent}.${funcProperty.concept}`,
            source: `${func.property_parent}`,
            target: `${funcProperty.parent}`,
            sourceHandle: `${func.property_parent}.${func.property_concept}`,
            targetHandle: `${funcProperty.parent}.${funcProperty.concept}`,
            markerEnd: MarkerType.ArrowClosed,
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            type: 'custom',
            animated: false
          }
        }
      }) as Edge<{ name: string }>[]
  )

let eventEdges = initialNodes
  .filter(node => node.type === 'process')
  .flatMap((node: Node<ProcessStructure>) =>
    Object.values(node?.data?.events)
      .map((event: EventStructure) => {
        return {
          id: `${event.process}.${event.event}.${event.property.parent}.${event.property.concept}`,
          source: `${event.process}`,
          target: `${event.property.parent}`,
          sourceHandle: `${event.process}.${event.event}`,
          targetHandle: `${event.property.parent}.${event.property.concept}.event`,
          type: 'custom',
          markerEnd: MarkerType.ArrowClosed,
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
          animated: false
        }
      }) as Edge<{ name: string }>[]
  )

const initialEdges: Edge[] = [
  ...getPropertyEdges,
  ...eventEdges
];

const connectionLineStyle: CSSProperties = { stroke: '#ddd' };
const snapGrid: SnapGrid = [25, 25];

const nodeStrokeColor = (n: Node): string => {
  if (n.style?.background) return n.style.background as string;
  if (n.type === 'input') return '#0041d0';
  if (n.type === 'output') return '#ff0072';
  if (n.type === 'default') return '#1a192b';

  return '#eee';
};

const nodeTypes = {
  process: ProcessNode,
  resource: ResourceNode
};

const edgeTypes = {
  custom: StructureEdge,
};

const OverviewFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  // console.log({ edges, setEdges })
  const onConnect = (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds));


  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      onConnect={onConnect}
      onPaneClick={onPaneClick}
      onPaneScroll={onPaneScroll}
      onPaneContextMenu={onPaneContextMenu}
      onNodeDragStart={onNodeDragStart}
      onNodeDrag={onNodeDrag}
      onNodeDragStop={onNodeDragStop}
      onNodeDoubleClick={onNodeDoubleClick}
      onSelectionDragStart={onSelectionDragStart}
      onSelectionDrag={onSelectionDrag}
      onSelectionDragStop={onSelectionDragStop}
      onSelectionContextMenu={onSelectionContextMenu}
      onSelectionChange={onSelectionChange}
      onMoveStart={onMoveStart}
      onMoveEnd={onMoveEnd}
      onInit={onInit}
      connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      snapGrid={snapGrid}
      onEdgeContextMenu={onEdgeContextMenu}
      onEdgeMouseEnter={onEdgeMouseEnter}
      onEdgeMouseMove={onEdgeMouseMove}
      onEdgeMouseLeave={onEdgeMouseLeave}
      onEdgeDoubleClick={onEdgeDoubleClick}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      attributionPosition="top-right"
      maxZoom={Infinity}
      onNodesDelete={onNodesDelete}
      onEdgesDelete={onEdgesDelete}
    >
      <MiniMap
        nodeStrokeColor={nodeStrokeColor}
        nodeColor={(node) => {
          switch (node.type) {
            case "resource":
              return "LightGreen";
            case "process":
              return "Lavender";
            default:
              return "#eee";
          }
        }}
        nodeBorderRadius={2}
      />
      <Controls />
      <Background color="#aaa" gap={25} />
    </ReactFlow>
  );
};

export default OverviewFlow;
