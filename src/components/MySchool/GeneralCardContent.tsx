import { CountryEnums } from '@/enums/CountryEnums';
import type { SchoolGeneral } from '@/types/School2.type'
import { Globe, MapPin } from 'lucide-react'
import { CircleFlag } from "react-circle-flags";

const GeneralCardContent = ({ section }: { section?: SchoolGeneral }) => {

    if (!section) return null;

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className="text-sm text-muted-foreground">School Name</p>
                    <p className="font-medium">{section.name}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Established</p>
                    <p className="font-medium">{section.yearEstablished}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">School Type</p>
                    <p className="font-medium">{section.type}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Curriculum</p>
                    <p className="font-medium">IB</p>
                </div>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="font-medium">A leading international school committed to excellence in education</p>
            </div>
            <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <CircleFlag
                    countryCode={CountryEnums[section.country as keyof typeof CountryEnums]?.value.toLowerCase()}
                    className='w-4 h-4 text-muted-foreground '
                />
                <p className="text-sm">{`${CountryEnums[section.country as keyof typeof CountryEnums]?.label ?? section.country}, ${section.city}, ${section.address}`}</p>
            </div>
            <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <a href={section.website} className="text-sm text-blue-600 hover:underline">
                    {section.website}
                </a>
            </div>
        </div>
    )
}

export default GeneralCardContent