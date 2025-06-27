const HIGH = {
    value: 'HIGH' as const,
    label: 'High'
}
const MEDIUM = {
    value: 'MEDIUM' as const,
    label: 'Medium'
}
const LOW = {
    value: 'LOW' as const,
    label: 'Low'
}

export const RatingLevelEnums = {
    HIGH,
    MEDIUM,
    LOW
} as const;

export type RatingLevelEnums = typeof RatingLevelEnums[keyof typeof RatingLevelEnums]['value'];



