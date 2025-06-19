const HIGH = 'HIGH';
const MEDIUM = 'MEDIUM';
const LOW = 'LOW';

export const RatingLevelEnums = {
    HIGH,
    MEDIUM,
    LOW
} as const;

export type RatingLevelEnums = typeof RatingLevelEnums[keyof typeof RatingLevelEnums];



