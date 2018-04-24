import {
    times,
    anyPass,
    isNil,
    equals,
} from 'ramda';

import print from '../../print';
import { isCapitalizAlpha, isAnOperator, isABracket, isANot } from '../../utils';
import { RULE_FORMAT_ERROR } from '../../constants/errors';
import { FgRed } from '../../constants/colors';
import { RIGHT_BRACKET, LEFT_BRACKET } from '../../constants/symbols';
import { formatExit } from '../../exit';

// Here is some checking function

const isCorrectAferAlpha =  anyPass([isNil, isAnOperator, isABracket, isANot, equals(LEFT_BRACKET)]);

const isCorrectAfterOperator = anyPass([isCapitalizAlpha, isANot, equals(RIGHT_BRACKET)]);

const isCorrectAfterANot = anyPass([isCapitalizAlpha, equals(LEFT_BRACKET)]);

export const checkRuleSideFormat = side => {
    // Calls an input function side.length times.
    times(i => {
        // Check if every characters are a letter, an operator or a negation
        if(isCapitalizAlpha(side[i])) {if (!isCorrectAferAlpha(side[i + 1])) formatExit(side)}
        else if (isAnOperator(side[i])) {if(!isCorrectAfterOperator(side[i + 1])) formatExit(side)}
        else if (isANot(side[i])) {if(!isCorrectAfterANot(side[i + 1])) formatExit(side)}
        else if (isABracket(side[i])) {}
        else formatExit(side);
    }, side.length);
    return true;
};