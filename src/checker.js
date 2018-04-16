import { isEmpty } from 'ramda';

import { FgRed } from './constants/colors';
import { NO_RULES_ERROR, NO_QUERIES_ERROR, NO_INITIAL_FACTS_ERROR } from './constants/errors';
import print from './print';

// Let's check if every section of our data struct are filled with data.
// If this is not the case, the program exit displaying an appropriate error.
const checker = dataStruct => {
    if(isEmpty(dataStruct.initialFacts)) {
        print(NO_INITIAL_FACTS_ERROR, FgRed);
        process.exit();
    };
    if(isEmpty(dataStruct.rules)) {
        print(NO_RULES_ERROR, FgRed);
        process.exit();
    };
    if(isEmpty(dataStruct.queries)) {
        print(NO_QUERIES_ERROR, FgRed);
        process.exit();
    };
};

export default checker;