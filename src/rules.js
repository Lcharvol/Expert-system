import { test } from 'ramda';

import { FgRed } from './constants/colors';
import print from './print';
import { RULE_FORMAT_ERROR } from './constants/errors';
import { IMPLIES, IF_AND_ONLY_IF } from './constants/symbols';

const getRuleType = line => {
    const impliesRegex = new RegExp(`(${IMPLIES})`);
    const ifAndOnlyIfRegex = new RegExp(`(${IF_AND_ONLY_IF})`);

    if(test(ifAndOnlyIfRegex, line)) {
        return IF_AND_ONLY_IF;
    } else if(test(impliesRegex, line)) {
        return IMPLIES;
    } else {
        print(`${RULE_FORMAT_ERROR}${line}"`, FgRed);
        process.exit();
    }
};

export const setRule = (rules, line, lineIndex) => {
    rules = {...rules, [lineIndex]: {
        ...rules[lineIndex],
        line,
        type: getRuleType(line),
    }}
    return rules;
}