
import React from 'react';
import { Button } from '@/components/ui/button';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSubmit,
  isSubmitting = false
}) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex justify-between pt-6">
      <div>
        {!isFirstStep && (
          <Button type="button" variant="outline" onClick={onPrevious}>
            Previous
          </Button>
        )}
      </div>
      <div>
        {isLastStep ? (
          <Button onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Completing...' : 'Complete Registration'}
          </Button>
        ) : (
          <Button onClick={onNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};
