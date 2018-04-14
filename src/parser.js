import { ARGS_LENGTH_ERROR } from './constants';

const checkArgsNumber = args => {
    if(args.length !== 3) {
        console.log(ARGS_LENGTH_ERROR)
        process.exit();
    };
};

const parser = () => {
    const args = process.argv;
    checkArgsNumber(args);
};

export default parser;