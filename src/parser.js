import { map } from 'ramda';

import { ARGS_LENGTH_ERROR } from './constants/args';
import { FgRed, FgGreen } from './constants/colors';
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

const clearComment = fileContent => {
    let lines = fileContent.split('\n');
    lines = map(line => '', lines);
    print(lines, FgGreen);
}

const parser = () => {
    const args = process.argv;
    checkArgsLength(args);
    const inputFileName = args[2];
    const fileContent = clearComment(readFile(inputFileName));
};

export default parser;