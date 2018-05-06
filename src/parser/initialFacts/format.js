import {
    map,
    drop,
    isEmpty,
} from 'ramda';

import { isCapitalizAlpha } from '../../utils';
import { initialFactsFormatExit, initialFactsNotDefinedExit } from '../../exit';

export const checkInitialFactsFormat = line => map(c => !isCapitalizAlpha(c) && initialFactsFormatExit(line), drop(1, line));

export const areInitialFactsDefined = dataStruct => {
    const { initialStore } = dataStruct;
    if (isEmpty(initialStore)) initialFactsNotDefinedExit();
}