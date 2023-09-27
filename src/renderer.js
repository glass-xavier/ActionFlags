TIMER_ACTIVE = false

flag_array = new Array()

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
  flag_array.push(Date.now())

  event.target.blur()
}

window.addEventListener('keydown', handleKeyPress, true)

function toggleTimer() {
  console.log('called toggleTimer()')
  if (TIMER_ACTIVE === true) {
    deactivateTimer()
    return
  }
  activateTimer()
}

function activateTimer() {
  flag_array = new Array()
  flag_array.push(Date.now())
  console.log('Pushed start time')
  btn_toggle.innerText = "Stop flagging"
  TIMER_ACTIVE = true
}

function deactivateTimer() {
  flag_array.push(Date.now())
  console.log('Pushed end time')
  TIMER_ACTIVE = false
  btn_toggle.innerText = "Start flagging!"

  console.log(flag_array)

  window.nodeAPI.writeFlagData(flag_array)
}