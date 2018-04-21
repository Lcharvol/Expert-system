import { map, equals, match, length } from 'ramda';

const checkBracketNumber = side => equals(length(match(/\(/, '((((E+!F))))')), length(match('/\(/', '((((E+!F))))')));

const checkBracketsBySide = side => {
    console.log(checkBracketNumber(side))
};

export const checkbrackets = dataStruct => {
    const { rules } = dataStruct;
    map(rule => {
        checkBracketsBySide(rule.leftSide);
        checkBracketsBySide(rule.rightSide);
    }, rules);
};