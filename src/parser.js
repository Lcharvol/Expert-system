import { map, dropLast, filter, isEmpty } from 'ramda';

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
        var data = fs.readFileSync(inputFileName, 'utf-8');
        return data;
    } catch(e) {
        print(`Cannor read ${inputFileName} file!`, FgRed);
        process.exit();
    }
}

const removeComment = line => {
    const commentPos = line.indexOf('#');
    if (commentPos === -1) return line;
    return dropLast(line.length - commentPos, line).replace(/\s/g, '');
}

const getFormatedInput = fileContent => {
    let lines = fileContent.split('\n');
    lines = filter(line => line.length > 0, map(removeComment, lines));
    return lines;
}

const parser = () => {
    const args = process.argv;
    checkArgsLength(args);
    const inputFileName = args[2];
    const fileContent = getFormatedInput(readFile(inputFileName));
    console.log(fileContent)
};

export default parser;