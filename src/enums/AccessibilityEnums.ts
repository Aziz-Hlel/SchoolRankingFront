
const RAMPS = 'RAMPS'
const WHEELCHAIRS = 'WHEELCHAIRS'
const ELEVATORS = 'ELEVATORS'
const STAIRS = 'STAIRS'

export const AccessibilityEnums = {
    RAMPS,
    WHEELCHAIRS,
    ELEVATORS,
    STAIRS

} as const

export type AccessibilityEnums = typeof AccessibilityEnums[keyof typeof AccessibilityEnums]