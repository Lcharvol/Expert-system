import {
    map,
    clone,
    replace,
    contains,
    match,
    length,
    times,
    dropLast,
    isNil,
    drop,
} from 'ramda';

import { isCapitalizAlpha } from '../../../utils';
import { XOR } from '../../../constants/symbols';
import translationKeys from './translationsKeys';

const getPreviousChar = str => {
    let previousChar = undefined;
    map(char => {
        if(isCapitalizAlpha(char)) previousChar = char;
    }, str);
    return previousChar;
}

const getFollowingChar = str => {
    let followingChar = undefined;
    map(char => {
        if(isCapitalizAlpha(char) && isNil(followingChar))
            followingChar = char;
    }, str);
    return followingChar;
};

const translateOneXor = str => {
    const xorPos = str.indexOf(XOR);
    const A = getPreviousChar(dropLast(length(str) - xorPos, str));
    const B = getFollowingChar(drop(xorPos, str));
    const translatedXor = `(${A}&&!${B})||(!${A}&&${B})`;
    const translatedStr = replace(`${A}${XOR}${B}`, translatedXor, str)
    return translatedStr;
}

const translateXor = str => {
    const xorCount = length(match(/\^/g, str));
    times(() => str = translateOneXor(str), xorCount)
    return str;
};

const translateString = str => {
    let translatedString = clone(str);
    map(key => {
        let { regex, translation } = key;
        translatedString = replace(regex, translation, translatedString);
    },translationKeys);
    if(contains(XOR, str)) {
        translatedString = translateXor(translatedString);
    }
    return translatedString;
};

export const getTranslatedRule = rule => {
    const { rightSide, leftSide, type } = rule;
    return {
        translatedLefttSide: translateString(leftSide.line),
        translatedRightSide: translateString(rightSide.line),
    };
}