module.exports = {
    extends: ['@frontify/eslint-config-react'],
    ignorePatterns: ['pnpm-lock.yaml', 'pnpm-workspace.yaml'],
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
