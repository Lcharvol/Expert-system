import { map, clone, replace } from 'ramda';

import translationKeys from './translationsKeys';

const translateString = str => {
    let translatedString = clone(str);
    map(key => {
        let { regex, translation } = key;
        translatedString = replace(regex, translation, translatedString);
    },translationKeys);
    return translatedString;
};

export const getTranslatedRule = rule => {
    const { rightSide, leftSide, type } = rule;
    return {
        translatedLefttSide: translateString(leftSide.line),
        translatedRightSide: translateString(rightSide.line),
    };
}