import { test, dropLast, drop, times, indexOf } from 'ramda';

import { FgRed } from '../../constants/colors';
import print from '../../print';
import { RULE_FORMAT_ERROR } from '../../constants/errors';
import { IMPLIES, IF_AND_ONLY_IF, RIGHT_CHEV, LEFT_CHEV, EQUAL, OR, XOR } from '../../constants/symbols';
import { checkRuleSideFormat } from './format';
import { formatExit, ifAndOnlyIfExit, conclusionFormatExit } from '../../exit';

const getRuleType = line => {
    const impliesRegex = new RegExp(`(${IMPLIES})`);
    const ifAndOnlyIfRegex = new RegExp(`(${IF_AND_ONLY_IF})`);

    if(test(ifAndOnlyIfRegex, line)) {
        return ifAndOnlyIfExit();
    } else if(test(impliesRegex, line)) {
        return IMPLIES;
    } else formatExit(line);
};

const getRuleLeftSideLine = line => {
    const leftChevIndex = indexOf(LEFT_CHEV, line);
    const equalIndex = indexOf(EQUAL, line)
    const endOfLeftSide = leftChevIndex !== -1 ? leftChevIndex : equalIndex;
    const leftSide = dropLast(line.length - endOfLeftSide, line);
    if(leftSide.length === 0 || !checkRuleSideFormat(leftSide)) formatExit(leftSide);
    return leftSide;
};

const getRuleRightSideLine = line => {
    const rightSide = drop(indexOf(RIGHT_CHEV, line) + 1, line);
    if(rightSide.length === 0 || !checkRuleSideFormat(rightSide)) formatExit(rightSide);
    if(indexOf(OR, rightSide) > 0|| indexOf(XOR, rightSide) > 0) conclusionFormatExit(rightSide);
    return rightSide;
};

export const setRule = (rules, line, lineIndex) => ({
    ...rules,
    [lineIndex]: {
        ...rules[lineIndex],
        type: getRuleType(line),
        leftSide: {
            line: getRuleLeftSideLine(line)
        },
        rightSide: {
            line: getRuleRightSideLine(line)
        },
    },
});
