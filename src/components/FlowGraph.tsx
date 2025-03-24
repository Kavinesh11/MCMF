import React from 'react';
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge as FlowEdge,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useFlowStore } from '../store';

const nodePositions: { [key: number]: { x: number; y: number } } = {
  0: { x: 0, y: 150 },
  1: { x: 200, y: 0 },
  2: { x: 200, y: 300 },
  3: { x: 400, y: 0 },
  4: { x: 400, y: 300 },
  5: { x: 600, y: 150 },
};

export const FlowGraph: React.FC = () => {
  const { steps, currentStep } = useFlowStore();
  const currentStepData = steps[currentStep];

  const nodes: Node[] = Object.entries(nodePositions).map(([id, pos]) => ({
    id: id,
    position: pos,
    data: { label: `Node ${id}` },
    style: {
      background: currentStepData?.currentNode === parseInt(id) ? '#fde68a' : '#fff',
      border: '1px solid #000',
      borderRadius: '50%',
      padding: '10px',
      width: 60,
      height: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  }));

  const edges: FlowEdge[] = currentStepData?.edges.map((edge) => {
    const isInPath = currentStepData?.path?.includes(edge.source) &&
                    currentStepData?.path?.includes(edge.target) &&
                    currentStepData?.path?.indexOf(edge.source) === 
                    currentStepData?.path?.indexOf(edge.target) - 1;

    return {
      id: `${edge.source}-${edge.target}`,
      source: edge.source.toString(),
      target: edge.target.toString(),
      label: `Flow: ${edge.flow}/${edge.capacity}\nCost: ${edge.cost}`,
      labelStyle: { fill: '#666', fontWeight: 'bold' },
      style: {
        stroke: isInPath ? '#f59e0b' : edge.flow > 0 ? '#3b82f6' : '#000',
        strokeWidth: edge.flow > 0 ? 3 : 1,
      },
      animated: isInPath,
    };
  }) || [];

  return (
    <div className="h-[600px] w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};