import React, { useEffect } from 'react';
import { FlowGraph } from './components/FlowGraph';
import { Controls } from './components/Controls';
import { useFlowStore } from './store';
import { Edge, Step } from './types';

const initialEdges: Edge[] = [
  { source: 0, target: 1, capacity: 10, cost: 2, flow: 0 },
  { source: 0, target: 2, capacity: 5, cost: 3, flow: 0 },
  { source: 1, target: 2, capacity: 15, cost: 1, flow: 0 },
  { source: 1, target: 3, capacity: 10, cost: 2, flow: 0 },
  { source: 2, target: 4, capacity: 10, cost: 4, flow: 0 },
  { source: 3, target: 5, capacity: 10, cost: 2, flow: 0 },
  { source: 4, target: 5, capacity: 10, cost: 3, flow: 0 },
];

const algorithmSteps: Step[] = [
  {
    description: 'Initial network state with no flow',
    edges: initialEdges,
  },
  {
    description: 'Finding first path: 0 -> 1 -> 3 -> 5 (Lower cost path)',
    edges: initialEdges,
    currentNode: 0,
    path: [0, 1, 3, 5],
  },
  {
    description: 'Augmenting flow along first path (0 -> 1 -> 3 -> 5) with 10 units',
    edges: initialEdges.map(edge => ({
      ...edge,
      flow: (edge.source === 0 && edge.target === 1) ||
            (edge.source === 1 && edge.target === 3) ||
            (edge.source === 3 && edge.target === 5) ? 10 : 0
    })),
    path: [0, 1, 3, 5],
  },
  {
    description: 'Finding second path: 0 -> 2 -> 4 -> 5',
    edges: initialEdges.map(edge => ({
      ...edge,
      flow: (edge.source === 0 && edge.target === 1) ||
            (edge.source === 1 && edge.target === 3) ||
            (edge.source === 3 && edge.target === 5) ? 10 : 0
    })),
    currentNode: 0,
    path: [0, 2, 4, 5],
  },
  {
    description: 'Augmenting flow along second path (0 -> 2 -> 4 -> 5) with 5 units',
    edges: initialEdges.map(edge => {
      if ((edge.source === 0 && edge.target === 1) ||
          (edge.source === 1 && edge.target === 3) ||
          (edge.source === 3 && edge.target === 5)) {
        return { ...edge, flow: 10 };
      }
      if ((edge.source === 0 && edge.target === 2) ||
          (edge.source === 2 && edge.target === 4) ||
          (edge.source === 4 && edge.target === 5)) {
        return { ...edge, flow: 5 };
      }
      return { ...edge, flow: 0 };
    }),
    path: [0, 2, 4, 5],
  },
  {
    description: 'Final state: Maximum flow achieved with two paths\n1. Path 1: 0 -> 1 -> 3 -> 5 (Flow: 10)\n2. Path 2: 0 -> 2 -> 4 -> 5 (Flow: 5)',
    edges: initialEdges.map(edge => {
      if ((edge.source === 0 && edge.target === 1) ||
          (edge.source === 1 && edge.target === 3) ||
          (edge.source === 3 && edge.target === 5)) {
        return { ...edge, flow: 10 };
      }
      if ((edge.source === 0 && edge.target === 2) ||
          (edge.source === 2 && edge.target === 4) ||
          (edge.source === 4 && edge.target === 5)) {
        return { ...edge, flow: 5 };
      }
      return { ...edge, flow: 0 };
    }),
  },
];

function App() {
  const setSteps = useFlowStore(state => state.setSteps);

  useEffect(() => {
    setSteps(algorithmSteps);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Bellman-Ford and Edmonds-Karp Algorithm Visualization
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <FlowGraph />
        </div>
        <Controls />
      </div>
    </div>
  );
}

export default App;