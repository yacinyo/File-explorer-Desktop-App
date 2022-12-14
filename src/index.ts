import { app, BrowserWindow ,ipcMain} from 'electron';

import fs from 'fs';
import { rmSync } from 'original-fs';
const path=require('path');


// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


//afficher le contenu du Disk dur C:\\
ipcMain.handle('get-folder-files', (event,...args) => {
  //var directorypath=()
  const dir = fs.readdirSync("C:\\", 
  { withFileTypes: true })
  

  
return dir;
  
})
 
//Cr??er et ??crire un fichier  dans le dossier Files (   C:/Files)


ipcMain.on("save-txt",(event,filenameValue,contentsValue)=>{
  let pathName=path.resolve('C:/','Files');

  let file=path.join(pathName,filenameValue);
  //let contents=fileContents.value
  fs.writeFile(file, contentsValue, err => {
    if (err) {
      console.error(err);
    }
    console.log("fichier cree avec succes")
  });
 })

 //supprimer un fichier
 ipcMain.on("delete-file",(event,filenameValue)=>{
 
  let pathName=path.resolve('C:/','Files');

  let file=path.join(pathName,filenameValue);
 console.log('cest le path suppression'+file)
 
// supprimer un fichier
fs.unlink(file, function (err) {
    if (err) throw err;
    // if no error, file has been deleted successfully
    filenameValue='';
    console.log('File deleted!');
});

    
 })


 
  //ovrir l'??l??ment cliqu??
  //file name value rep??sente ici Le nom de l'??lement cliqu?? (Dossiers et fichiers cach??s) .
 ipcMain.on("read-file",(event,filenameValue)=>{
  
  
  //file ici repr??sente  le chemin compl??t vers le r??pertoir
  let file=path.join("C:\\",filenameValue);

  console.log("cest la filenameValue"+filenameValue)
  
  
  const Open=require('open');
   Open(file);
  
 })

 
 
 

