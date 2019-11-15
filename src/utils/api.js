/**
 * @throws JSON Parse
 * @param {string} url - url to fetch json data from
 * @return {Object} - JS Object from JSON files
 */
export async function fetchJSON (url, params = {}) {
  const request = {
    headers: {
      Accept: 'application/json'
    },
    method: 'GET'
  }
  const response = await window.fetch(url, request)
  const data = await response.json()
  /** MOCK only loading trails stations. Needs some kind of api */
  if ('uuids' in params) {
    return data.filter(s => params.uuids.includes(s.uuid))
  }
  return data
}
