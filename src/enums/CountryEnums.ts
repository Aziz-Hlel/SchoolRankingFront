
const BH = {
    value: 'BH' as const,
    label: 'Bahrain'
};

const KW = {
    value: 'KW' as const,
    label: 'Kuwait'
};

const OM = {
    value: 'OM' as const,
    label: 'Oman'
};

const QA = {
    value: 'QA' as const,
    label: 'Qatar'
};

const SA = {
    value: 'SA' as const,
    label: 'Saudi Arabia'
};

const AE = {
    value: 'AE' as const,
    label: 'United Arab Emirates'
};

export const CountryEnums = {
    BH,
    KW,
    OM,
    QA,
    SA,
    AE
};

export type CountryEnums = typeof CountryEnums[keyof typeof CountryEnums]['value'];


