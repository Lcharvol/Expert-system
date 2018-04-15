
export const isLineInitialFacts = line => line[0] === '=';

export const setInitialFacts = (initialFacts, line) => {
    for (var i = 1; i < line.length; i++) {
        initialFacts = {...initialFacts, [line[i]]: true}
    }
    return initialFacts
};