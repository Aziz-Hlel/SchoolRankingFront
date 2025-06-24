// Languages.ts
const ENGLISH = {
    value: 'English' as const,
    label: 'English'
};

const SPANISH = {
    value: 'SPANISH' as const,
    label: 'Spanish'
};

const ARABIC = {
    value: 'ARABIC' as const,
    label: 'Arabic'
};

const FRENCH = {
    value: 'FRENCH' as const,
    label: 'French'
};

const PORTUGUESE = {
    value: 'PORTUGUESE' as const,
    label: 'Portuguese'
};

const GERMAN = {
    value: 'GERMAN' as const,
    label: 'German'
};

const ITALIAN = {
    value: 'ITALIAN' as const,
    label: 'Italian'
};

const JAPANESE = {
    value: 'JAPANESE' as const,
    label: 'Japanese'
};

const RUSSIAN = {
    value: 'RUSSIAN' as const,
    label: 'Russian'
};

const KOREAN = {
    value: 'KOREAN' as const,
    label: 'Korean'
};

const MANDARIN = {
    value: 'MANDARIN' as const,
    label: 'Mandarin'
};

const HINDI = {
    value: 'HINDI' as const,
    label: 'Hindi'
};

const OTHER = {
    value: 'OTHER' as const,
    label: 'Other'
};

export const LanguageEnums = {
    ENGLISH,
    SPANISH,
    ARABIC,
    FRENCH,
    PORTUGUESE,
    GERMAN,
    ITALIAN,
    JAPANESE,
    RUSSIAN,
    KOREAN,
    MANDARIN,
    HINDI,
    OTHER
} as const;

export type LanguageEnums = typeof LanguageEnums[keyof typeof LanguageEnums];