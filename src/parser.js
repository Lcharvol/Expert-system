import { ARGS_LENGTH_ERROR } from './constants/args';
import { FgRed } from './constants/colors';
import print from './print';
import fs from 'fs';

const checkArgsLength = args => {
    if(args.length !== 3) {
        print(ARGS_LENGTH_ERROR)
        process.exit();
    };
};

const readFile = inputFileName => {
    try {  
        var data = fs.readFileSync(inputFileName, 'utf8');
        return data;
    } catch(e) {
        print(`Cannor read ${inputFileName} file!`, FgRed);
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