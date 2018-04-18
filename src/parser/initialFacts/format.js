import { map, drop } from 'ramda';
import { isCapitalizAlpha } from '../../utils';
import { initialFactsFormatExit } from '../../exit';

export const checkInitialFactsFormat = line => map(c => !isCapitalizAlpha(c) && initialFactsFormatExit(line), drop(1, line));
