import type { ROLES } from "@/enums/roles";
import type { ComponentType, SVGProps } from "react";

export type Page = {
    id: string;
    sidebarTitle: string;
    mainPageTitle: string;
    mainPageDescription: string;
    allowedRoles: ROLES[];
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    sidebarLabel: string;

    component: ComponentType;
}
