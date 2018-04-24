import { contains, map } from 'ramda';

import { IMPLIES, IF_AND_ONLY_IF } from '../constants/symbols';

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

const backwardChaining = (querie, dataStruct) => {
    const { rules } = dataStruct;
    const affectedRules = getAffectedRules(querie, rules);
    console.log('affectedRules: ', affectedRules);
    return dataStruct;
};

export default backwardChaining;