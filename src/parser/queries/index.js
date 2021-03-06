import { times } from 'ramda';
import { INTERROGATION_POINT } from '../../constants/symbols';
import { checkQueriesFormat } from './format';

export const isLineQueries = line => line[0] === INTERROGATION_POINT;

export const setQueries = (initialQueries, line) => {
    checkQueriesFormat(line);
    times(i => initialQueries = [...initialQueries, line[i + 1]], line.length - 1);
    return initialQueries
};