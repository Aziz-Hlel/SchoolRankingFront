const INTERNATIONAL = {
  value: 'IN' as const,
  label: 'International'
};

const PRIVATE = {
  value: 'PR' as const,
  label: 'Private'
};

const PUBLIC = {
  value: 'PU' as const,
  label: 'Public'
};

const CHARTER = {
  value: 'CH' as const,
  label: 'Charter'
};

export const SchoolTypeEnums = {
  INTERNATIONAL,
  PRIVATE,
  PUBLIC,
  CHARTER
} as const;


export type SchoolTypeEnums = typeof SchoolTypeEnums[keyof typeof SchoolTypeEnums]['value'];
