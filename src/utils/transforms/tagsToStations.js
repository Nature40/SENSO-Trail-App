import uuidv1 from 'uuid/v1'

export function tagDataToStation(stationTags, getNewId = uuidv1) {
  const ret = {}
  stationTags.forEach(t => {
    const id = getNewId()
    ret[id] = {
      ...t,
      id: getNewId,
    }
  })
  return ret
}
