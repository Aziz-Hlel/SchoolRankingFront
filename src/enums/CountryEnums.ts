export type Country = {
    code: string;
    displayName: string;
};

export const CountryEnums = {
    'USA': 'United States',
    'FRANCE': 'France',
    'MOROCCO': 'Maroc'
} as const;

export type CountryEnums = keyof typeof CountryEnums;


