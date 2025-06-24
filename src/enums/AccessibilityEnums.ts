
const RAMPS = {
    value: 'RAMPS' as const,
    label: 'Ramps'
}
const STAIRS = {
    value: 'STAIRS' as const,
    label: 'Stairs'
}

const WHEELCHAIRS = {
    value: 'WHEELCHAIRS' as const,
    label: 'Wheelchair Access'
};

const ELEVATORS = {
    value: 'ELEVATORS' as const,
    label: 'Elevators'
};


export const AccessibilityEnums = {
    RAMPS,
    WHEELCHAIRS,
    ELEVATORS,
    STAIRS

} as const


export type AccessibilityEnums = typeof AccessibilityEnums[keyof typeof AccessibilityEnums]