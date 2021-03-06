
import { map, uniq } from 'ramda';

import print from './print';
import {
    RULE_FORMAT_ERROR,
    ARGS_LENGTH_ERROR,
    QUERIES_FORMAT_EXIT,
    QUERIES_NOT_DEFINED_EXIT,
    INITIAL_FACTS_FORMAT_EXIT,
    READ_ERROR,
    BRACKETS_FORMAT_EXIT,
    INITIAL_FACTS_NOT_DEFINED_EXIT,
    IF_AND_ONLY_IF_EXIT,
    CONCLUSION_FORMAT_EXIT,
} from './constants/errors';
import { FgRed } from './constants/colors';
import { addSpaces } from './utils';

export const formatExit = str => {
    print(`${RULE_FORMAT_ERROR}${addSpaces(str)}"`, FgRed);
    process.exit();
};

export const readExit = inputFileName => {
    print(`${READ_ERROR[0]}${inputFileName}${READ_ERROR[1]}`, FgRed);
    process.exit();
};

export const argsLengthExit = () => {
    print(ARGS_LENGTH_ERROR, FgRed)
    process.exit();
};

export const queriesFormatExit = str => {
    print(`${QUERIES_FORMAT_EXIT}${str}"`, FgRed);
    process.exit();
};

export const queriesNotDefinedExit = queries => {
    const formatedQueries = map(querie => querie, uniq(queries));
    print(`${QUERIES_NOT_DEFINED_EXIT[0]}${formatedQueries.length > 1 ? 's ': ' '}${formatedQueries}${QUERIES_NOT_DEFINED_EXIT[1]}"`, FgRed);
    process.exit();
};

export const initialFactsNotDefinedExit = () => {
    print(INITIAL_FACTS_NOT_DEFINED_EXIT, FgRed);
    process.exit();
};

export const initialFactsFormatExit = str => {
    print(`${INITIAL_FACTS_FORMAT_EXIT}${str}"`, FgRed);
    process.exit();
};

export const bracketsFormatExit = str => {
    print(`${BRACKETS_FORMAT_EXIT}${str}`, FgRed);
    process.exit();
};

export const ifAndOnlyIfExit = str => {
    print(`${IF_AND_ONLY_IF_EXIT}`, FgRed);
    process.exit();
};

export const conclusionFormatExit = str => {
    print(`${CONCLUSION_FORMAT_EXIT}${str}"`, FgRed);
    process.exit();
};