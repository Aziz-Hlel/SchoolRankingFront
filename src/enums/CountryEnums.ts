export type Country = {
    code: string;
    displayName: string;
};




const USA = {
    value: 'USA' as const,
    label: 'United States'
};

const FRANCE = {
    value: 'FRANCE' as const,
    label: 'France'
};

const MOROCCO = {
    value: 'MOROCCO' as const,
    label: 'Maroc'
};

export const CountryEnums = {
    USA,
    FRANCE,
    MOROCCO
} as const;


export type CountryEnums =  typeof CountryEnums[keyof typeof CountryEnums]['value'];


