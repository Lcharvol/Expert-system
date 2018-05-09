import {
    contains,
    map,
    isNil,
    isEmpty,
    equals,
    match,
    length,
    is,
    without,
} from 'ramda';

import { IMPLIES, IF_AND_ONLY_IF } from '../constants/symbols';
import { replaceVariableByValue } from './utils';
import { isCapitalizAlpha } from '../utils';
import { debugStore } from '../logs';

const getAffectedRules = (querie, rules) => {
    let affectedRules = [];
    map(rule => {
        const { rightSide, leftSide, type } = rule;
        if((contains(querie, rightSide.line) && type === IMPLIES) || (contains(querie, leftSide.line) && type === IF_AND_ONLY_IF))
            affectedRules = [...affectedRules, rule];
    } ,rules)
    return affectedRules;
};

const getUnknowVar = (str, store) => {
    let unknowVar = [];
    map(c => {
        if (isCapitalizAlpha(c) && isNil(store[c])) unknowVar = [c, ...unknowVar];
    }, str)
    return unknowVar;
}

const isAComplexConclusion = str => {
    console.log('str: ', str);
    return false;
};

const isASimpleConclusion = str => length(str) <= 2;

const forEachAffectedRule = (affectedRules, dataStruct, querie) => {
    const getUsableRule = str => replaceVariableByValue(str, dataStruct.store);
    let lastUnknowVar = undefined;
    map(rule => {
        let { translatedRule: { translatedLefttSide, translatedRightSide }} = rule;
        let unknowVar = getUnknowVar(translatedLefttSide, dataStruct.store);
        while(length(unknowVar)) {
            if(equals(unknowVar, lastUnknowVar)) return dataStruct;
            lastUnknowVar = unknowVar;
            map(v => {
                if(contains(v, dataStruct.outVar)) return v;
                dataStruct.outVar = [...dataStruct.outVar, v];
                dataStruct = backwardChaining(v, dataStruct);
                unknowVar = without(v, unknowVar);
            }, unknowVar);
        };
        const result = eval(getUsableRule(translatedLefttSide));
        if(!result) return dataStruct;
        if(isASimpleConclusion(translatedRightSide)) {
            const haveANeg = length(match(/!/g, translatedRightSide)) > 0;
            dataStruct.store[translatedRightSide] = haveANeg ? !result : result;
        } else if(isAComplexConclusion(translatedRightSide)) {

        } else {

        };
    }, affectedRules)
    return dataStruct;
};

const backwardChaining = (querie, dataStruct) => {
    const { rules, store } = dataStruct;
    const affectedRules = getAffectedRules(querie, rules);
    if(isEmpty(affectedRules)) return dataStruct;
    while(!dataStruct.store[querie]) {
        let initialStore = dataStruct.store;
        dataStruct = forEachAffectedRule(affectedRules, dataStruct, querie)
        if(dataStruct.store === initialStore) return dataStruct;
    }
    return dataStruct;
};

export default backwardChaining;