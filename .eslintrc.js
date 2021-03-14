module.exports = {
    root: true,
    env: { 'cypress/globals': true },
    plugins: ['eslint-plugin-cypress'],
    extends: [
        'kentcdodds',
        'kentcdodds/import',
        'kentcdodds/jest',
        'kentcdodds/react'
    ],
    rules: {
        // https://github.com/benmosher/eslint-plugin-import/issues/1446
        'import/named': 'off',
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': [
            'error',
            { allowShortCircuit: true, allowTernary: true }
        ],
        'jest/valid-expect-in-promise': ['off'],
        '@typescript-eslint/restrict-template-expressions': [
            'error',
            { allowNullish: true }
        ],
        '@typescript-eslint/no-non-null-assertion': ['off']
    }
};
