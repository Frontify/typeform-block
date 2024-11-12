/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Color } from '@frontify/guideline-blocks-settings';

export enum BlockHeight {
    Small = '200px',
    Medium = '400px',
    Large = '800px',
}

export type Settings = {
    embedStyle: 'embed' | 'popup' | 'sidePanel';
    formId: string;
    isHeightCustom: boolean;
    heightCustom: string;
    heightSimple: BlockHeight;
    buttonText: string;
    header: boolean;
    footer: boolean;
    opacity?: number;
    position: 'left' | 'right';
    buttonBackgroundColor: Color;
    buttonBorderColor: Color;
    buttonTextColor: Color;
};

export type Options = {
    id: string;
    opacity?: number;
    hideHeaders: boolean;
    hideFooter: boolean;
    enableSandbox: boolean;
    position?: 'left' | 'right';
};
