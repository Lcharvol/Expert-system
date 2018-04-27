import { map } from 'ramda';

import { FgGreen } from '../constants/colors';
import print from '../print';
import { debugStore } from '../logs';
import { printSolution } from './utils';
import backwardChaining from './backwardChaining';

const util = require('util')

const isInitialFactsContainQuerie = (name, store) => store[name];

const eachQuerie = (querie, dataStruct) => {
    const { store } = dataStruct;
    const { name } = querie;
    if(isInitialFactsContainQuerie(name, store)) return dataStruct;
    dataStruct = backwardChaining(querie, dataStruct);
    //debugStore(dataStruct);
    return dataStruct;
};

const start = dataStruct => {
    const { queries } = dataStruct;
    print('Initial State: ')
    //debugStore(dataStruct);
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