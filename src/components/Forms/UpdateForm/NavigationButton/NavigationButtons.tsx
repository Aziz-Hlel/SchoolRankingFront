import { Button } from '@/components/ui/button';
import type { FC } from 'react';
import { Link } from 'react-router-dom';


interface NavigationButtonsProps {
    currentStep: number;
    onNext: (data: any) => void;
    onPrevious: () => void;
    onSubmit: () => void;
    isSubmitting?: boolean;
    cancelPath: string;
}

const NavigationButtons: FC<NavigationButtonsProps> = ({ currentStep, cancelPath, onNext, onPrevious, onSubmit, isSubmitting = false }) => {

    const totalSteps = 4;
    const isLastStep = currentStep === totalSteps - 1;

    return (
        <div className="flex justify-between pt-6">

            <div>
                <Link to={"../../"}>
                    <Button type="button" variant="destructive" onClick={onPrevious} className=' cursor-pointer hover:bg-red-500'>
                        Cancel
                    </Button>
                </Link>

            </div>

            <div>
                <Button onClick={onNext} type='submit' disabled={isSubmitting} className=' cursor-pointer bg-green-700 hover:bg-green-600 '>
                    Update
                </Button>
            </div>


        </div>
    );


}

export default NavigationButtons