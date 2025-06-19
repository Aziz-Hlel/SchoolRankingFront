const LIBRARY = 'LIBRARY';
const COMPUTER_LAB = 'COMPUTER_LAB';
const SPORTS_COURT = 'SPORTS_COURT';
const PLAYGROUND = 'PLAYGROUND';
const GYM = 'GYM';
const KITCHEN = 'KITCHEN';
const CAFETERIA = 'CAFETERIA';
const RESTAURANT = 'RESTAURANT';

export const FacilityEnums = {
    LIBRARY,
    COMPUTER_LAB,
    SPORTS_COURT,
    PLAYGROUND,
    GYM,
    KITCHEN,
    CAFETERIA,
    RESTAURANT
} as const;

export type FacilityEnums = typeof FacilityEnums[keyof typeof FacilityEnums];
