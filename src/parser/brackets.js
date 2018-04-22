import { map, equals, match, length } from 'ramda';

import { bracketsFormatExit } from '../exit';

const checkBracketNumber = side => equals(length(match(/\(/g, side)), length(match(/\)/g, side)));

const checkBracketsBySide = side => {
    if(!checkBracketNumber(side)) bracketsFormatExit(side);
};

export const checkbrackets = dataStruct => {
    const { rules } = dataStruct;
    map(rule => {
        checkBracketsBySide(rule.leftSide.line);
        checkBracketsBySide(rule.rightSide.line);
    }, rules);
};