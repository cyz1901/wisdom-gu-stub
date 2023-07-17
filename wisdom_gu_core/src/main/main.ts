import { app, shell, BrowserWindow, ipcMain, contextBridge } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from '../../resources/icon.png?asset'
import geoip from 'geoip-lite';
import os from 'os';

import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import * as dotenv from "dotenv";


function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      // nodeIntegration: false,
      // contextIsolation: true,
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  dotenv.config();




  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.


// 在主进程中定义共享方法
// ipcMain.on('msg1', async (event, data) => {
//   event.sender.send('msg1-reply', 'pong')
// })

ipcMain.on('msg1', async (event, data) => {
  getClientIP()
  console.log(data)
})


function getClientIP() {
  // 获取本机 IP 地址
  const networkInterfaces = os.networkInterfaces();
  const addresses: string[] = [];
  console.log(networkInterfaces.length)
  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    if (!interfaces) {
      continue;
    }
    for (const { address, family, internal } of interfaces) {
      if (family === 'IPv4' && !internal) {

        addresses.push(address);
      }
    }
  }

  // 查询地理位置信息
  addresses.forEach(ipAddress => {
    const geo = geoip.lookup(ipAddress);
    if (geo) {
      console.log(`IP 地址: ${ipAddress}`);
      console.log(`地理位置: ${geo.country}, ${geo.city}`);
    } else {
      console.log(`IP 地址: ${ipAddress}`);
      console.log('无法获取地理位置信息');
    }
  });
}


ipcMain.on('msg2', async (event, data) => {
  console.log(data)
  // connectWithClaude()
})

async function connectWithClaude() {
  const chat = new ChatOpenAI();

  const input = "How to use ChatAnthropic?";
  const response = await chat.call([new HumanMessage(input)]);

  console.log(response);
}

