// Languages.ts
const ENGLISH = 'ENGLISH';
const SPANISH = 'SPANISH';
const ARABIC = 'ARABIC';
const FRENCH_LANG = 'FRENCH';
const PORTUGUESE = 'PORTUGUESE';
const GERMAN_LANG = 'GERMAN';
const ITALIAN = 'ITALIAN';
const JAPANESE = 'JAPANESE';
const RUSSIAN = 'RUSSIAN';
const KOREAN = 'KOREAN';
const MANDARIN = 'MANDARIN';
const HINDI = 'HINDI';
const OTHER = 'OTHER';

export const LanguageEnums = {
    ENGLISH,
    SPANISH,
    ARABIC,
    FRENCH: FRENCH_LANG,
    PORTUGUESE,
    GERMAN: GERMAN_LANG,
    ITALIAN,
    JAPANESE,
    RUSSIAN,
    KOREAN,
    MANDARIN,
    HINDI,
    OTHER
} as const;

export type LanguageEnums = typeof LanguageEnums[keyof typeof LanguageEnums];