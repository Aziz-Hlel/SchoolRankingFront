import { Badge } from '../ui/badge'
import type { SchoolAcademics } from '@/types/School2.type'

const AcademicCardContent = ({ section }: { section: SchoolAcademics }) => {
    return (
        <div className="space-y-3">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <p className="text-sm text-muted-foreground">Grade Range</p>
                    {/* <p className="font-medium">{section.gradeRange}</p> */}
                    <p className="font-medium">{section.levelsOffered.map((level) => level.charAt(0).toUpperCase() + level.slice(1) + " - ")}</p>


                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Curriculum</p>
                    <p className="font-medium">IB</p>
                    {/* <p className="font-medium">
                        {section.curriculums.map((curriculum) => {
                            return curriculum.charAt(0).toUpperCase() + curriculum.slice(1)
                        })}
                    </p> */}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <p className="text-sm text-muted-foreground">Languages of Instruction</p>
                    {/* <p className="font-medium">8</p> */}
                    <p className="font-medium">{section.languagesOfInstruction}</p>


                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Accreditation links</p>
                   <p className="font-medium text-xs overflow-hidden">{section.accreditationDocsLinks}</p>
                </div>
            </div>

            <div>
                <p className="text-sm text-muted-foreground">Programs</p>
                <div className="flex flex-wrap gap-1 mt-1">
                    {/* {section.programs.map((program: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                            {program}
                        </Badge>
                    ))} */}
                    {section.internationalAccreditations.map((program: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                            {program}
                        </Badge>
                    ))}

                </div>
            </div>
            {/* <div>
                <p className="text-sm text-muted-foreground">Subjects</p>
                <div className="flex flex-wrap gap-1 mt-1">
                    {section.subjects.map((subject: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                            {subject}
                        </Badge>
                    ))}
                </div>
            </div> */}
        </div>

    )
}

export default AcademicCardContent