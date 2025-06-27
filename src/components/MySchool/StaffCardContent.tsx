import type { SchoolStaff } from '@/types/School2.type';
import { Badge } from '../ui/badge'
import { CountryEnums } from '@/enums/CountryEnums';
import { CalendarCheck } from 'lucide-react';
import { LanguageEnums } from '@/enums/LanguagesEnums';

const StaffCardContent = ({ section }: { section?: SchoolStaff }) => {

    if (!section) return null;

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className="text-sm text-muted-foreground">Total Staff</p>
                    <p className="font-medium">{section.staffSizeEstimate}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Last inspection date</p>
                    <div className='flex items-center gap-2 '>
                        <CalendarCheck className=' w-4 h-4' />
                        <p className="font-medium text-xs lg:text-sm ">{section.lastInspectionDate}</p>
                    </div>
                </div>
            </div>

            <div>
                <p className="text-sm text-muted-foreground">Leadership Team</p>
                <p className="font-medium text-xs lg:text-sm">{section.leadershipTeam}</p>
            </div>

            <div>
                <p className="text-sm text-muted-foreground">Leadership profile Link</p>
                <a href={section.leadershipProfileLink} className="text-sm text-blue-600 hover:underline">
                    {section.leadershipProfileLink}
                </a>
            </div>

            <div>
                <p className="text-sm text-muted-foreground">Teacher Qualifications</p>
                <p className="font-medium text-xs lg:text-sm">{section.teacherQualifications}</p>
            </div>

            <div>
                <p className="text-sm text-muted-foreground">Professional development</p>
                <p className="font-medium text-xs lg:text-sm">{section.professionalDevelopment}</p>
            </div>


            <div>
                <p className="text-sm text-muted-foreground">Nationalities</p>
                <div className="flex flex-wrap gap-1 mt-1">
                    {section.teacherNationalities.map((nationality, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                            {CountryEnums[nationality as keyof typeof CountryEnums]?.label ?? nationality}
                        </Badge>
                    ))}
                </div>
            </div>

            <div>
                <p className="text-sm text-muted-foreground">Teacher languages</p>
                <div className="flex flex-wrap gap-1 mt-1">
                    {section.teacherLanguages.map((language, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                            {LanguageEnums[language as keyof typeof LanguageEnums]?.label ?? language}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default StaffCardContent;