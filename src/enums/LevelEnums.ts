// LevelsEnums.ts
const KG = 'KG';
const PRIMARY = 'PRIMARY';
const MIDDLE_SCHOOL = 'MIDDLE_SCHOOL';
const SECONDARY = 'SECONDARY';
const HIGH_SCHOOL = 'HIGH_SCHOOL';
const A_LEVEL_LEVEL = 'A_LEVEL';
const IB_LEVEL = 'IB';

export const LevelEnums = {
    KG,
    PRIMARY,
    MIDDLE_SCHOOL,
    SECONDARY,
    HIGH_SCHOOL,
    A_LEVEL: A_LEVEL_LEVEL,
    IB: IB_LEVEL
} as const;

export type LevelEnums = typeof LevelEnums[keyof typeof LevelEnums];
