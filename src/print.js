import { Reset } from './constants/colors';

// Here is the print function. She take a value to print and a color (white by default).
const print = (value, color = Reset) => process.stdout.write(`${color}${value}\n${Reset}`);

export default print;