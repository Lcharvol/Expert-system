import { map, keys } from 'ramda';

import print from './print';
import { FgGreen, FgRed, FgBlue } from './constants/colors';

const SEPARATOR = '----------';
const SEPARATOR2 = '   ----  '; 

export const debugStore = dataStruct =>  {
    const { store } = dataStruct;
    const facts = keys(store);
    print(SEPARATOR2, FgGreen);
    print(SEPARATOR, FgGreen);
    map(state => {
        const value = store[state]
        const color = value ? FgGreen : FgRed;
        print(` ${state}: ${value}`, color);
    }, facts);
    print(SEPARATOR, FgGreen);
    print(SEPARATOR2, FgGreen);
};