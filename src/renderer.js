TIMER_ACTIVE = false
TIME_SINCE_DEACTIVATED = 0

btn_toggle = document.getElementById("btn_toggle")

function handleKeyPress (event) {
  // You can put code here to handle the keypress.
  console.log('called handleKeyPress()')
  if (event.keyCode !== (32 || 49)) {
    return
  }
  if (TIMER_ACTIVE === false) {
    return
  }
  window.nodeAPI.sendFlag(Date.now())

  event.target.blur()
}

window.addEventListener('keydown', handleKeyPress, true)

function toggleTimer() {
  console.log('called toggleTimer()')
  if (TIMER_ACTIVE === true) deactivateTimer()
  activateTimer()
}

function activateTimer() {
  if (TIME_SINCE_DEACTIVATED - Date.now() <= 1000 && TIME_SINCE_DEACTIVATED !== 0) {
    console.log('Too soon to start the timer again. You can try again immediately.')
    return
  }
  window.nodeAPI.timerStart(Date.now())
  console.log('Pushed start time')
  btn_toggle.innerText = "Stop flagging"
  TIMER_ACTIVE = true
}

function deactivateTimer() {
  window.nodeAPI.timerStop(Date.now())
  console.log('Pushed end time')
  TIMER_ACTIVE = false
  btn_toggle.innerText = "Start flagging!"
  TIME_SINCE_DEACTIVATED = Date.now()
}