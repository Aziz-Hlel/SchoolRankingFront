
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: Array<{ title: string; description: string }>;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep, 
  totalSteps, 
  steps 
}) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>Step {currentStep + 1} of {totalSteps}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <Progress value={progress} className="h-2 mb-4" />
      <h3 className="text-lg font-semibold mb-2">{steps[currentStep].title}</h3>
      <p className="text-muted-foreground">{steps[currentStep].description}</p>
    </div>
  );
};
