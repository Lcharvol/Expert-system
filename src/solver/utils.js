import { map, join, replace } from 'ramda';

import { FgRed, FgGreen, FgWhite } from '../constants/colors';
import print from '../print';
import { isCapitalizAlpha } from '../utils';

export const replaceVariableByValue = (str, store) => {
    map(c => {
        if(isCapitalizAlpha(c))
            str = replace(c, store[c], str);
    }, str);
    return str;
};

const getSolutionColor = value => {
    if (value === undefined) return FgWhite;
    return value ? FgGreen : FgRed
};

export const printSolution = dataStruct => {
    const { store } = dataStruct;
    map(querie => {
        const { name } = querie;
        const value = store[name];
        print(`     The querie ${name} is ${value}\n`, getSolutionColor(value))
    },dataStruct.queries)
};