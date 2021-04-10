const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// create window
function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  // load index
  win.loadFile('index.html');

  // build menu template
  const mainMenu = Menu.buildFromTemplate(menubar);
  Menu.setApplicationMenu(mainMenu);
}

app.whenReady().then(() => {
  // call create window
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// menu template
const menubar = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        },
      },
    ],
  },
];
