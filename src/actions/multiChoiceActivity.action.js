import {
  CHOOSE_ANSWER,
  REVEAL_ANSWERS
} from '../constants/multiChoiceActivity.constants.js'

import { ACTIVITY_TYPE_MULTI_CHOICE } from '../constants/activity.constants.js'

/**
 * @param {string} uuid - the uuid of the multiChoiceActivity
 * @param {string} answerId - the id of the answer
 */
export function chooseAnswer (uuid, answerId) {
  return {
    type: CHOOSE_ANSWER,
    activityType: ACTIVITY_TYPE_MULTI_CHOICE,
    uuid,
    answerId
  }
}

/**
 * @param {string} uuid - the uuid of the multiChoiceActivity
 */
export function revealAnswers (uuid) {
  return {
    type: REVEAL_ANSWERS,
    activityType: ACTIVITY_TYPE_MULTI_CHOICE,
    uuid
  }
}

