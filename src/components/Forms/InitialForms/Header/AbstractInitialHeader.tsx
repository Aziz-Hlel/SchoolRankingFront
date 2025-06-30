import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { FC } from 'react';

const AbstractInitialHeader: FC<{ currentStep: number }> = ({ currentStep, }) => {

    const steps = [
        { title: 'School Information', description: 'Basic details about your school' },
        { title: 'Academic Programs', description: 'Curriculum and accreditation details' },
        { title: 'Facilities & Sustainability', description: 'Infrastructure and environmental practices' },
        { title: 'Staff & Leadership', description: 'Team qualifications and structure' },
        { title: 'Media & Documentation', description: 'Links to reports and media content' },
    ];

    const totalSteps = 5
    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
        <CardHeader className="">
            <CardTitle className="text-xl lg:text-2xl font-bold text-primary">School Registration</CardTitle>
            <CardDescription className="text-sm lg:text-base">
                Complete your school registration to access the dashboard
            </CardDescription>
            <div className="mt-4">
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Step {currentStep + 1} of {totalSteps}</span>
                        <span>{Math.round(progress)}% Complete</span>
                    </div>
                    <Progress value={progress} className="h-2 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{steps[currentStep].title}</h3>
                    <p className="text-muted-foreground">{steps[currentStep].description}</p>
                </div>

            </div>
        </CardHeader>

    )

}

export default AbstractInitialHeader