import { dropLast, length } from 'ramda';
import { NOT, AND, OR, XOR, RIGHT_BRACKET, LEFT_BRACKET } from './constants/symbols';
import { FgRed, FgGreen } from './constants/colors';

export const isABracket = c => c === LEFT_BRACKET || c === RIGHT_BRACKET;

export const isANot = c => c === NOT;

export const isCapitalizAlpha = c => c !== undefined && length(c.match('[A-Z]')) > 0;

export const isAnOperator = c => c === AND || c === OR || c === XOR;

export const removeSpace = str => str.replace(/\s/g, '');

export const removeComment = str => {
    const commentPos = str.indexOf('#');

    if (commentPos === -1)
        return str;
        
    return dropLast(str.length - commentPos, str);
};

export const addSpaces = str => str.split('').join(' ');

export const getSolutionColor = value => value ? FgGreen : FgRed;