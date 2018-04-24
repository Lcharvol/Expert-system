import { map } from 'ramda';

import { FgRed, FgGreen, FgWhite } from '../constants/colors';
import print from '../print';

const getSolutionColor = value => {
    if (value === undefined) return FgWhite;
    return value ? FgGreen : FgRed
};

export const printSolution = dataStruct => {
    const { store } = dataStruct;
    map(querie => {
        const { name } = querie;
        const value = store[name];
        print(` The querie ${name} is ${value}`, getSolutionColor(value))
    },dataStruct.queries)
};