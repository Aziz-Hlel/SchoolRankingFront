import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { type FC } from 'react'

const AbstractUpdateHeader: FC<{ currentStep: number }> = ({ currentStep, }) => {


    const steps = [
        { title: 'School Information', description: 'Basic details about your school' },
        { title: 'Academic Programs', description: 'Curriculum and accreditation details' },
        { title: 'Facilities & Sustainability', description: 'Infrastructure and environmental practices' },
        { title: 'Staff & Leadership', description: 'Team qualifications and structure' },
        { title: 'Media & Documentation', description: 'Links to reports and media content' },
    ];

    return (
        <CardHeader className="">
            <CardTitle className="text-xl lg:text-2xl font-bold text-primary">{steps[currentStep].title}</CardTitle>
            <CardDescription className="text-sm lg:text-base">
                {steps[currentStep].description}

            </CardDescription>
            <div className="mt-4">
                <div className=' w-full border-t-2' />
            </div>
        </CardHeader>

    )
}

export default AbstractUpdateHeader;