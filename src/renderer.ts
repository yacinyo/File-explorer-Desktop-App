/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import { MenuItem } from 'electron';
import { readFile } from 'original-fs';
import './index.css';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

onLoad();


async function onLoad() {
   
     


const fileList = await window.electronApi.getFolderFiles();
const fileListContainer=document.querySelector('#filesList');
fileListContainer.appendChild(renderDirectoryFiles(fileList));








}


function renderDirectoryFiles(fileList):HTMLElement{
    const divGlobale = document.createElement('div');
    for(const item of fileList){
    
    const divElementToshow=document.createElement('div');
        
       const divForfile = document.createElement('div');
        divForfile.innerHTML = item.name ; //listing des éléments présents sur disque C://

        divElementToshow.appendChild(divForfile);
        const divForButtons=document.createElement('div');
        divElementToshow.appendChild(divForButtons);

        
        //création d'un boutton read  pour chaque fichier afin de le cliquer
        const btnRead= document.createElement('button');
        btnRead.setAttribute("class", "buttons");
        btnRead.innerHTML='read file';
        
        
        //ajout d'un événement "récuperation du nom de l'élément cliqué" au boutton read file
        btnRead.addEventListener("click", ()=>{
        const filenameValue=item.name;
        

        //passer le  nom du fichier cliqué au preload 
        window.electronApi.readFile(filenameValue);
         
       

         });
       
         divForButtons.appendChild(btnRead);
        
        

         

        

    divGlobale.appendChild(divElementToshow);

        }

return divGlobale;
   
       }
   
       //event du bouton create définition de son événement.
    const  btnCreate=document.getElementById("create-file");
     
    btnCreate.addEventListener("click",(file)=>{
        
        const filename=document.getElementById("file-name")  ; 
        const filenameValue=(document.getElementById("file-name")  as HTMLInputElement).value ;
       
     const content=document.getElementById("file-content");
        
     const contentsValue=(document.getElementById("file-contents") as HTMLTextAreaElement).value;
     
     window.electronApi.createFile(filenameValue,contentsValue);
    
     })

      //event du bouton delete 
     
       const btnDelete=document.getElementById("delete-file");
       btnDelete.addEventListener("click",(file)=>{
       const  filenameValue=(document.getElementById('file-name') as HTMLInputElement).value;
     
       //const contentsValue=(document.getElementById("file-contents") as HTMLTextAreaElement).value;
     
       window.electronApi.deleteFile(filenameValue);

       })
     
      //enevent du boutton delete file   
      
    
     
      

     