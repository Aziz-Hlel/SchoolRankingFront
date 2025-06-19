import type { CountryEnums } from "@/enums/CountryEnums";
import type { CurriculumEnums } from "@/enums/CurriculumEnums";
import type { FacilityEnums } from "@/enums/FacilityEnums";
import type { LanguageEnums } from "@/enums/LanguagesEnums";
import type { SchoolTypeEnums } from "@/enums/SchoolTypeEnums";
import type { RatingLevel } from "./school";
import type { AccessibilityEnums } from "@/enums/AccessibilityEnums";
import type { SustainabilityEnums } from "@/enums/SustainabilityEnums";
import type { AccreditationEnums } from "@/enums/AccreditationEnums";
import type { LevelEnums } from "@/enums/LevelEnums";


export type SchoolStaff = {
  leadershipTeam: string;
  leadershipProfileLink: string;
  staffSizeEstimate: number;
  teacherQualifications: string;
  teacherNationalities: CountryEnums[];
  teacherLanguages: LanguageEnums[]; // assume Languages is a type/enum
  professionalDevelopment: string;
  lastInspectionDate: string; // ISO 8601 format, can be converted to Date if needed
};


export type SchoolFacilities = {
  id: string; // UUID
  facilities: FacilityEnums[]; // assume enums or string unions
  accessibilityFeatures: AccessibilityEnums[];
  sustainabilityPractices: SustainabilityEnums[];
  universityDestinations: string[];
  csrActivities: string;
  industryPartnerships: string[];
  safetyCompliance: boolean | null;
  aiIntegration: boolean | null;
  technologyReadiness: RatingLevel; 
  awardsAndRecognitions: string;
};


export type SchoolMedia = {
  id: string;
  bqaReportLink: string;
  brochureLink: string;
  galleryLink: string;
  videoTourLink: string;
};


export type SchoolGeneral = {
  id: string; // UUID
  name: string;
  city: string;
  address: string;
  phoneNumber: string;
  email: string;
  yearEstablished: number | null;
  type: SchoolTypeEnums; // assume an enum or union type
  website: string;
  country: CountryEnums; // assume defined elsewhere
};


export type SchoolAcademics = {
  id: string; // UUID
  languagesOfInstruction: number;
  internationalAccreditations: AccreditationEnums[];
  accreditationDocsLinks: string;
  levelsOffered: LevelEnums[];//
  curriculums: CurriculumEnums[];//
};


export type SchoolDetailed = {
  schoolGeneral: SchoolGeneral;
  schoolStaff: SchoolStaff;
  schoolFacilities: SchoolFacilities;
  schoolMedia: SchoolMedia;
  schoolAcademics: SchoolAcademics;
};
