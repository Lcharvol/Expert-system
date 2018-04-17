import print from './print';
import { RULE_FORMAT_ERROR } from './constants/errors';
import { FgRed } from './constants/colors';
import { addSpaces } from './utils';

export const formatExit = str => {
    print(`${RULE_FORMAT_ERROR}${addSpaces(str)}"`, FgRed);
    process.exit();
}