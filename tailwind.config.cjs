/* (c) Copyright Frontify Ltd., all rights reserved. */

/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [require('@frontify/guideline-blocks-settings/tailwind')],
    content: ['src/**/*.{ts,tsx}'],
    prefix: 'tw-',
    corePlugins: {
        preflight: false,
    },
};
