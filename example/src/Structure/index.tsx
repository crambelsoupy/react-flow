import { ELARASchema, EventStructure, FunctionPropertyStructure, ProcessStructure, PropertyStructure, Structure } from '@elaraai/edk/lib';
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
  ControlButton,
} from 'react-flow-renderer';
import schema from './schema.json'
import ProcessNode from './ProcessNode';
import ResourceNode from './ResourceNode';
// import StructureEdge from './StructureEdge';
import ELK, { ElkNode } from 'elkjs';
import { toSnakeCase } from './Node';
import { NodeBuilderFlags } from 'typescript';

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

const initialNodes: Node<Structure>[] = Object.entries(((schema as unknown as ELARASchema)?.structure ?? {}) as unknown as Record<string, Structure>)
  .filter((entry: [key: string, structure: Structure]) => entry[1].type === 'process' || entry[1].type === 'resource')
  .map((entry: [key: string, structure: Structure], index: number) => ({
    id: toSnakeCase(entry[1].concept),
    type: entry[1].type,
    data: entry[1],
    zIndex: 3,
    position: { x: 500 * index, y: 80 * index },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  }))

const initialEdges: Edge[] = [
  ...initialNodes
    .filter(node => node.type === 'process')
    .flatMap((node: Node<Structure>) => {
      let process = node.data as ProcessStructure;
      return Object.values(process?.properties ?? {})
        .filter((property: PropertyStructure) =>
          property.kind === 'function' &&
          (
            property.function.function === 'getproperty' ||
            property.function.function === 'getproperties'
          )
        )
        .map((property: PropertyStructure) => {
          let func = property as FunctionPropertyStructure;
          if (func.function.function === 'getproperty') {
            return {
              id: toSnakeCase(`${func.function.property_parent}.${func.function.property_concept}.output.${func.parent}.${func.concept}.input`),
              source: toSnakeCase(`${func.function.property_parent}`),
              target: toSnakeCase(`${func.parent}`),
              sourceHandle: toSnakeCase(`${func.function.property_parent}.${func.function.property_concept}.output`),
              targetHandle: toSnakeCase(`${func.parent}.${func.concept}.input`),
              sourcePosition: Position.Right,
              targetPosition: Position.Left,
              style: { stroke: '#DE8387', strokeWidth: 3 },
              animated: false
            }
          } else if (func.function.function === 'getproperties') {
            return {
              id: toSnakeCase(`${func.function.property_parent}.${func.function.property_concept}.output.${func.parent}.${func.concept}.input`),
              source: toSnakeCase(`${func.function.property_parent}`),
              target: toSnakeCase(`${func.parent}`),
              sourceHandle: toSnakeCase(`${func.function.property_parent}.${func.function.property_concept}.output`),
              targetHandle: toSnakeCase(`${func.parent}.${func.concept}.input`),
              sourcePosition: Position.Right,
              targetPosition: Position.Left,
              style: { stroke: '#DE8387', strokeWidth: 3 },
              animated: false
            }
          }
        }) as Edge[]
    }),
  ...initialNodes
    .filter(node => node.type === 'process')
    .flatMap((node: Node<Structure>) => {
      let process = node.data as ProcessStructure;
      return Object.values(process?.events ?? {})
        .map((event: EventStructure) => {
          return {
            id: toSnakeCase(`${event.process}.${event.event}.output.${event.property.parent}.${event.property.concept}.input`),
            source: toSnakeCase(`${event.process}`),
            target: toSnakeCase(`${event.property.parent}`),
            sourceHandle: toSnakeCase(`${event.process}.${event.event}.output`),
            targetHandle: toSnakeCase(`${event.property.parent}.${event.property.concept}.input`),
            label: event.event,
            markerEnd: MarkerType.ArrowClosed,
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: { stroke: '#4AD998', strokeWidth: 3 },
            animated: false
          }
        }) as Edge[]
    })
];

console.log({ initialNodes, initialEdges })

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

const getLayoutedElements = async (nodes: Node<Structure>[], edges: Edge<{ name: string }>[]) => {
  const elk = new ELK()
  // consolidate the edges to be between structure entities
  let layoutEdges: Map<string, { id: string,  sources: string[], targets: string[] }> = new Map()
  edges.forEach(edge => {
    let id = `${edge.source}.${edge.target}` 
    if(!layoutEdges.has(id)) {
      layoutEdges.set(id, { 
        id: id,
        sources: [edge.source],  
        targets: [edge.target] 
      })
    }
  })

  let layoutNodes: Map<string, Node<Structure>> = new Map()
  nodes.forEach(node => {
    if(!layoutNodes.has(node.id)) {
      layoutNodes.set(node.id, node)
    }
  })

  const graph: ElkNode = {
    id: "root",
    layoutOptions: { 'elk.algorithm': 'force' },
    children: Array.from(layoutNodes.values()).map(node => ({
      id: node.id,
      width: node.width ?? undefined,
      height: node.height ?? undefined,
    })),
    edges: Array.from(layoutEdges.values())
  }
  let layout = await elk.layout(graph)
  layout?.children?.forEach((layoutNode) => {
    const node = layoutNodes.get(layoutNode.id);
    if(node) {
      node.position = {
        x: (layoutNode?.x ?? 0) - (node?.width ?? 0) / 2,
        y: (layoutNode?.y ?? 0) - (node?.height ?? 0) / 2,
      }
      layoutNodes.set(layoutNode.id, node);
    }
  });
  return { 
    nodes: Array.from(layoutNodes.values()), 
    edges 
  };
};

const OverviewFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  console.log({ edges, nodes })
  const onConnect = (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds));
  const onLayout = useCallback(
    async () => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = await getLayoutedElements(
        nodes,
        edges,
      );

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );
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
      <Controls>
        <ControlButton onClick={() => onLayout()}>
          L
        </ControlButton>
      </Controls>
      <Background color="#aaa" gap={25} />
    </ReactFlow>
  );
};

export default OverviewFlow;
