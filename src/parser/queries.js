export const isLineQueries = line => line[0] === '?';

export const setQueries = (initialQueries, line) => {
    for (var i = 1; i < line.length; i++) {
        initialQueries = [...initialQueries, line[i]];
    }
    return initialQueries
};