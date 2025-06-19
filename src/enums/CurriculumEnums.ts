const BRITISH = 'BRITISH';
const AMERICAN = 'AMERICAN';
const IB_CURRICULUM = 'IB';
const CBSE = 'CBSE';
const IGCSE = 'IGCSE';
const A_LEVEL = 'A_LEVEL';
const FRENCH = 'FRENCH';
const GERMAN = 'GERMAN';

export const CurriculumEnums = {
    BRITISH,
    AMERICAN,
    IB: IB_CURRICULUM,
    CBSE,
    IGCSE,
    A_LEVEL,
    FRENCH,
    GERMAN
} as const;

export type CurriculumEnums = typeof CurriculumEnums[keyof typeof CurriculumEnums];

