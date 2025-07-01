import { CountryEnums } from "@/enums/CountryEnums";
import { CurriculumEnums } from "@/enums/CurriculumEnums";
import { FacilityEnums } from "@/enums/FacilityEnums";
import { LanguageEnums } from "@/enums/LanguagesEnums";
import { SchoolTypeEnums } from "@/enums/SchoolTypeEnums";
import { AccessibilityEnums } from "@/enums/AccessibilityEnums";
import { SustainabilityEnums } from "@/enums/SustainabilityEnums";
import { AccreditationEnums } from "@/enums/AccreditationEnums";
import { LevelEnums } from "@/enums/LevelEnums";
import z from "zod";
import { RatingLevelEnums } from "@/enums/RatingLevelEnums";

// Schemas 

export const schoolGeneralSchema = z.object({
  name: z.string().min(2, 'School name must be at least 2 characters'),
  country: z.enum(Object.values(CountryEnums).map(country => country.value) as [string, ...string[]]),
  city: z.string().min(2, 'City must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  phoneNumber: z.string().min(8, 'Phone number must be at least 8 characters'),
  email: z.string().email('Please enter a valid email address'),
  yearEstablished: z.number()
    .int('Year must be a whole number')
    .min(1800, 'Year must be after 1800')
    .max(2025, 'Year cannot be in the future'),
  website: z.string().url('Please enter a valid website URL').optional(),
  type: z.enum(Object.values(SchoolTypeEnums).map(type => type.value) as [string, ...string[]]),
});



export const schoolAcademicsSchema = z.object({
  languagesOfInstruction: z.number()
    .int('Number of languages must be a whole number')
    .min(1, 'At least one language is required')
    .max(10, 'Maximum 10 languages allowed'),
  internationalAccreditations: z.array(z.enum(Object.keys(AccreditationEnums) as [string, ...string[]]))
    .min(1, 'At least one accreditation is required'),
  accreditationDocsLinks: z.string().optional(),
  levelsOffered: z.array(z.enum(Object.keys(LevelEnums) as [string, ...string[]]))
    .min(1, 'At least one level is required'),
  curriculums: z.array(z.enum(Object.keys(CurriculumEnums) as [string, ...string[]]))
    .min(1, 'At least one curriculum is required'),
});




export const schoolFacilitiesSchema = z.object({
  facilities: z.array(z.enum(Object.keys(FacilityEnums) as [string, ...string[]]))
    .min(1, 'At least one facility is required'),
  accessibilityFeatures: z.array(z.enum(Object.keys(AccessibilityEnums) as [string, ...string[]]))
    .min(1, 'At least one accessibility feature is required'),
  sustainabilityPractices: z.array(z.enum(Object.keys(SustainabilityEnums) as [string, ...string[]]))
    .min(1, 'At least one sustainability practice is required'),
  universityDestinations: z.array(z.string().min(2, 'University name must be at least 2 characters'))
    .min(1, 'At least one university destination is required'),
  csrActivities: z.string()
    .min(10, 'CSR activities description must be at least 10 characters'),
  safetyCompliance: z.boolean({ required_error: 'Safety compliance is required' }),
  aiIntegration: z.boolean({ required_error: 'AI integration is required' }),
  technologyReadiness: z.enum(Object.keys(RatingLevelEnums) as [string, ...string[]]),
  industryPartnerships: z.array(z.string().min(2, 'Partnership name must be at least 2 characters'))
    .min(1, 'At least one industry partnership is required'),
  awardsAndRecognitions: z.string().optional(),
});







export const schoolStaffSchema = z.object({
  leadershipTeam: z.string()
    .min(10, 'Leadership team description must be at least 10 characters'),

  leadershipProfileLink: z.string()
    .url('Please enter a valid URL for leadership profile'),

  staffSizeEstimate: z.number()
    .int('Staff size must be a whole number')
    .min(1, 'Staff size must be at least 1'),

  teacherQualifications: z.string()
    .min(10, 'Teacher qualifications must be at least 10 characters'),

  teacherNationalities: z.array(z.string()),

  teacherLanguages: z.array(z.enum(Object.values(LanguageEnums).map(language => language.value) as [string, ...string[]]))
    .min(1, 'At least one teacher language is required'),

  professionalDevelopment: z.string()
    .min(10, 'Professional development description must be at least 10 characters'),

  lastInspectionDate: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in yyyy-MM-dd format')
    .refine((date) => new Date(date) <= new Date(), 'Inspection date must be in the past')
    .optional(),

});


export const schoolMediaSchema = z.object({
  bqaReportLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  brochureLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  galleryLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  videoTourLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});





type Id = {
  id: string;
};


type SchoolGeneralNoID = z.infer<typeof schoolGeneralSchema>;

export type SchoolGeneral = SchoolGeneralNoID & Id;


type SchoolAcademicsNoID = z.infer<typeof schoolAcademicsSchema>;

export type SchoolAcademics = SchoolAcademicsNoID & Id;


type SchoolFacilitiesNoID = z.infer<typeof schoolFacilitiesSchema>;

export type SchoolFacilities = SchoolFacilitiesNoID & Id;


type SchoolStaffNoID = z.infer<typeof schoolStaffSchema>;

export type SchoolStaff = SchoolStaffNoID & Id;


type SchoolMediaNoID = z.infer<typeof schoolMediaSchema>;

export type SchoolMedia = SchoolMediaNoID & Id;





export type SchoolDetailed = {
  schoolGeneral?: SchoolGeneral;
  schoolStaff?: SchoolStaff;
  schoolFacilities?: SchoolFacilities;
  schoolMedia?: SchoolMedia;
  schoolAcademics?: SchoolAcademics;
};
