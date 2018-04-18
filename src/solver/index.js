import { map } from 'ramda';

import { FgGreen } from '../constants/colors';
import print from '../print';
import { getSolutionColor } from '../utils';

const util = require('util')

const printSolution = dataStruct => {
    map(querie => {
        const value = dataStruct.initialFacts[querie];
        print(`The querie ${querie} is ${value}`, getSolutionColor(value))
    },dataStruct.queries)
};

const solver = dataStruct => {
    print('\nInput file is right formated!\n', FgGreen)
    printSolution(dataStruct);
    //console.log(util.inspect(dataStruct, false, null));
}

export default solver;