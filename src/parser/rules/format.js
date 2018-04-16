import print from '../../print';
import { isCapitalizAlpha, isAnOperator } from '../../utils';
import { RULE_FORMAT_ERROR } from '../../constants/errors';
import { FgRed } from '../../constants/colors';
import { isABracket, isANot } from '../../utils';

export const checkRuleSideFormat = side => {
    for (var i = 0; i < side.length; i++) {
        if(isCapitalizAlpha(side[i])) {
            if(side[i + 1] !== undefined && !isAnOperator(side[i + 1])) {
                print(`${RULE_FORMAT_ERROR}${side}"`, FgRed);
                process.exit();
            }
        }
        if (isAnOperator(side[i])) {
            if(side[i + 1] !== undefined && !isCapitalizAlpha(side[i + 1]) && !isANot(side[i + 1])) {
                print(`${RULE_FORMAT_ERROR}${side}"`, FgRed);
                process.exit();
            }
        }
    }
    return true;
};