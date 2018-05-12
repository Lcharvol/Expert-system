import {
    map,
    dropLast,
    length,
    split,
    join,
    indexOf,
    replace,
    match,
    inc,
    equals,
} from 'ramda';
import {
    NOT,
    AND,
    OR,
    XOR,
    RIGHT_BRACKET,
    LEFT_BRACKET,
} from './constants/symbols';

export const isABracket = c => equals(c, LEFT_BRACKET) || equals(c, RIGHT_BRACKET);

export const isANot = c => equals(c, NOT);

export const isCapitalizAlpha = c => c !== undefined && length(match('[A-Z]', c));

export const isAnOperator = c => equals(c, AND) || equals(c, OR) || equals(c, XOR);

export const countOperator = str => {
    let count = 0;
    map(c => {
        if(isAnOperator(c)) count = inc(count);
    },str)
    return count;
}

export const haveOnlyAnd = str => {
    let res = true;
    map(c => {
        if((isAnOperator(c) && !equals(c, AND)) ||  equals(c, NOT)) res = false;
    },str);
    return res;
}

export const removeSpace = str => replace(/\s/g, '', str);

export const removeComment = str => {
    const commentPos = indexOf('#', str);

    if (equals(commentPos, -1))
        return str;
        
    return dropLast(str.length - commentPos, str);
};

export const addSpaces = str => join(' ', split('', str));