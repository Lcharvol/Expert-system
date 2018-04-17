import { dropLast } from 'ramda';
import { NOT, AND, OR, XOR, RIGHT_BRACKET, LEFT_BRACKET } from './constants/symbols';

export const isABracket = c => c === LEFT_BRACKET || c === RIGHT_BRACKET;

export const isANot = c => c === NOT;

export const isCapitalizAlpha = c => c !== undefined && c.match('[A-Z]');

export const isAnOperator = c => {
    if(c === AND || c === OR || c === XOR)
        return true;
    return false;
};

export const removeSpace = str => str.replace(/\s/g, '');

export const removeComment = str => {
    const commentPos = str.indexOf('#');

    if (commentPos === -1)
        return str;
        
    return dropLast(str.length - commentPos, str);
};