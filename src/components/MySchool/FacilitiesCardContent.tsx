import { Badge } from '../ui/badge'
import type { SchoolFacilities } from '@/types/School2.type'
import { ShieldCheck } from 'lucide-react';
import { ShieldMinus } from 'lucide-react';

import { Bot } from 'lucide-react';
import { BotOff } from 'lucide-react';


const FacilitiesCardContent = ({ section }: { section?: SchoolFacilities }) => {

    if (!section) return null;

    return (
        <div className="space-y-3">
            <div>
                <p className="text-sm text-muted-foreground">Facilities</p>
                <div className="flex flex-wrap gap-1 mt-1">
                    {section.facilities.map((facility: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                            {facility}
                        </Badge>
                    ))}
                </div>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Accessibility Features</p>
                <div className="flex flex-wrap gap-1 mt-1">
                    {section.accessibilityFeatures.map((facility: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                            {facility}
                        </Badge>
                    ))}
                </div>
            </div>

            <div>
                <p className="text-sm text-muted-foreground">Sustainability Practices</p>
                <div className="flex flex-wrap gap-1 mt-1">
                    {section.sustainabilityPractices.map((facility: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                            {facility}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                <div className=' flex gap-2 '>
                    <p className="text-sm">Safety compliance</p>
                    <span>{section.safetyCompliance ? <ShieldCheck className='text-green-700' /> : <ShieldMinus className='' />}</span>
                </div>

                <div className=' flex gap-2 '>
                    <p className="text-sm">AI itegration</p>
                    <span>{section.safetyCompliance ? <Bot className='text-green-700' /> : <BotOff className='' />}</span>
                </div>

            </div>
            {/* <div className=' flex gap-2 '>
                <p className="text-sm">Technology readiness</p>
                <Badge variant="outline" className="text-xs bg-green-700 text-white">
                    {section.technologyReadiness}
                </Badge>
            </div> */}



            <div>
                <p className="text-sm text-muted-foreground">Industry partnerships</p>
                <div className="flex flex-wrap gap-1 mt-1">
                    {section.industryPartnerships.map((partner: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                            {partner}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* "basic" | "intermediate" | "advanced" | "expert" */}
            {/* <div>
                <p className="text-sm text-muted-foreground">Resources</p>
                <div className="flex flex-wrap gap-1 mt-1">
                    {section.resources.map((resource: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                            {resource}
                        </Badge>
                    ))}
                </div>
            </div> */}
        </div>
    )
}

export default FacilitiesCardContent