import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { useFlowStore } from '../store';

export const Controls: React.FC = () => {
  const { steps, currentStep, nextStep, previousStep, resetSteps } = useFlowStore();

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={previousStep}
          disabled={currentStep <= 0}
          className="p-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <span className="font-medium text-lg">
          Step {currentStep + 1} of {steps.length}
        </span>
        <button
          onClick={nextStep}
          disabled={currentStep >= steps.length - 1}
          className="p-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors"
        >
          <ArrowRight size={24} />
        </button>
        <button
          onClick={resetSteps}
          className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <RotateCcw size={24} />
        </button>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-700 whitespace-pre-line">
          {steps[currentStep]?.description || 'No description available'}
        </p>
      </div>
    </div>
  );
};