const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('nodeAPI', {
  writeFlagData: (file, data) => ipcRenderer.send('write-flag', data)
})