
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StepIndicator } from './StepIndicator';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  steps: Array<{ title: string; description: string }>;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  currentStep,
  totalSteps,
  steps
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="px-4 lg:px-6">
          <CardTitle className="text-xl lg:text-2xl font-bold text-primary">School Registration</CardTitle>
          <CardDescription className="text-sm lg:text-base">
            Complete your school registration to access the dashboard
          </CardDescription>
          <div className="mt-4">
            <StepIndicator 
              currentStep={currentStep} 
              totalSteps={totalSteps} 
              steps={steps} 
            />
          </div>
        </CardHeader>
        <CardContent className="px-4 lg:px-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};
