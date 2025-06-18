
const IB = 'IB'
const BSO = 'BSO'
const CIS = 'CIS'
const Cognia = 'Cognia'
const AEFE = 'AEFE'

export const AccreditationEnums = {
    IB,
    BSO,
    CIS,
    Cognia,
    AEFE

}

export type AccreditationEnum = keyof typeof AccreditationEnums;