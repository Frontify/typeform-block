/* (c) Copyright Frontify Ltd., all rights reserved. */

export const isValidTypeformId = (url: string) => {
    if (url.match(/^\S*$/)) {
        return true;
    }

    return false;
};
