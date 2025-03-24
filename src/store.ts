import { create } from 'zustand';
import { Edge, Step } from './types';

interface FlowState {
  steps: Step[];
  currentStep: number;
  setSteps: (steps: Step[]) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetSteps: () => void;
}

export const useFlowStore = create<FlowState>((set) => ({
  steps: [],
  currentStep: -1,
  setSteps: (steps) => set({ steps, currentStep: 0 }),
  nextStep: () => set((state) => ({
    currentStep: Math.min(state.currentStep + 1, state.steps.length - 1)
  })),
  previousStep: () => set((state) => ({
    currentStep: Math.max(state.currentStep - 1, 0)
  })),
  resetSteps: () => set({ currentStep: 0 })
}));