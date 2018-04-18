import { map, drop, contains, isEmpty } from 'ramda';

import { isCapitalizAlpha } from '../../utils';
import { queriesFormatExit, queriesNotDefinedExit } from '../../exit';

export const checkQueriesFormat = line => map(c => !isCapitalizAlpha(c) && queriesFormatExit(line), drop(1, line));

export const areQueriesDefined = dataStruct => {
    const { initialFacts, queries } = dataStruct;
    let undefinedQueries = [];
    map(querie => {
        if(!contains(querie, initialFacts)) undefinedQueries = [...undefinedQueries, querie];
    },queries);
    if (!isEmpty(undefinedQueries)) queriesNotDefinedExit(undefinedQueries);
}