const SOLAR = 'SOLAR';
const RECYCLING = 'RECYCLING';
const GREEN_SPACES = 'GREEN_SPACES';

export const SustainabilityEnums = {
    SOLAR,
    RECYCLING,
    GREEN_SPACES
} as const;

export type SustainabilityEnums = typeof SustainabilityEnums[keyof typeof SustainabilityEnums];
