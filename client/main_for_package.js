const { app, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

let mainWindow;
let pyProc = null;

const createPyProc = () => {
  const script = path.join(__dirname, "resources", "app.exe"); // Adjust path as needed
  pyProc = spawn(script);

  if (pyProc != null) {
    console.log("Python server started");
  }
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Load your React frontend
  mainWindow.loadURL("http://localhost:3000"); // Adjust if your React dev server is running on a different port
};

app.whenReady().then(() => {
  createPyProc();
  createWindow();

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
