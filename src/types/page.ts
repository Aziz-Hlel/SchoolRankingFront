import type { ROLES } from "@/enums/roles";
import type { ComponentType, SVGProps } from "react";

export const sidebarButton = {
    Schools: "Schools",
    Admins: "Admins",
    Profile: "Profile",
    MySchool: "MySchool",
} as const;

type HeaderType = "MySchoolHeader" | "AdminsHeader" | "SchoolsHeader"

export type SidebarButton = typeof sidebarButton[keyof typeof sidebarButton];
export type s = keyof typeof sidebarButton;

export type Page = {
    id: string;
    sidebarTitle: string;
    sidebarButton: SidebarButton;
    mainPageTitle: string;
    mainPageDescription: string;
    allowedRoles: ROLES[];
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    sidebarLabel: string;
    path: string;
    headerType: HeaderType;
    additionalInfo?: {
        formsCompleted: boolean;
        lastFormStep: number;
    }
}