import { times } from 'ramda';
import { INTERROGATION_POINT } from '../../constants/symbols';
import { checkQueriesFormat } from './format';

export const isLineQueries = line => line[0] === INTERROGATION_POINT;

export const setQueries = (initialQueries, line) => {
    checkQueriesFormat(line);
    times(i => initialQueries = [...initialQueries, { name: line[i + 1], value: undefined}], line.length - 1);
    return initialQueries
};