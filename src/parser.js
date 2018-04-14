import { ARGS_LENGTH_ERROR } from './constants/args';

const checkArgsLength = args => {
    if(args.length !== 3) {
        console.log(ARGS_LENGTH_ERROR)
        process.exit();
    };
};

const parser = () => {
    const args = process.argv;
    checkArgsLength(args);
    const inputFile = args[2];
    console.log('inputFile: ', inputFile)
};

export default parser;