const KG = {
    value: 'KG' as const,
    label: 'Kindergarten'
};

const PRI = {
    value: 'PRI' as const,
    label: 'Primary'
};

const MS = {
    value: 'MS' as const,
    label: 'Middle School'
};

const SEC = {
    value: 'SEC' as const,
    label: 'Secondary'
};

const HS = {
    value: 'HS' as const,
    label: 'High School'
};

const AL = {
    value: 'AL' as const,
    label: 'A Level'
};

const IB = {
    value: 'IB' as const,
    label: 'International Baccalaureate'
};

const PS = {
    value: 'PS' as const,
    label: 'Preschool (Ages 3–5)'
};

const EL = {
    value: 'EL' as const,
    label: 'Elementary (Ages 6–11)'
};

const MID = {
    value: 'MID' as const,
    label: 'Middle School (Ages 12–14)'
};

const HIG = {
    value: 'HIG' as const,
    label: 'High School (Ages 15–18)'
};

const UNI = {
    value: 'UNI' as const,
    label: 'University/College'
};


export const LevelEnums = {
    KG,
    PRI,
    MS,
    SEC,
    HS,
    AL,
    IB,
    PS,
    EL,
    MID,
    HIG,
    UNI
} as const;

export type LevelEnums = keyof typeof LevelEnums[keyof typeof LevelEnums]['value'];
