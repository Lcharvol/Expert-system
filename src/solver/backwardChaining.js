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
    uniq,
    find,
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

const getUnknowVar = (str, dataStruct) => {
    const { outVar } = dataStruct;
    let unknowVar = [];
    map(c => {
        if (isCapitalizAlpha(c) && !contains(c, outVar)) unknowVar = [...unknowVar, c];
    }, str)
    return uniq(unknowVar);
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
        let unknowVar = getUnknowVar(translatedLefttSide, dataStruct);
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
            const conclusionQuerie = find(isCapitalizAlpha, translatedRightSide);
            if(equals(dataStruct.store[conclusionQuerie], true) && haveANeg)
                dataStruct.store[conclusionQuerie] = undefined
            else dataStruct.store[conclusionQuerie] = !haveANeg;
        } else if(isAComplexConclusion(translatedRightSide)) {

        } else {

        };
    }, affectedRules)
    return dataStruct;
};

const backwardChaining = (querie, dataStruct) => {
    const { rules, store } = dataStruct;
    const affectedRules = getAffectedRules(querie, rules);
    while(!dataStruct.store[querie]) {
        let initialStore = dataStruct.store;
        dataStruct = forEachAffectedRule(affectedRules, dataStruct, querie)
        if(equals(dataStruct.store, initialStore)) return dataStruct;
    }
    return dataStruct;
};

export default backwardChaining;