import { NOT, AND, OR, XOR, RIGHT_BRACKET, LEFT_BRACKET } from './constants/symbols';

export const isCapitalizAlpha = char => {
}

export const isAnOperator = char => {
    if(char === (NOT || AND || OR || XOR || RIGHT_BRACKET || LEFT_BRACKET)) return true;
    return false;
}