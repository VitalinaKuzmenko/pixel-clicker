const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const { spawn } = require("child_process");
const isDev = require("electron-is-dev");

let mainWindow;
let pyProc = null;

const createPyProc = () => {
  const script = path.join(__dirname, "resources", "server.exe");
  pyProc = spawn(script);

  if (pyProc != null) {
    console.log("Python server started");
  }
};

const createWindow = () => {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../build/index.html"),
      protocol: "file:",
      slashes: true,
    });

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.webContents.openDevTools();
  mainWindow.loadURL(startUrl);
  // mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
};

app.whenReady().then(() => {
  createWindow();
  createPyProc();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("quit", () => {
  // Kill Python process when Electron exits
  if (pyProc) {
    pyProc.kill();
    pyProc = null;
  }
});

// const { app, BrowserWindow } = require("electron");

// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({ width: 800, height: 600 });
//   mainWindow.loadURL("http://localhost:3000");
//   mainWindow.on("closed", function () {
//     mainWindow = null;
//   });
// }

// app.on("ready", createWindow);

// app.on("window-all-closed", function () {
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

// app.on("activate", function () {
//   if (mainWindow === null) {
//     createWindow();
//   }
// });
