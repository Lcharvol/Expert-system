import { map, filter, isEmpty } from 'ramda';
import fs from 'fs';

import { ARGS_LENGTH_ERROR } from './constants/errors';
import { FgRed, FgGreen } from './constants/colors';
import { initialDataStruct } from './constants/initialDataStruct';
import { isLineInitialFacts, setInitialFacts } from './InitialFacts';
import { isLineQueries, setQueries } from './queries';
import { setRule } from './rules';
import { removeComment, removeSpace } from './utils';
import print from './print';

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

// Cleaning line function
const clean = line => removeSpace(removeComment(line));

const getCleanedInput = fileContent => {
    let lines = fileContent.split('\n');
    lines = filter(line => line.length > 0, map(clean, lines));
    return lines;
}

const getFormatedDataStruct = (initialDataStruct, fileContent) => {
    // Map on fileContent array to get every line.
    fileContent.map((line, index) => {
        // Check if the line is initialFacts, queries or rules
        if(isLineInitialFacts(line))
            initialDataStruct.initialFacts = setInitialFacts(initialDataStruct.initialFacts, line, fileContent);
        else if(isLineQueries(line))
            initialDataStruct.queries = setQueries(initialDataStruct.queries, line);
        else if(!isEmpty(line))
            initialDataStruct.rules = setRule(initialDataStruct.rules, line, index);
    });
    return initialDataStruct;
};

const parser = () => {
    const args = process.argv; // Get args from process global object.
    checkArgsLength(args); // Check if we got only one argument.
    const inputFileName = args[2]; // Get the fileName inpute.
    const fileContent = getCleanedInput(readFile(inputFileName)); // Read the file and format it in an array without all spaces and commented text.
    const dataStruct = getFormatedDataStruct(initialDataStruct, fileContent); // Now let's start the real parcin to get a proper dataStruct
    return dataStruct;//return the dataStruct to the main function
};

export default parser; // Export the main function