import generateAlphanumericName from './generateAlphanumericName';

const SEED = 4603;

const phash = (h, x) => {
    let i = x.length;

    while (i) {
        h = (h * 33) ^ x.charCodeAt(--i);
    }

    return h;
};

const hash = x => {
    return generateAlphanumericName(phash(SEED, x));
};

export default hash;
