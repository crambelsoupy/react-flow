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
  EdgeChange,
} from 'react-flow-renderer';
import { Process, Resource } from './Data';
import ProcessNode from './ProcessNode';
import ResourceNode from './ResourceNode';

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
const onInit = (reactFlowInstance: ReactFlowInstance) => console.log('pane ready:', reactFlowInstance);

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
    position: { x: 500, y: 80 }
  },
  {
    id: Resource.concept,
    type: "resource",
    data: Resource,
    position: { x: 700, y: 180 },
  },
];

const initialEdges: Edge[] = [
  { id: "cash.balance_sales.cash_balance", source: "cash.balance", target: "sales.cash_balance", animated: false },
  { id: "sales.increment_cash_cash.balance", source: "sales.increment_cash", target: "cash.balance", animated: false }
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

const OverviewFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
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
