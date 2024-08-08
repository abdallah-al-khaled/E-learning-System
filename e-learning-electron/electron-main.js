const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "My buddy app",
    width: 1920,
    height: 1080,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  mainWindow.webContents.openDevTools();

  mainWindow.loadURL("http://localhost:3001");
}

app.whenReady().then(createMainWindow);