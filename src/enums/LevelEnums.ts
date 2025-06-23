// LevelsEnums.ts
const KG = {
    value: 'KG' as const,
    label: 'Kindergarten'
};

const PRIMARY = {
    value: 'PRIMARY' as const,
    label: 'Primary'
};

const MIDDLE_SCHOOL = {
    value: 'MIDDLE_SCHOOL' as const,
    label: 'Middle School'
};

const SECONDARY = {
    value: 'SECONDARY' as const,
    label: 'Secondary'
};

const HIGH_SCHOOL = {
    value: 'HIGH_SCHOOL' as const,
    label: 'High School'
};

const A_LEVEL = {
    value: 'A_LEVEL' as const,
    label: 'A Level'
};

const IB = {
    value: 'IB' as const,
    label: 'International Baccalaureate'
};

const PRESCHOOL = {
    value: 'PRESCHOOL' as const,
    label: 'Preschool (Ages 3-5)'
};

const ELEMENTARY = {
    value: 'ELEMENTARY' as const,
    label: 'Elementary (Ages 6-11)'
};

const MIDDLE = {
    value: 'MIDDLE' as const,
    label: 'Middle School (Ages 12-14)'
};

const HIGH = {
    value: 'HIGH' as const,
    label: 'High School (Ages 15-18)'
};

const UNIVERSITY = {
    value: 'UNIVERSITY' as const,
    label: 'University/College'
};

export const LevelEnums = {
    KG,
    PRIMARY,
    MIDDLE_SCHOOL,
    SECONDARY,
    HIGH_SCHOOL,
    A_LEVEL,
    IB,
    PRESCHOOL,
    ELEMENTARY,
    MIDDLE,
    HIGH,
    UNIVERSITY,
} as const;

export type LevelEnums = keyof typeof LevelEnums;
