import print from './print';
import { RULE_FORMAT_ERROR, ARGS_LENGTH_ERROR } from './constants/errors';
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