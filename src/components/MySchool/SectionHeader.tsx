import type { ComponentType, SVGProps } from "react";
import { Button } from "../ui/button"
import { CardHeader, CardTitle } from "../ui/card"
import { Edit, } from 'lucide-react';
import { Link } from "react-router-dom";


interface sectionsProps {
    title: string,
    icon: ComponentType<SVGProps<SVGSVGElement>>,
    color: string,
    editPath: string,
    editable: boolean

}


const SchoolInfoHeader = ({ title, icon, color, editPath, editable }: sectionsProps) => {



    const Icon = icon;

    return (

        <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${color}`}>
                        <Icon className="w-4 h-4" />
                    </div>
                    <div>
                        <CardTitle className="text-base lg:text-lg">{title}</CardTitle>
                    </div>
                </div>
                <Link to={editable ? editPath : null}  >
                    <Button
                        variant="ghost"
                        size="sm"
                        // onClick={() => setEditingSection(id)}
                        className={"h-8 w-8 p-0 " + (!editable && " hover:cursor-not-allowed")}
                    >
                        <Edit className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
        </CardHeader>

    )
}

export default SchoolInfoHeader