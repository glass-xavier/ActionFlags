const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('nodeAPI', {
  timerStart: (time) => ipcRenderer.send('timer-start', time),
  sendFlag: (time) => ipcRenderer.send('flag', time),
  timerStop: (time) => ipcRenderer.send('timer-stop', time)
})