import { Reset } from './constants/colors';

const print = (value, color = Reset) => {
    process.stdout.write(`${color}${value}\n${Reset}`);
};

export default print;