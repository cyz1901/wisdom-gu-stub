import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

function initializeApp() {
    createFolder()
}


function createFolder() {
    const homeDirectory = os.homedir();
    const folderPath = path.join(homeDirectory, 'wisdomGu');

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
        console.log('Folder created:', folderPath);
    }
}


export default initializeApp;