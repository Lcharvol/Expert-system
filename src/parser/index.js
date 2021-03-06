import {
    map,
    filter,
    isEmpty,
    split,
} from 'ramda';
import fs from 'fs';

import { FgRed, FgGreen } from '../constants/colors';
import { RIGHT_ARGS_LENGTH } from '../constants/utils';
import { BS } from '../constants/symbols'
import { initialDataStruct } from '../initialDataStruct';
import { isLineInitialFacts, setInitialFacts } from './InitialFacts';
import { isLineQueries, setQueries } from './queries';
import { areQueriesDefined } from './queries/format';
import { areInitialFactsDefined } from './initialFacts/format';
import { setRule } from './rules';
import { getTranslatedRule } from './rules/translation';
import { readExit, argsLengthExit, queriesNotDefinedExit } from '../exit';
import print from '../print';
import { removeComment, removeSpace } from '../utils';
import { checkbrackets } from './brackets';
import { resetStore } from '../store';

const cleanInputLine = line => removeSpace(removeComment(line));

const checkArgsLength = args => args.length !== RIGHT_ARGS_LENGTH && argsLengthExit();

const readFile = inputFileName => {
    try {
        var data = fs.readFileSync(inputFileName, 'utf-8');
        return data;
    } catch(e) {
        readExit(inputFileName)
    };
}

const getCleanedInput = fileContent => {
    let lines = split(BS, fileContent);// Split every line of the text file into an array.
    lines = filter(line => line.length, map(cleanInputLine, lines)); // Clean every line and remove empty one.
    return lines; // Return cleaned line.
}

const getFormatedDataStruct = (initialDataStruct, fileContent) => {
    // Map on fileContent array to get every line.
    fileContent.map((line, index) => {
        // Check if the line is initialFacts, queries or rules
        if(isLineInitialFacts(line))
            initialDataStruct.initialStore = setInitialFacts(initialDataStruct.initialStore, line, fileContent);
        else if(isLineQueries(line))
            initialDataStruct.queries = setQueries(initialDataStruct.queries, line);
        else if(!isEmpty(line))
            initialDataStruct.rules = setRule(initialDataStruct.rules, line, index);
    });
    initialDataStruct.outVar = [];
    return initialDataStruct;
};

const finalCheck = dataStruct => {
    areInitialFactsDefined(dataStruct);
    areQueriesDefined(dataStruct);
    checkbrackets(dataStruct);
}

const translateLines = dataStruct => {
    dataStruct.rules = map(rule => ({
        ...rule,
        translatedRule: getTranslatedRule(rule),
    }),dataStruct.rules);
    return dataStruct;
}

const parser = settings => {
    // Get args from settings.
    const { args } = settings;
    // Check if we got only one argument.
    checkArgsLength(args);
     // Get the fileName inpute.
    const inputFileName = args[2];
    // Read the file and format it in an array without all spaces and commented text.
    const fileContent = getCleanedInput(readFile(inputFileName));
    // Now let's start the real parcin to get a proper dataStruct
    let dataStruct = getFormatedDataStruct(initialDataStruct, fileContent);
    // Final check for existing queries
    finalCheck(dataStruct);
    dataStruct = resetStore(translateLines(dataStruct));
    //return the dataStruct to the main function
    return dataStruct;
};

export default parser; // Export the main function