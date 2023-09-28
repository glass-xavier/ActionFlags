const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path');
const fs = require('fs');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.on('timer-start', startTimer);
  ipcMain.on('flag', addFlag);
  ipcMain.on('timer-stop', stopTimer);
  createWindow();

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});





// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
flag_array = new Array();

//event handlers
function startTimer(e, flag) {
  console.log("Starting timer from main!");
  flag_array = new Array();
  flag_array.push(flag);
}

function addFlag(e, flag) {
  console.log("Adding flag from main!");
  flag_array.push(flag);
}

function stopTimer(e, flag) {
  console.log("Stopping timer from main!");
  flag_array.push(flag);
  saveFile();
}

//File IO
async function saveFile() {
  let current_date = getCurrentDateFormatted()
  let file_obj = await dialog.showSaveDialog(createDialogOptions(current_date));

  if (file_obj.canceled === true) {
    console.log("File save cancelled. Flag data is still being kept, but will be erased if a new timer is started.");
    return
  }

  let formatted_flags = formatFlags();
  let write_stream = fs.createWriteStream(file_obj.filePath);
  write_stream.write('Keylogs from ' + current_date + '\n');
  formatted_flags.forEach((flag) => {
    write_stream.write(flag + '\n');
  })
  write_stream.close()
}

//returns a string in the format of hour:minute_month_day_year for filename
function getCurrentDateFormatted() {
  let current_date_ms = new Date(Date.now());
  let current_month = current_date_ms.getMonth() + 1;
  let current_dayofmonth = current_date_ms.getDate();
  let current_year = current_date_ms.getFullYear();
  let current_hour = current_date_ms.getHours();
  let current_minute = current_date_ms.getMinutes();

  let current_date_string = current_hour + '-' +
                        current_minute + '_' +
                        current_month + '_' +
                        current_dayofmonth + '_' +
                        current_year;
  return current_date_string;
}

//creates an object for the dialog options arg with the date formatted as a filename
function createDialogOptions(current_date) {
  let dialog_options = {};
  dialog_options.title = 'Save keyframe file as...';
  dialog_options.defaultPath = current_date + '.txt';
  dialog_options.filters = {filters: [{ name: 'Text Files', extensions: ['txt'] }] };
  dialog_options.properties = ['createDirectory'];
  return dialog_options;
}

//takes flags from flag_array and returns a string array formatted for timestamps
function formatFlags() {
  console.log(flag_array.length)
  if (flag_array.length < 2) {
    throw new Error('Somehow flag array has less than two flags...');
  }
  let formatted_flags = new Array()
  let start_time = flag_array.at(0);
  flag_array.forEach((flag) => {
    flag_time_ms = flag - start_time;
    flag_time_formatted = msToTime(flag_time_ms);
    formatted_flags.push(flag_time_formatted);
  })
  return formatted_flags;
}

//stolen from Dusht on StackOverflow lmao
//takes time in ms, returns a human readable time format
function msToTime(duration) {
  var milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}