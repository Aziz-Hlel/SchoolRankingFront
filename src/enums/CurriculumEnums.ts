const UK = {
  value: 'UK' as const,
  label: 'British Curriculum'
};

const US = {
  value: 'US' as const,
  label: 'American Curriculum'
};

const IB = {
  value: 'IB' as const,
  label: 'International Baccalaureate Curriculum'
};  

const CBSE = {
  value: 'CBSE' as const,
  label: 'Central Board of Secondary Education'
};

const IGCSE = {
  value: 'IGCSE' as const,
  label: 'International General Certificate of Secondary Education'
};

const AL = {
  value: 'AL' as const,
  label: 'Advanced Level'
};

const FR = {
  value: 'FR' as const,
  label: 'French Curriculum'
};

const DE = {
  value: 'DE' as const,
  label: 'German Curriculum'
};




export const CurriculumEnums = {
  UK,
  US,
  IB,
  CBSE,
  IGCSE,
  AL,
  FR,
  DE
} as const;


export type CurriculumEnum = typeof CurriculumEnums[keyof typeof CurriculumEnums]['value'];
