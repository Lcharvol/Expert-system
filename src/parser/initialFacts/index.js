import { map, times, isNil } from 'ramda';

import { } from './format';
import { LEFT_CHEV, EQUAL, INTERROGATION_POINT } from '../../constants/symbols';
import { isCapitalizAlpha } from '../../utils';
import { checkInitialFactsFormat } from './format';

export const isLineInitialFacts = line => line[0] === EQUAL && (isCapitalizAlpha(line[1]) || isNil(line[1]));

const getAllFacts = (initialFacts, fileContent) => {
    map(line => {
        if(line[0] === INTERROGATION_POINT) return;
        map(char => {
            if(isCapitalizAlpha(char)) {
                initialFacts = {...initialFacts, [char]: false}
            }
        },line)
    }, fileContent)
    return initialFacts;
}

export const setInitialFacts = (initialFacts, line, fileContent) => {
    checkInitialFactsFormat(line);
    initialFacts = getAllFacts(initialFacts, fileContent);
    times(i => initialFacts = {...initialFacts, [line[i + 1]]: true}, line.length - 1)
    return initialFacts
};