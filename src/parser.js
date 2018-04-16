import { map, dropLast, filter, isEmpty } from 'ramda';

import { ARGS_LENGTH_ERROR } from './constants/errors';
import { FgRed, FgGreen } from './constants/colors';
import { initialDataStruct } from './constants/initialDataStruct';
import { isLineInitialFacts, setInitialFacts } from './InitialFacts';
import { isLineQueries, setQueries } from './queries';
import { setRule } from './rules';
import print from './print';
import fs from 'fs';

const checkArgsLength = args => {
    if(args.length !== 3) {
        print(ARGS_LENGTH_ERROR, FgRed)
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

const getCleanedInput = fileContent => {
    let lines = fileContent.split('\n');
    lines = filter(line => line.length > 0, map(removeComment, lines));
    return lines;
}

const getFormatedDataStruct = (initialDataStruct, fileContent) => {
    let newDataStruct = initialDataStruct;
    fileContent.map((line, index) => {
        if(isLineInitialFacts(line)) newDataStruct.initialFacts = setInitialFacts(newDataStruct.initialFacts, line, fileContent);
        else if(isLineQueries(line)) newDataStruct.queries = setQueries(newDataStruct.queries, line);
        else newDataStruct.rules = setRule(newDataStruct.rules, line, index);
    });
    return newDataStruct;
};

const parser = () => {
    const args = process.argv;
    checkArgsLength(args);
    const inputFileName = args[2];
    const fileContent = getCleanedInput(readFile(inputFileName));
    const dataStruct = getFormatedDataStruct(initialDataStruct, fileContent);
    return dataStruct;
};

export default parser;