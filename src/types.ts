/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';

export enum BlockHeight {
    Small = '200px',
    Medium = '400px',
    Large = '800px',
}

export type Props = {
    appBridge: AppBridgeBlock;
};

export type Settings = {
    'embed-style': 'embed' | 'popup' | 'sidePanel';
    'form-id': string;
    isHeightCustom: boolean;
    heightCustom: string;
    heightSimple: BlockHeight;
    buttonText: string;
    header: boolean;
    footer: boolean;
    opacity?: number;
    position: 'left' | 'right';
};

export type Options = {
    id: string;
    opacity?: number;
    hideHeaders: boolean;
    hideFooter: boolean;
    enableSandbox: boolean;
    position?: 'left' | 'right';
};
