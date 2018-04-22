import { map } from 'ramda';

import { FgGreen } from '../constants/colors';
import print from '../print';
import { getSolutionColor } from '../utils';
import { debugStore } from '../logs';

const util = require('util')

const printSolution = dataStruct => {
    map(querie => {
        const { name, valie} = querie;
        const value = dataStruct.store[querie];
        print(`The querie ${name} is ${value}`, getSolutionColor(value))
    },dataStruct.queries)
};

const start = dataStruct => {
    print('Initial State: ')
    debugStore(dataStruct);
    return dataStruct;
};

const solver = dataStruct => {
    print('\nInput file is right formated!\n', FgGreen);
    dataStruct = start(dataStruct);
    printSolution(dataStruct);
    // console.log(util.inspect(dataStruct, false, null));
}

export default solver;