/**
 * @throws JSON Parse
 * @param {string} url - url to fetch json data from
 * @return {Object} - JS Object from JSON files
 */
export async function fetchJSON (url) {
  const request = {
    headers: {
      Accept: 'application/json'
    },
    method: 'GET'
  }
  const response = await window.fetch(url, request)
  const data = await response.json()
  return data
}
