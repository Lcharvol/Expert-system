import { test, dropLast, drop } from 'ramda';

import { FgRed } from './constants/colors';
import print from './print';
import { RULE_FORMAT_ERROR } from './constants/errors';
import { IMPLIES, IF_AND_ONLY_IF } from './constants/symbols';
import { isCapitalizAlpha } from './utils';

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

const checkRuleSideFormat = side => {
    for (var i = 0; i < side.length; i++) {
        if(isCapitalizAlpha(side[i])) console.log('side[i] : ', side[i])
    }
    return true;
};

const getRuleLeftSideLine = line => {
    let endOfLeftSide = 0;
    for (var i = 0; i < line.length; i++) {
        if(line[i] === '<' || line[i] === '=') break;
        endOfLeftSide++;
    }
    const leftSide = dropLast(line.length - endOfLeftSide, line);
    if(leftSide.length === 0 || !checkRuleSideFormat(leftSide)) {
        print(`${RULE_FORMAT_ERROR}${line}"`, FgRed);
        process.exit();
    }
    return leftSide;
};

const getRuleRightSideLine = line => {
    let endOfLeftSide = 0;
    for (var i = 0; i < line.length; i++) {
        endOfLeftSide++;
        if(line[i] === '>') break;
    }
    const rightSide = drop(endOfLeftSide, line);
    if(rightSide.length === 0 || !checkRuleSideFormat(rightSide)) {
        print(`${RULE_FORMAT_ERROR}${line}"`, FgRed);
        process.exit();
    }
    return rightSide;
};

export const setRule = (rules, line, lineIndex) => {
    rules = {...rules, [lineIndex]: {
        ...rules[lineIndex],
        type: getRuleType(line),
        leftSide: {
            line: getRuleLeftSideLine(line)
        },
        rightSide: {
            line: getRuleRightSideLine(line)
        },
    }}
    return rules;
};