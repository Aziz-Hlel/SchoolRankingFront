const INTERNATIONAL = 'INTERNATIONAL';
const PRIVATE = 'PRIVATE';
const PUBLIC = 'PUBLIC';
const CHARTER = 'CHARTER';

export const SchoolTypeEnums = {
    INTERNATIONAL,
    PRIVATE,
    PUBLIC,
    CHARTER
} as const;

export type SchoolTypeEnums = typeof SchoolTypeEnums[keyof typeof SchoolTypeEnums];
