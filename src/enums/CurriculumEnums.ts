const BRITISH = {
    value: 'BRITISH' as const,
    label: 'British Curriculum'
};

const AMERICAN = {
    value: 'AMERICAN' as const,
    label: 'American Curriculum'
};

const IB_CURRICULUM = {
    value: 'IB' as const,
    label: 'International Baccalaureate Curriculum'
};

const CBSE = {
    value: 'CBSE' as const,
    label: 'Central Board of Secondary Education'
};

const IGCSE = {
    value: 'IGCSE' as const,
    label: 'International General Certificate of Secondary Education'
};

const A_LEVEL = {
    value: 'A_LEVEL' as const,
    label: 'Advanced Level'
};

const FRENCH = {
    value: 'FRENCH' as const,
    label: 'French Curriculum'
};

const GERMAN = {
    value: 'GERMAN' as const,
    label: 'German Curriculum'
};

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

