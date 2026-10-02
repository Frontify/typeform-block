module.exports = {
    extends: ['@frontify/eslint-config-react'],
    ignorePatterns: ['pnpm-lock.yaml', 'pnpm-workspace.yaml', 'postcss/scope.cjs'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    parserOptions: {
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
};
