/**
 * @return Promise
 */
export default function getPermission() {
   if (!("Notification" in window)) {
    console.error("This browser does not support desktop notification");
    return Promise.resolve(false)
  }

  return window.Notification.requestPermission().then(function (permission) {
    if (permission === "granted") {
      return true
    } else {
      return false
    }
  }); 
}
