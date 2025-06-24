const IB = {
    value: 'IB' as const,
    label: 'International Baccalaureate (IB)'
};

const CIS = {
    value: 'CIS' as const,
    label: 'Council of International Schools (CIS)'
};

const NEASC = {
    value: 'NEASC' as const,
    label: 'New England Association of Schools and Colleges (NEASC)'
};

const WASC = {
    value: 'WASC' as const,
    label: 'Western Association of Schools and Colleges (WASC)'
};

const MSA = {
    value: 'MSA' as const,
    label: 'Middle States Association (MSA)'
};

const SACS = {
    value: 'SACS' as const,
    label: 'Southern Association of Colleges and Schools (SACS)'
};

const ACSI = {
    value: 'ACSI' as const,
    label: 'Association of Christian Schools International (ACSI)'
};

const BSO = {
    value: 'BSO' as const,
    label: 'British Schools Overseas (BSO)'
};

const Cognia = {
    value: 'Cognia' as const,
    label: 'Cognia Accreditation'
};

const AEFE = {
    value: 'AEFE' as const,
    label: "Agence pour l'Enseignement Français à l'Etranger (AEFE)"
};

export const AccreditationEnums = {
    IB,
    BSO,
    CIS,
    Cognia,
    AEFE,
    NEASC,
    WASC,
    MSA,
    SACS,
    ACSI

}

export type AccreditationEnums = keyof typeof AccreditationEnums;