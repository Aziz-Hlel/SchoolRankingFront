const LIBRARY = {
    value: 'LIBRARY' as const,
    label: 'Library'
};

const LABORATORY = {
    value: 'LABORATORY' as const,
    label: 'Laboratory'
};

const GYMNASIUM = {
    value: 'GYMNASIUM' as const,
    label: 'Gymnasium'
};

const CAFETERIA = {
    value: 'CAFETERIA' as const,
    label: 'Cafeteria'
};

const AUDITORIUM = {
    value: 'AUDITORIUM' as const,
    label: 'Auditorium'
};

const PLAYGROUND = {
    value: 'PLAYGROUND' as const,
    label: 'Playground'
};

const SWIMMING_POOL = {
    value: 'SWIMMING_POOL' as const,
    label: 'Swimming Pool'
};

const ART_STUDIO = {
    value: 'ART_STUDIO' as const,
    label: 'Art Studio'
};

const MUSIC_ROOM = {
    value: 'MUSIC_ROOM' as const,
    label: 'Music Room'
};

const COMPUTER_LAB = {
    value: 'COMPUTER_LAB' as const,
    label: 'Computer Lab'
};

const SPORTS_FIELD = {
    value: 'SPORTS_FIELD' as const,
    label: 'Sports Field'
};

export const FacilityEnums = {
    LIBRARY,
    LABORATORY,
    GYMNASIUM,
    CAFETERIA,
    AUDITORIUM,
    PLAYGROUND,
    SWIMMING_POOL,
    ART_STUDIO,
    MUSIC_ROOM,
    COMPUTER_LAB,
    SPORTS_FIELD
} as const;

export type FacilityEnums = typeof FacilityEnums[keyof typeof FacilityEnums];
