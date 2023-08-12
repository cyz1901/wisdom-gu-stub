import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { FileNode } from '../../common/models/fileNode';
import { ipcMain } from 'electron';

function initializeApp() {
    initializeFolder()
    initializeCoreDataFolder()
}



function initializeFolder() {
    createFolder()
    createCoreDataFolder()
}

function createFolder() {
    const homeDirectory = os.homedir();
    const folderPath = path.join(homeDirectory, 'wisdomGu');

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
        console.log('Folder created:', folderPath);
    }
}


function createCoreDataFolder() {
    //create folder named coreData in wisdomGu folder
    const homeDirectory = os.homedir();
    const folderPath = path.join(homeDirectory, 'wisdomGu', 'coreData');

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
        console.log('Folder created:', folderPath);
    }
}

function initializeCoreDataFolder() {
    const homeDirectory = os.homedir();
    const folderPath = path.join(homeDirectory, 'wisdomGu', 'coreData');
    const fileTree: FileNode = {
        name: 'coreData',
        path: folderPath,
        isDirectory: true,
        children: getAllCoreDataFolderFiles(folderPath),
    };

    // Send fileTree to renderer process
    ipcMain.on('getAllCoreDataFolderFiles', (event, _) => {
        event.reply('getAllCoreDataFolderFiles-reply', fileTree);
    });
}


function getAllCoreDataFolderFiles(folderPath: string): FileNode[] {
    const files = fs.readdirSync(folderPath);
    const fileNodes: FileNode[] = [];

    files.forEach((file) => {
        const filePath = path.join(folderPath, file);
        const fileStat = fs.statSync(filePath);
        const fileNode: FileNode = {
            name: file,
            path: filePath,
            isDirectory: fileStat.isDirectory(),
            children: [],
        };

        if (fileStat.isDirectory()) {
            fileNode.children = getAllCoreDataFolderFiles(filePath); // Recursively get children
        }

        fileNodes.push(fileNode); // Add the fileNode to the array
    });

    return fileNodes;
}



export default initializeApp;