module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        allowImportExportEverywhere: false,
        codeFrame: false,
    },
    extends: ['airbnb', 'prettier'],
    env: {
        browser: true,
        jest: true,
    },
    rules: {
        'max-len': ['error', { code: 100 }],
        'prefer-promise-reject-errors': ['off'],
        'react/jsx-filename-extension': ['off'],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/prop-types': ['warn'],
        'no-return-assign': ['off'],
    },
}
