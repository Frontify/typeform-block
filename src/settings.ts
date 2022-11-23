/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, IconEnum } from '@frontify/fondue';
import { BlockHeight } from './types';
import { BlockSettings, Bundle } from '@frontify/guideline-blocks-settings';

export const HEIGHT_DEFAULT_VALUE = BlockHeight.Medium;
export const MIN_HEIGHT_VALUE = 200;
export const ERROR_MSG = 'Please enter a valid Typeform form id';
export const FORM_ID_PLACEHOLDER = 'GKcYunMz';
export const FORM_ID_INFO =
    'You can find <form-id> from the public URL of your form: https://form.typeform.com/to/<form-id>';

export const settings: BlockSettings = {
    main: [
        {
            id: 'embed-style',
            type: 'dropdown',
            label: 'Embed Type',
            defaultValue: 'embed',
            size: DropdownSize.Large,
            choices: [
                {
                    value: 'embed',
                    icon: IconEnum.MarkArea,
                    label: 'Embed',
                },
                {
                    value: 'popup',
                    icon: IconEnum.TextBoxStack,
                    label: 'Popup',
                },
                {
                    value: 'sidePanel',
                    icon: IconEnum.SidebarRight,
                    label: 'Side Panel',
                },
            ],
        },
    ],
    basics: [
        {
            id: 'form-id',
            type: 'input',
            label: 'Typeform Form ID',
            info: FORM_ID_INFO,
        },
        {
            id: 'buttonText',
            label: 'Button Label',
            type: 'input',
            placeholder: 'Open Form',
            defaultValue: 'Open Form',
            show: (bundle: Bundle): boolean =>
                bundle.getBlock('embed-style')?.value === 'popup' ||
                bundle.getBlock('embed-style')?.value === 'sidePanel',
        },
    ],
    layout: [
        {
            id: 'general',
            type: 'sectionHeading',
            label: 'General',
            blocks: [
                {
                    id: 'header',
                    type: 'switch',
                    label: 'Header',
                    info: 'Controls the header that appears when you have a question group, or a long question',
                    defaultValue: true,
                },
                {
                    id: 'footer',
                    type: 'switch',
                    label: 'Footer',
                    info: 'Controls the visiblity of the form progress bar and navigation buttons',
                    defaultValue: true,
                },
            ],
        },
        {
            id: 'position',
            type: 'slider',
            label: 'Slider position',
            defaultValue: 'right',
            choices: [
                {
                    value: 'left',
                    label: 'Left',
                },
                {
                    value: 'right',
                    label: 'Right',
                },
            ],
            show: (bundle: Bundle): boolean => bundle.getBlock('embed-style')?.value === 'sidePanel',
        },
        {
            id: 'isHeightCustom',
            type: 'switch',
            label: 'Block Height',
            switchLabel: 'Custom',
            defaultValue: false,
            show: (bundle: Bundle): boolean => bundle.getBlock('embed-style')?.value === 'embed',
            info: 'Determines the block height',
            on: [
                {
                    id: 'heightCustom',
                    type: 'input',
                    placeholder: '100px',
                    rules: [
                        {
                            errorMessage: "Please use a numerical value with or without 'px'",
                            validate: (value: string) => value.match(/^-?\d+(?:px)?$/g) !== null,
                        },
                    ],
                    onChange: (bundle: Bundle): void => {
                        const blockHeight = Number(bundle.getBlock('heightCustom')?.value);

                        if (!Number.isNaN(blockHeight)) {
                            bundle.setBlockValue('heightCustom', `${blockHeight}px`);
                        }
                    },
                },
            ],
            off: [
                {
                    id: 'heightSimple',
                    type: 'slider',
                    defaultValue: HEIGHT_DEFAULT_VALUE,
                    choices: [
                        {
                            value: BlockHeight.Small,
                            label: 'S',
                        },
                        {
                            value: BlockHeight.Medium,
                            label: 'M',
                        },
                        {
                            value: BlockHeight.Large,
                            label: 'L',
                        },
                    ],
                },
            ],
        },
    ],
    style: [
        {
            id: 'opacity',
            label: 'Transparent Background',
            info: 'Enable or disable the background of the form',
            type: 'switch',
            defaultValue: false,
        },
    ],
};
