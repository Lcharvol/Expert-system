
import { map, uniq } from 'ramda';

import print from './print';
import { RULE_FORMAT_ERROR, ARGS_LENGTH_ERROR, QUERIES_FORMAT_EXIT, QUERIES_NOT_DEFINED_EXIT } from './constants/errors';
import { FgRed } from './constants/colors';
import { addSpaces } from './utils';

export const formatExit = str => {
    print(`${RULE_FORMAT_ERROR}${addSpaces(str)}"`, FgRed);
    process.exit();
}

export const readExit = inputFileName => {
    print(`Cannor read ${inputFileName} file!`, FgRed);
    process.exit();
}

export const argsLengthExit = () => {
    print(ARGS_LENGTH_ERROR, FgRed)
    process.exit();
}

export const queriesFormatExit = str => {
    print(`${QUERIES_FORMAT_EXIT}${str}"`, FgRed);
    process.exit();
}

export const queriesNotDefinedExit = queries => {
    const formatedQueries = map(querie => querie, uniq(queries));
    print(`${QUERIES_NOT_DEFINED_EXIT[0]}${formatedQueries.length > 1 ? 's ': ' '}${formatedQueries}${QUERIES_NOT_DEFINED_EXIT[1]}"`, FgRed);
    process.exit();
}