import type { ComponentType, SVGProps } from "react";
import { Button } from "../ui/button"
import { CardHeader, CardTitle } from "../ui/card"
import { Edit, } from 'lucide-react';
import { Link } from "react-router-dom";


interface sectionsProps {
    title: string,
    icon: ComponentType<SVGProps<SVGSVGElement>>,
    color: string,
    editPath: string
}


const SchoolInfoHeader = ({ title, icon, color, editPath }: sectionsProps) => {



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
                <Link to={editPath} >
                    <Button
                        variant="ghost"
                        size="sm"
                        // onClick={() => setEditingSection(id)}
                        className="h-8 w-8 p-0"
                    >
                        <Edit className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
        </CardHeader>

    )
}

export default SchoolInfoHeader