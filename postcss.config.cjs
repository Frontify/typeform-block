/* (c) Copyright Frontify Ltd., all rights reserved. */

const blockScope = require('./block-scope.json');

module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        './postcss/scope.cjs': { scope: blockScope.scope },
    },
};
