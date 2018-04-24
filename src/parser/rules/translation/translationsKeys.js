const translationKeys = [
    {
        regex: /\+/g,
        translation: '&&',
    },
    {
        regex: /\|/g,
        translation: '||',
    },
];

// XOR a XOR B : (A&&!B)||(!A&&B)

export default translationKeys;