const LIB = {
  value: 'LIB' as const,
  label: 'Library'
};

const LAB = {
  value: 'LAB' as const,
  label: 'Laboratory'
};

const GYM = {
  value: 'GYM' as const,
  label: 'Gymnasium'
};

const CAF = {
  value: 'CAF' as const,
  label: 'Cafeteria'
};

const AUD = {
  value: 'AUD' as const,
  label: 'Auditorium'
};

const PGD = {
  value: 'PGD' as const,
  label: 'Playground'
};

const SWP = {
  value: 'SWP' as const,
  label: 'Swimming Pool'
};

const ART = {
  value: 'ART' as const,
  label: 'Art Studio'
};

const MUS = {
  value: 'MUS' as const,
  label: 'Music Room'
};

const CLAB = {
  value: 'CLAB' as const,
  label: 'Computer Lab'
};

const SFLD = {
  value: 'SFLD' as const,
  label: 'Sports Field'
};



export const FacilityEnums = {
  LIB,
  LAB,
  GYM,
  CAF,
  AUD,
  PGD,
  SWP,
  ART,
  MUS,
  CLAB,
  SFLD
} as const;



export type FacilityEnum = typeof FacilityEnums[keyof typeof FacilityEnums]['value'];
