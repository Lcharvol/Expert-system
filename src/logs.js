import { map, keys } from 'ramda';

import print from './print';
import { FgGreen, FgRed, FgBlue } from './constants/colors';

const SEPARATOR = '  ----------';
const SEPARATOR2 = '     ----  '; 

export const debugStore = dataStruct =>  {
    const { store } = dataStruct;
    const facts = keys(store);
    print(SEPARATOR2, FgGreen);
    print(SEPARATOR, FgGreen);
    map(state => {
        const value = store[state];
        const color = value ? FgGreen : FgRed;
        if(value)
            print(` ${state}: true`, color);
        else if (value == undefined)
            print(` ${state}: undefined`, color);
        else
            print(` ${state}: false`, color);
    }, facts);
    print(SEPARATOR, FgGreen);
    print(SEPARATOR2, FgGreen);
};