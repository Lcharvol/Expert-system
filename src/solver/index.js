import { map } from 'ramda';

import { FgGreen } from '../constants/colors';
import print from '../print';
import { getSolutionColor } from '../utils';
import { debugStore } from '../logs';

const util = require('util')

const printSolution = dataStruct => {
    map(querie => {
        const value = dataStruct.store[querie];
        print(`The querie ${querie} is ${value}`, getSolutionColor(value))
    },dataStruct.queries)
};

const solver = dataStruct => {
    debugStore(dataStruct);
    print('\nInput file is right formated!\n', FgGreen)
    printSolution(dataStruct);
    // console.log(util.inspect(dataStruct, false, null));
}

export default solver;