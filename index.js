const path = require('node:path');
const fs = require('node:fs/promises');

const createFoldersAndFiles = async () =>{
    try{
        const baseDir = path.join(__dirname, 'baseFolder')
        await fs.mkdir(baseDir, { recursive: true });

        const folderNames = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5'];
        const fileNames = ['file1', 'file2', 'file3', 'file4', 'file5'];

        for(let i = 0; i < folderNames.length; i++){
            const folderPath = path.join(baseDir, folderNames[i]);
            await fs.mkdir(folderPath, { recursive: true });

            for (let j = 0; j < fileNames.length; j++){
                const filePath = path.join(folderPath, fileNames[j]);
                await fs.writeFile(filePath, 'hello World');
            }
        }
        const reading = await fs.readdir(baseDir);
        for (let j = 0; j < reading.length; j++){
            const dirPath = path.join(baseDir, reading[j]);
            const stat = await fs.stat(dirPath);
            if (stat.isDirectory()){
                console.log(`Directory: ${reading[j]}`);

                const files = await fs.readdir(dirPath);
                for (let j = 0; j < files.length; j++){
                    const filePath = path.join(dirPath, files[j]);
                    const fileStat = await fs.stat(filePath);
                    if(fileStat.isFile()){
                        console.log(`File: ${files[j]}`)
                    }
                }
            }
        }
    }catch (e){
        console.error(e.error);
    }
}
void createFoldersAndFiles()
