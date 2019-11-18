import {
  OPEN_TEXT,
  CLOSE_TEXT
} from '../constants/textActivity.constants.js'
import { ACTIVITY_TYPE_TEXT } from '../constants/activity.constants.js'

/**
 * @param {string} uuid - the uuid of the text activity to open
 */
export function openText (uuid) {
  return {
    type: OPEN_TEXT,
    uuid,
    activityType: ACTIVITY_TYPE_TEXT
  }
}

/**
 * @param {string} uuid - the uuid of the text activity to close
 */
export function closeText (uuid) {
  return {
    type: CLOSE_TEXT,
    uuid,
    activityType: ACTIVITY_TYPE_TEXT
  }
}
