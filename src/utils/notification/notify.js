export default function notify(message) {
  if(!( 'Notification' in window)){
    console.error('This browser does not support desktop notification')
  }

  else if (window.Notification.permission === "granted") {
    console.log('notify')
    const notification = new Notification(message)
    console.log(notification)
  }

  else if (window.Notification.permission !== "denied"){
    console.error('PERM NOT SET')
    throw new Error('Notification Permission not set')
  }
}
