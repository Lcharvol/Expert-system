import { contains, map, isNil } from 'ramda';

import { IMPLIES, IF_AND_ONLY_IF } from '../constants/symbols';
import { replaceVariableByValue } from './utils';
import { isCapitalizAlpha } from '../utils';

const getAffectedRules = (querie, rules) => {
    let affectedRules = [];
    map(rule => {
        const { rightSide, leftSide, type } = rule;
        const { name } = querie;
        if((contains(name, rightSide.line) && type === IMPLIES) || (contains(name, leftSide.line) && type === IF_AND_ONLY_IF))
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

const forEachAffectedRule = (affectedRules, dataStruct) => {
    const getUsableRule = str => replaceVariableByValue(str, dataStruct.store);
    map(rule => {
        let { translatedRule: { translatedLefttSide, translatedRightSide }} = rule;
        while(eval(getUsableRule(translatedLefttSide)) === undefined) {
            let unknowVar = getUnknowVar(translatedLefttSide, dataStruct.store);
            console.log('unknowVar: ', unknowVar)
            map(v => {
                dataStruct = backwardChaining(v, dataStruct);
            }, unknowVar);
        };
        if(!eval(getUsableRule(translatedLefttSide))) return dataStruct;
    }, affectedRules)
    return dataStruct;
};

const backwardChaining = (querie, dataStruct) => {
    const { rules, store } = dataStruct;
    const affectedRules = getAffectedRules(querie, rules);
    while(store[querie] !== true) {
        let initialStore = dataStruct.store;
        dataStruct = forEachAffectedRule(affectedRules, dataStruct)
        if(dataStruct.store === initialStore) return dataStruct;
    }
    return dataStruct;
};

export default backwardChaining;