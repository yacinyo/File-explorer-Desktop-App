// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";


contextBridge.exposeInMainWorld('electronApi', {
    
    getFolderFiles: ()=> ipcRenderer.invoke('get-folder-files'),
    createFile:(filenameValue:string,contentsValue:string)=>ipcRenderer.send("save-txt",filenameValue,contentsValue),
    readFile:(filenameValue: string)=>ipcRenderer.send("read-file",filenameValue),
    deleteFile:(filenameValue:string)=>ipcRenderer.send("delete-file",filenameValue)

});

