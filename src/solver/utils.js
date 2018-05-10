import {
    map,
    join,
    replace,
    length,
    match,
} from 'ramda';

import { FgRed, FgGreen, FgWhite } from '../constants/colors';
import print from '../print';
import { isCapitalizAlpha, haveOnlyAnd } from '../utils';

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
        let value = store[querie];
        print(`\n    The querie ${querie} is ${value}\n`, getSolutionColor(value))
    },dataStruct.queries)
};

export const isAComplexConclusion = str => {
    const res = haveOnlyAnd(str);
    return res;
};

export const isASimpleConclusion = str => length(str) <= 2;