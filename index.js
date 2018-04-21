import parser from './src/parser';
import validation from './src/validation';
import solver from './src/solver';
import initSettings from './src/settings';

// First of all, get get some settings regarding inital config and input option
const settings = initSettings();
// Let's fill our dataStuct with the .txt parcing. Errors will be displayed in case of opening problem.
const dataStruct = parser(settings);

// Then check the file is right formated. Errors will be displayed in the other hand.
validation(dataStruct);
// If everything went smoothly, let's try to solve this.
solver(dataStruct);