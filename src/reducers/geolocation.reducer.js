import {
  GEOLOCATION_CHANGED,
  SET_CURRENT_SITE
} from '../constants/geolocation.constants.js'

export const initialState = {
  currentLocation: {},
  currentSite: {
    uuid: "",
    siteType: "none"
  }
}

function geoloaction(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_SITE:
      return {
        ...state,
        currentSite: {
          uuid: action.uuid,
          siteType: action.siteType
        }
      }
    case GEOLOCATION_CHANGED:
      return {
        ...state,
        currentLocation: {
          latitude: action.latitude,
          longitude: action.longitude
        }
      }
    default:
      return state
  }
}

export default geoloaction
