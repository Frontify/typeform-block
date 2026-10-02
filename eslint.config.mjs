/* (c) Copyright Frontify Ltd., all rights reserved. */

import frontifyConfig from '@frontify/eslint-config-react';
import { defineConfig } from 'eslint/config';

export default defineConfig(
    // @frontify/eslint-config-react ships no type declarations
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    frontifyConfig,
    {
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        // CommonJS config files can only load their dependencies with require()
        files: ['**/*.cjs'],
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
    {
        ignores: [
            // Vendored from Frontify/guideline-blocks, kept identical to upstream apart from the marked deviation
            'postcss/scope.cjs',
            // The React preset applies its JS/TS rules to every file and crashes on Markdown
            '**/*.md',
        ],
    },
);
