export function resolveReducedMotion(override: boolean | null, devicePreference: boolean) {
  return override ?? devicePreference;
}