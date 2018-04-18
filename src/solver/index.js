import { map } from 'ramda';

import { FgGreen } from '../constants/colors';
import print from '../print';
import { getSolutionColor } from '../utils';

const util = require('util')

const printSolition = dataStruct => {
    map(querie => {
        const value = dataStruct.initialFacts[querie];
        print(`The querie ${querie} is ${value}`, getSolutionColor(value))
    },dataStruct.queries)
};

const solver = dataStruct => {
    print('Solver start', FgGreen)
    printSolition(dataStruct);
}

export default solver;