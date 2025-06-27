const SOLAR = {
    value: 'SOLAR' as const,
    label: 'Solar Panels'
};

const RECYCLING = {
    value: 'RECYCLING' as const,
    label: 'Recycling Program'
};

const WATER_CONSERVATION = {
    value: 'WATER_CONSERVATION' as const,
    label: 'Water Conservation'
};

const ENERGY_EFFICIENT_LIGHTING = {
    value: 'ENERGY_EFFICIENT_LIGHTING' as const,
    label: 'Energy Efficient Lighting'
};

const GREEN_SPACES = {
    value: 'GREEN_SPACES' as const,
    label: 'Green Building Certification'
};

export const SustainabilityEnums = {
    SOLAR,
    RECYCLING,
    WATER_CONSERVATION,
    ENERGY_EFFICIENT_LIGHTING,
    GREEN_SPACES
} as const;



export type SustainabilityEnums = typeof SustainabilityEnums[keyof typeof SustainabilityEnums];
