/**
 * @throws JSON Parse
 * @param {string} url - url to fetch json data from
 * @return {Object} - JS Object from JSON files
 */
export async function fetchJSON (url, params = {}) {
  /** MOCK LOAD ACTIVITES */
  if (url === process.env.PUBLIC_URL + '/json/activities.json') {
    return mockFetchActivities(params)
  }
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

export async function getResources (urls, params = {}) {
  const request = {
    method: 'GET'
  }
  const requests = urls.map((url) => window.fetch(url, {...request}))
  await Promise.all(requests)

  return true;
}

async function mockFetchActivities ({ uuids }) {
  const request = {
    headers: {
      Accept: 'application/json'
    },
    method: 'GET'
  }
  const activities = [
    process.env.PUBLIC_URL + '/json/textActivity.json',
    process.env.PUBLIC_URL + '/json/imageActivity.json',
    process.env.PUBLIC_URL + '/json/multiChoiceActivity.json'
  ]
  const resposnes = await Promise.all(
    activities.map(activityUrl => window.fetch(activityUrl, request))
  )
  const data = await Promise.all(
    resposnes.map(r => r.json())
  )

  return data.flat().filter(s => uuids.includes(s.uuid))
}
