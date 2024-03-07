const AD_REPLACER_R = /(a)(d)/gi;
const charsLength = 62; // 26 alphabets + 10 numeric digits

const getAlphanumericChar = code => {
    if (code < 26) {
        // Generate alphabetic characters (a-z)
        return String.fromCharCode(code + 97);
    } else if (code < 52) {
        // Generate uppercase alphabetic characters (A-Z)
        return String.fromCharCode(code - 26 + 65);
    } else {
        // Generate numeric digits (0-9)
        return String.fromCharCode(code - 52 + 48);
    }
};

function generateAlphanumericName(code) {
    let name = '';
    let x;

    for (x = Math.abs(code); x > charsLength; x = (x / charsLength) | 0) {
        name = getAlphanumericChar(x % charsLength) + name;
    }

    return (getAlphanumericChar(x % charsLength) + name).replace(
        AD_REPLACER_R,
        '$1-$2'
    );
}

export default generateAlphanumericName;
