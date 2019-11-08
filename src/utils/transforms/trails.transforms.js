export function normalizeTrails (trailsArray) {
  const res = {}
  for (const trail of trailsArray) {
    res[trail.uuid] = trail
  }
  return res
}
