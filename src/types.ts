export interface Edge {
  source: number;
  target: number;
  capacity: number;
  cost: number;
  flow: number;
}

export interface Step {
  description: string;
  edges: Edge[];
  currentNode?: number;
  path?: number[];
}