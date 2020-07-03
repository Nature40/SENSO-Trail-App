import {
  EMIT_NOTIFICATION,
  SET_NOTIFICATION_PERMISSION
} from '../constants/notification.constants.js'

/**
 * @param {string} msg - Notification Message
 * @return emitNotificationAction
 */
export function emitNotification(msg) {
  return {
    type: EMIT_NOTIFICATION,
    message: msg
  }
}

/**
 * @param {boolean} allowed - permission to send notifications
 * @return setNotificationPermissionAction
 */
export function setNotificationPermission(allowed) {
  return {
    type: SET_NOTIFICATION_PERMISSION,
    allowed
  }
}
