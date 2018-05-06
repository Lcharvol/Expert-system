import { contains, map, isNil, isEmpty, equals } from 'ramda';

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

const forEachAffectedRule = (affectedRules, dataStruct, querie) => {
    const getUsableRule = str => replaceVariableByValue(str, dataStruct.store);
    let lastUnknowVar = undefined;
    map(rule => {
        let { translatedRule: { translatedLefttSide, translatedRightSide }} = rule;
        if(dataStruct.store[querie]) return dataStruct;
        while(eval(getUsableRule(translatedLefttSide)) === undefined) {
            let unknowVar = getUnknowVar(translatedLefttSide, dataStruct.store);
            if(equals(unknowVar, lastUnknowVar)) return dataStruct;
            lastUnknowVar = unknowVar;
            map(v => {
                dataStruct = backwardChaining(v, dataStruct);
            }, unknowVar);
        };
        if(!eval(getUsableRule(translatedLefttSide))) {
            dataStruct.store[translatedRightSide] = false;
            return dataStruct;
        }
        dataStruct.store[translatedRightSide] = true;
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