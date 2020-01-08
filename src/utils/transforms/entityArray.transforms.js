export function normalizeEntityArray (trailsArray) {
  const res = {}
  for (const trail of trailsArray) {
    res[trail.uuid] = trail
  }
  return res
}

export function getSlugsEntityArray (array) {
  const res = {}
  for (const entity of array) {
    res[entity.slug] = entity.uuid
  }
  return res
}
