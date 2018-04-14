import { ARGS_LENGTH_ERROR } from './constants/args';
import fs from 'fs';

const checkArgsLength = args => {
    if(args.length !== 3) {
        console.log(ARGS_LENGTH_ERROR)
        process.exit();
    };
};

const readFile = inputFileName => {
    try {  
        var data = fs.readFileSync(inputFileName, 'utf8');
        return data;
    } catch(e) {
        console.log(`Cannor read ${inputFileName} file!`);
        process.exit();
    }
}

const parser = () => {
    const args = process.argv;
    checkArgsLength(args);
    const inputFileName = args[2];
    const fileContent = readFile(inputFileName)
};

export default parser;