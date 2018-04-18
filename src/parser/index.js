import { map, filter, isEmpty } from 'ramda';
import fs from 'fs';

import { FgRed, FgGreen } from '../constants/colors';
import { initialDataStruct } from '../initialDataStruct';
import { isLineInitialFacts, setInitialFacts } from './InitialFacts';
import { isLineQueries, setQueries } from './queries';
import { areQueriesDefined } from './queries/format';
import { setRule } from './rules';
import { readExit, argsLengthExit, queriesNotDefinedExit } from '../exit';
import { removeComment, removeSpace } from '../utils';
import print from '../print';

const checkArgsLength = args => args.length !== 3 && argsLengthExit();

const readFile = inputFileName => {
    try {
        var data = fs.readFileSync(inputFileName, 'utf-8');
        return data;
    } catch(e) {
        readExit(inputFileName)
    };
}

const clean = line => removeSpace(removeComment(line));

const getCleanedInput = fileContent => {
    let lines = fileContent.split('\n');// Split every line of the text file into an array.
    lines = filter(line => line.length > 0, map(clean, lines)); // Clean every line and remove empty one.
    return lines; // Return cleaned line.
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

const finalCheck = dataStruct => {
    areQueriesDefined(dataStruct);
}

const parser = () => {
    const args = process.argv; // Get args from process global object.
    checkArgsLength(args); // Check if we got only one argument.
    const inputFileName = args[2]; // Get the fileName inpute.
    const fileContent = getCleanedInput(readFile(inputFileName)); // Read the file and format it in an array without all spaces and commented text.
    const dataStruct = getFormatedDataStruct(initialDataStruct, fileContent);
    finalCheck(dataStruct); // Now let's start the real parcin to get a proper dataStruct
    return dataStruct;//return the dataStruct to the main function
};

export default parser; // Export the main function