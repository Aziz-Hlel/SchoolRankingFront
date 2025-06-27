const en = {
    value: 'en' as const,
    label: 'English'
};

const es = {
    value: 'es' as const,
    label: 'Spanish'
};

const ar = {
    value: 'ar' as const,
    label: 'Arabic'
};

const fr = {
    value: 'fr' as const,
    label: 'French'
};

const pt = {
    value: 'pt' as const,
    label: 'Portuguese'
};

const de = {
    value: 'de' as const,
    label: 'German'
};

const it = {
    value: 'it' as const,
    label: 'Italian'
};

const ja = {
    value: 'ja' as const,
    label: 'Japanese'
};

const ru = {
    value: 'ru' as const,
    label: 'Russian'
};

const ko = {
    value: 'ko' as const,
    label: 'Korean'
};

const zh = {
    value: 'zh' as const,
    label: 'Mandarin'
};

const hi = {
    value: 'hi' as const,
    label: 'Hindi'
};

const other = {
    value: 'other' as const,
    label: 'Other'
};


export const LanguageEnums = {
    en,
    es,
    ar,
    fr,
    pt,
    de,
    it,
    ja,
    ru,
    ko,
    zh,
    hi,
    other,
} as const ;

export type LanguageEnums = typeof LanguageEnums[keyof typeof LanguageEnums]['value'];