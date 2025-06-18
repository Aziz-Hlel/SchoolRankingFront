
const RAMPS = 'RAMPS'
const WHEELCHAIRS = 'WHEELCHAIRS'
const ELEVATORS = 'ELEVATORS'
const STAIRS = 'STAIRS'

export const AccessibilityEnum = {
    RAMPS,
    WHEELCHAIRS,
    ELEVATORS,
    STAIRS

} as const

export type AccessibilityEnum = typeof AccessibilityEnum[keyof typeof AccessibilityEnum]