import print from './print';
import { RULE_FORMAT_ERROR } from './constants/errors';
import { FgRed } from './constants/colors';

export const formatExit = side => {
    print(`${RULE_FORMAT_ERROR}${side}"`, FgRed);
    process.exit();
}