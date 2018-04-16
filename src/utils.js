import { dropLast } from 'ramda';
import { NOT, AND, OR, XOR, RIGHT_BRACKET, LEFT_BRACKET } from './constants/symbols';

export const isCapitalizAlpha = char => char.match('[A-Z]');

export const isAnOperator = char => {
    if(char === (NOT || AND || OR || XOR || RIGHT_BRACKET || LEFT_BRACKET))
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