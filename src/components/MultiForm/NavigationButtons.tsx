import type { FC } from 'react';
import { Button } from '../ui/button';


interface NavigationButtonsProps {
    currentStep: number;
    onNext: () => void;
    onPrevious: () => void;
    onSubmit: () => void;
    isSubmitting?: boolean;
}

const NavigationButtons: FC<NavigationButtonsProps> = ({ currentStep, onNext, onPrevious, onSubmit, isSubmitting = false }) => {

    const totalSteps = 4;
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === totalSteps - 1;

    return (
        <div className="flex justify-end pt-6">
            {/* <div>
                {!isFirstStep && (
                    <Button type="button" variant="outline" onClick={onPrevious}>
                        Previous
                    </Button>
                )}
            </div> */}
            <div>
                {isLastStep ? (
                    <Button onClick={onSubmit} disabled={isSubmitting}>
                        {isSubmitting ? 'Completing...' : 'Complete Registration'}
                    </Button>
                ) : (
                    <Button onClick={onNext} type='submit' disabled={isSubmitting} className=' cursor-pointer '>
                        Next
                    </Button>
                )}
            </div>
        </div>
    );


}

export default NavigationButtons