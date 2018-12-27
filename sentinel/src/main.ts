import { app, BrowserWindow } from 'electron';

// Keep a global reference of the window object, so it won't be garbage collected
let win: BrowserWindow | undefined;

function createWindow () {
  win = new BrowserWindow({ width: 800, height: 600 });
  // TODO: find a better way than hardcoding dist into here
  win.loadFile('./dist/index.html');

  win.webContents.openDevTools();

  // clean up when the window is closed.
  win.on('closed', () => {
    win = undefined;
  });
}

// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS re-create a window in the app when there are no other windows open.
  if (win === undefined) {
    createWindow();
  }
});
