import parser from './src/parser.js';
import solver from './src/solver';
import checker from './src/checker';

// Let's fill our dataStuct with the .txt parcing. Errors will be displayed in case of opening problem.
const dataStruct = parser();

// Then check the file is right formated. Errors will be displayed in the other hand.
checker(dataStruct);

// If everything went smoothly, let's try to solve this.
solver(dataStruct);