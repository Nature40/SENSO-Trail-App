//https://github.com/inkle/ink/blob/master/Documentation/RunningYourInk.md#marking-up-your-ink-content-with-tags

export const AUDIO_BASE_PATH = './audio/'


/**
 * @param {String[]} tags
 * @return {Object}
 */
export function extractTags (tags) {
  const tagObject = {
  }

  const other = []

  tags.forEach((e) => {
    const split = e.split(':')
    switch(split[0]) {
      case 'audio': 
        tagObject.audio = AUDIO_BASE_PATH+split[1].trim()
        break;
      default:
        other.push(split.join(':'))
    }
  })
  if(other.length > 0){
    tagObject.other = other
  }
  return tagObject
}

/**
 * @param {String[]} globalTags
 * @return {Object}
*/
export function getGlobalTags (globalTags) {
  console.log(globalTags)
  const tagObject = {
  }

  const other = []
  const stations = []

  globalTags.forEach((e) => {
    const split = e.split(':')
    console.log(split)
    switch(split[0]) {
      case 'station': 
        stations.push(extractStationData(split[1]))
        break;
      default:
        other.push(split.join(':'))
    }
  })

  if(stations.length > 0) tagObject.stations = [...stations]
  if(other.length > 0) tagObject.other = [...other]

  return tagObject
}

function extractStationData(stationString) {
  console.log("extractStationData")
  console.log(stationString)
  const split = stationString.split(" ")
  console.log(split)

  return {
    station: split[0],
    latitude: split[1],
    longitude: split[2]
  }
  

}