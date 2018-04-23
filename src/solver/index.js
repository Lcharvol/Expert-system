import { map } from 'ramda';

import { FgGreen } from '../constants/colors';
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

const isInitialFactsContainQuerie = (name, store) => store[name];

const eachQuerie = (querie, dataStruct) => {
    const { store } = dataStruct;
    const { name } = querie;
    debugStore(dataStruct);
    if(isInitialFactsContainQuerie(name, store)) return dataStruct;
    return dataStruct;
};

const start = dataStruct => {
    const { queries } = dataStruct;
    console.log('dataStruct: ', dataStruct)
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