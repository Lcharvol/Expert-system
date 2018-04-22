import {
    dropLast,
    length,
    split,
    join,
    indexOf,
    replace,
    match,
} from 'ramda';
import { NOT, AND, OR, XOR, RIGHT_BRACKET, LEFT_BRACKET } from './constants/symbols';
import { FgRed, FgGreen, FgWhite } from './constants/colors';

export const isABracket = c => c === LEFT_BRACKET || c === RIGHT_BRACKET;

export const isANot = c => c === NOT;

export const isCapitalizAlpha = c => c !== undefined && length(match('[A-Z]', c));

export const isAnOperator = c => c === AND || c === OR || c === XOR;

export const removeSpace = str => replace(/\s/g, '', str);

export const removeComment = str => {
    const commentPos = indexOf('#', str);

    if (commentPos === -1)
        return str;
        
    return dropLast(str.length - commentPos, str);
};

export const addSpaces = str => join(' ', split('', str));

export const getSolutionColor = value => {
    if (value === undefined) return FgWhite;
    return value ? FgGreen : FgRed
};