module.exports = {
    'root': true,
    'env': {
        'es6': true,
        'node': true,
    },
    'parserOptions': {
        'ecmaVersion': 9,
    },
    'extends': [
        'eslint:recommended',
        'google',
    ],
    'rules': {
        'max-len': [1, 80],
        'indent': [2, 4],
        'linebreak-style': [2, 'unix'],
        'quotes': [2, 'single'],
        'semi': [2, 'never'],
        'no-console': 0,
        'comma-dangle': [2, 'always-multiline'],
        'no-unused-vars': 1,
        'object-curly-spacing': [2, 'never'],
        'array-bracket-spacing': [2, 'never'],
        'keyword-spacing': 2,
        'one-var': 0,
        'curly': 0,
        'arrow-parens': 0,
    },
}
