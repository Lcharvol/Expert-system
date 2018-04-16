import { map } from 'ramda';
import { isCapitalizAlpha } from '../utils';

export const isLineInitialFacts = line => line[0] === '=' && line[1] !== '>';

export const getAllFacts = (initialFacts, fileContent) => {
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
    for (var i = 1; i < line.length; i++) {
        initialFacts = {...initialFacts, [line[i]]: true}
    }
    return initialFacts
};