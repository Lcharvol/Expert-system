import { FgGreen } from '../constants/colors';
import print from '../print';

const util = require('util')

const solver = dataStruct => {
    print('Solver start', FgGreen)
    console.log(util.inspect(dataStruct, false, null))
}

export default solver;