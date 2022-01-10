const ltrim = (str, char) => {
    let i = 0;
    while (i < str.length && str[i] === char) {
        i++;
    }

    return str.substring(i);
};

const rtrim = (str, char) => {
    let i = str.length - 1;
    while (i >= 0 && str[i] === char) {
        --i;
    }

    return str.substring(0, i + 1);
};

const trim = (str, char) => {
    return ltrim(rtrim(str, char), char);
};

export {
    trim,
    ltrim,
    rtrim
}