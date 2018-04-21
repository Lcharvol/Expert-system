import { map } from 'ramda';

import { print } from './print';
import { FgGreen } from './constants/colors';

export const debugStore = dataStruct =>  {
    const { store } = dataStruct;
    map(state => {
        print();
    },store);
    process.stdout.write(FgGreen);
    console.log(dataStruct.store)
};