import { map, drop, contains, isEmpty, keys } from 'ramda';

import { isCapitalizAlpha } from '../../utils';
import { queriesFormatExit, queriesNotDefinedExit } from '../../exit';

export const checkQueriesFormat = line => map(c => !isCapitalizAlpha(c) && queriesFormatExit(line), drop(1, line));

export const areQueriesDefined = dataStruct => {
    const { initialStore, queries } = dataStruct;
    let undefinedQueries = [];
    map(querie => {
        if(!contains(querie, keys(initialStore))) undefinedQueries = [...undefinedQueries, querie];
    },queries);
    if (!isEmpty(undefinedQueries)) queriesNotDefinedExit(undefinedQueries);
}