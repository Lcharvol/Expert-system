import { map, contains } from 'ramda';

import { FgGreen } from '../constants/colors';
import { IMPLIES, IF_AND_ONLY_IF } from '../constants/symbols.js';
import print from '../print';
import { getSolutionColor } from '../utils';
import { debugStore } from '../logs';

const util = require('util')

const printSolution = dataStruct => {
    const { store } = dataStruct;
    map(querie => {
        const { name } = querie;
        const value = store[name];
        print(` The querie ${name} is ${value}`, getSolutionColor(value))
    },dataStruct.queries)
};

const getAffectedRules = (querie, rules) => {
    let affectedRules = [];
    map(rule => {
        const { rightSide, leftSide, type } = rule;
        const { name } = querie;
        if((contains(name, rightSide.line) && type === IMPLIES) || (contains(name, leftSide.line) && type === IF_AND_ONLY_IF)) {
            affectedRules = [...affectedRules, rule];
        }
    } ,rules)
    return affectedRules;
};

const backwardChaining = (querie, dataStruct) => {
    const { rules } = dataStruct;
    const affectedRules = getAffectedRules(querie, rules);
    console.log('affectedRules: ', affectedRules);
    return dataStruct;
};

const isInitialFactsContainQuerie = (name, store) => store[name];

const eachQuerie = (querie, dataStruct) => {
    const { store } = dataStruct;
    const { name } = querie;
    if(isInitialFactsContainQuerie(name, store)) return dataStruct;
    dataStruct = backwardChaining(querie, dataStruct);
    debugStore(dataStruct);
    return dataStruct;
};

const start = dataStruct => {
    const { queries } = dataStruct;
    print('Initial State: ')
    debugStore(dataStruct);
    map(querie => dataStruct = eachQuerie(querie, dataStruct),queries)
    return dataStruct;
};

const solver = dataStruct => {
    print('\nInput file is right formated!\n', FgGreen);
    dataStruct = start(dataStruct);
    printSolution(dataStruct);
    // console.log(util.inspect(dataStruct, false, null));
}

export default solver;