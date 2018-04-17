import { map, times } from 'ramda';

import { LEFT_CHEV, EQUAL } from '../constants/symbols';
import { isCapitalizAlpha } from '../utils';

export const isLineInitialFacts = line => line[0] === EQUAL && (isCapitalizAlpha(line[1]) || isNill(line[1]));

const getAllFacts = (initialFacts, fileContent) => {
    map(line => {
        map(char => {
            if(isCapitalizAlpha(char)) {
                initialFacts = {...initialFacts, [char]: false}
            }
        },line)
    }, fileContent)
    return initialFacts;
}

export const setInitialFacts = (initialFacts, line, fileContent) => {
    initialFacts = getAllFacts(initialFacts, fileContent);
    times(i => initialFacts = {...initialFacts, [line[i + 1]]: true}, line.length - 1)
    return initialFacts
};