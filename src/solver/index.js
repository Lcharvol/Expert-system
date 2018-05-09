import { map } from 'ramda';

import { FgGreen } from '../constants/colors';
import print from '../print';
import { debugStore } from '../logs';
import { printSolution } from './utils';
import backwardChaining from './backwardChaining';

const isInitialFactsContainQuerie = (name, store) => store[name];

const eachQuerie = (querie, dataStruct) => {
    const { store } = dataStruct;
    if(store[querie]) return dataStruct;
    dataStruct = backwardChaining(querie, dataStruct);
    return dataStruct;
};

const solver = dataStruct => {
    const { queries } = dataStruct;
    map(querie => dataStruct = eachQuerie(querie, dataStruct), queries);
    printSolution(dataStruct);
}

export default solver;