import parser from './src/parser.js';
import solver from './src/solver';
import checker from './src/checker';

const dataStruct = parser();
checker(dataStruct);
solver(dataStruct);