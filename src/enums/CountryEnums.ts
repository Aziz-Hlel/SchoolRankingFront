import { countries } from "country-data-list";

const US = {
    value: 'US' as const,
    label: 'United States'
};

const CA = {
    value: 'CA' as const,
    label: 'Canada'
};

const GB = {
    value: 'GB' as const,
    label: 'United Kingdom'
};

const FR = {
    value: 'FR' as const,
    label: 'France'
};

const DE = {
    value: 'DE' as const,
    label: 'Germany'
};

const IT = {
    value: 'IT' as const,
    label: 'Italy'
};

const ES = {
    value: 'ES' as const,
    label: 'Spain'
};

const AU = {
    value: 'AU' as const,
    label: 'Australia'
};

const JP = {
    value: 'JP' as const,
    label: 'Japan'
};

const CN = {
    value: 'CN' as const,
    label: 'China'
};

const IN = {
    value: 'IN' as const,
    label: 'India'
};

const BR = {
    value: 'BR' as const,
    label: 'Brazil'
};

const MX = {
    value: 'MX' as const,
    label: 'Mexico'
};

const RU = {
    value: 'RU' as const,
    label: 'Russia'
};

const ZA = {
    value: 'ZA' as const,
    label: 'South Africa'
};

const TR = {
    value: 'TR' as const,
    label: 'Turkey'
};

const KR = {
    value: 'KR' as const,
    label: 'South Korea'
};

const SA = {
    value: 'SA' as const,
    label: 'Saudi Arabia'
};

const EG = {
    value: 'EG' as const,
    label: 'Egypt'
};

const MA = {
    value: 'MA' as const,
    label: 'Morocco'
};

const AE = {
    value: 'AE' as const,
    label: 'United Arab Emirates'
}


export const CountryEnums = {
    US,
    CA,
    GB,
    FR,
    DE,
    IT,
    ES,
    AU,
    JP,
    CN,
    IN,
    BR,
    MX,
    RU,
    ZA,
    TR,
    KR,
    SA,
    EG,
    MA,
    AE
};


export type CountryEnums = typeof CountryEnums[keyof typeof CountryEnums]['value'];


