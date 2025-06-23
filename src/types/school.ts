
import { z } from 'zod';

// Enums
export const CountryEnum = z.enum([
  'US', 'CA', 'UK', 'AU', 'DE', 'FRANCE', 'JP', 'SG', 'AE', 'IN', 'BR', 'MX', 'ZA'
]);

export const SchoolTypeEnum = z.enum([
  'public', 'private', 'charter', 'International', 'religious', 'boarding'
]);

export const AccreditationEnum = z.enum([
  'IB', 'CIS', 'NEASC', 'WASC', 'MSA', 'SACS', 'ACSI', 'BSO'
]);

export const LevelsEnum = z.enum([
  'preschool', 'elementary', 'middle', 'high', 'university'
]);

export const CurriculumEnum = z.enum([
  'IB', 'AP', 'A-Level', 'national', 'montessori', 'waldorf', 'cambridge'
]);

// New enums for Step 3
export const FacilityEnum = z.enum([
  'library', 'laboratory', 'gymnasium', 'cafeteria', 'auditorium', 'playground', 
  'swimming-pool', 'art-studio', 'music-room', 'computer-lab', 'sports-field'
]);

export const AccessibilityEnum = z.enum([
  'wheelchair-access', 'elevator', 'braille-signage', 'hearing-loop', 
  'accessible-restrooms', 'special-needs-support'
]);

export const SustainabilityEnum = z.enum([
  'solar-panels', 'recycling-program', 'water-conservation', 'green-building', 
  'organic-garden', 'energy-efficiency'
]);

export const RatingLevelEnum = z.enum([
  'basic', 'intermediate', 'advanced', 'expert'
]);

// New enum for Step 4
export const LanguageEnum = z.enum([
  'english', 'spanish', 'french', 'german', 'chinese', 'japanese', 'arabic', 
  'portuguese', 'russian', 'italian', 'dutch', 'korean'
]);

// Step 1 Schema - School General Info
export const schoolGeneralSchema = z.object({
  name: z.string().min(2, 'School name must be at least 2 characters'),
  country: CountryEnum,
  city: z.string().min(2, 'City must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters'),
  email: z.string().email('Please enter a valid email address'),
  yearEstablished: z.number()
    .int('Year must be a whole number')
    .min(1800, 'Year must be after 1800')
    .max(2025, 'Year cannot be in the future'),
  website: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
  type: SchoolTypeEnum,
});

// Step 2 Schema - School Academics
export const schoolAcademicsSchema = z.object({
  languagesOfInstruction: z.number()
    .int('Number of languages must be a whole number')
    .min(1, 'At least one language is required')
    .max(10, 'Maximum 10 languages allowed'),
  internationalAccreditations: z.array(AccreditationEnum)
    .min(1, 'At least one accreditation is required'),
  accreditationDocsLinks: z.string()
    .min(5, 'Please provide documentation links'),
  levelsOffered: z.array(LevelsEnum)
    .min(1, 'At least one level is required'),
  curriculums: z.array(CurriculumEnum)
    .min(1, 'At least one curriculum is required'),
});

// Step 3 Schema - School Facilities
export const schoolFacilitiesSchema = z.object({
  facilities: z.array(FacilityEnum)
    .min(1, 'At least one facility is required'),
  accessibilityFeatures: z.array(AccessibilityEnum)
    .min(1, 'At least one accessibility feature is required'),
  sustainabilityPractices: z.array(SustainabilityEnum)
    .min(1, 'At least one sustainability practice is required'),
  universityDestinations: z.array(z.string().min(2, 'University name must be at least 2 characters'))
    .min(1, 'At least one university destination is required'),
  csrActivities: z.string()
    .min(10, 'CSR activities description must be at least 10 characters'),
  safetyCompliance: z.boolean().optional(),
  aiIntegration: z.boolean().optional(),
  technologyReadiness: RatingLevelEnum.optional(),
  industryPartnerships: z.array(z.string().min(2, 'Partnership name must be at least 2 characters'))
    .min(1, 'At least one industry partnership is required'),
  awardsAndRecognitions: z.string().optional(),
});

// Step 4 Schema - School Staff
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
  teacherNationalities: z.array(CountryEnum)
    .min(1, 'At least one teacher nationality is required'),
  teacherLanguages: z.array(LanguageEnum)
    .min(1, 'At least one teacher language is required'),
  professionalDevelopment: z.string()
    .min(10, 'Professional development description must be at least 10 characters'),
  lastInspectionDate: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in yyyy-MM-dd format')
    .refine((date) => new Date(date) <= new Date(), 'Inspection date must be in the past')
    .optional(),
});

// Step 5 Schema - School Media
export const schoolMediaSchema = z.object({
  bqaReportLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  brochureLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  galleryLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  videoTourLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

// Combined schema for the complete form
export const completeSchoolSchema = schoolGeneralSchema
  .merge(schoolAcademicsSchema)
  .merge(schoolFacilitiesSchema)
  .merge(schoolStaffSchema)
  .merge(schoolMediaSchema);

// TypeScript types
export type Country = z.infer<typeof CountryEnum>;
export type SchoolType = z.infer<typeof SchoolTypeEnum>;
export type Accreditation = z.infer<typeof AccreditationEnum>;
export type Level = z.infer<typeof LevelsEnum>;
export type Curriculum = z.infer<typeof CurriculumEnum>;
export type Facility = z.infer<typeof FacilityEnum>;
export type Accessibility = z.infer<typeof AccessibilityEnum>;
export type Sustainability = z.infer<typeof SustainabilityEnum>;
export type RatingLevel = z.infer<typeof RatingLevelEnum>;
export type Language = z.infer<typeof LanguageEnum>;

export type SchoolGeneralData = z.infer<typeof schoolGeneralSchema>;
export type SchoolAcademicsData = z.infer<typeof schoolAcademicsSchema>;
export type SchoolFacilitiesData = z.infer<typeof schoolFacilitiesSchema>;
export type SchoolStaffData = z.infer<typeof schoolStaffSchema>;
export type SchoolMediaData = z.infer<typeof schoolMediaSchema>;
export type CompleteSchoolData = z.infer<typeof completeSchoolSchema>;
