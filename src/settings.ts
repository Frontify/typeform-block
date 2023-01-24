/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockHeight } from './types';
import {
    Color,
    DropdownSize,
    IconEnum,
    MultiInputLayout,
    appendUnit,
    defineSettings,
    numericalOrPixelRule,
} from '@frontify/guideline-blocks-settings';

export const HEIGHT_DEFAULT_VALUE = BlockHeight.Medium;
export const MIN_HEIGHT_VALUE = 200;
export const ERROR_MSG = 'Please enter a valid Typeform form id';
export const FORM_ID_PLACEHOLDER = 'GKcYunMz';
export const FORM_ID_INFO =
    'You can find <form-id> from the public URL of your form: https://form.typeform.com/to/<form-id>';
const BUTTON_BACKGROUND_COLOR_DEFAULT_VALUE: Color = { red: 66, green: 71, blue: 71, alpha: 1 };
const BUTTON_BORDER_COLOR_DEFAULT_VALUE: Color = { red: 66, green: 71, blue: 71, alpha: 1 };
const BUTTON_TEXT_COLOR_DEFAULT_VALUE: Color = { red: 255, green: 255, blue: 255, alpha: 1 };

export const settings = defineSettings({
    main: [
        {
            id: 'embedStyle',
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
            id: 'formsId',
            type: 'input',
            label: 'Typeform Form ID',
            defaultValue: '',
            info: FORM_ID_INFO,
        },
        {
            id: 'buttonText',
            label: 'Button Label',
            type: 'input',
            placeholder: 'Open Form',
            defaultValue: 'Open Form',
            show: (bundle) =>
                bundle.getBlock('embedStyle')?.value === 'popup' ||
                bundle.getBlock('embedStyle')?.value === 'sidePanel',
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
            show: (bundle) => bundle.getBlock('embedStyle')?.value === 'sidePanel',
        },
        {
            id: 'isHeightCustom',
            type: 'switch',
            label: 'Block Height',
            switchLabel: 'Custom',
            defaultValue: false,
            show: (bundle) => bundle.getBlock('embedStyle')?.value === 'embed',
            info: 'Determines the block height',
            on: [
                {
                    id: 'heightCustom',
                    type: 'input',
                    placeholder: '100px',
                    rules: [numericalOrPixelRule],
                    onChange: (bundle) => appendUnit(bundle, 'heightCustom'),
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
        {
            id: 'buttonStyle',
            type: 'multiInput',
            label: 'Button',
            show: (bundle) =>
                bundle.getBlock('embedStyle')?.value === 'popup' ||
                bundle.getBlock('embedStyle')?.value === 'sidePanel',
            layout: MultiInputLayout.Columns,
            lastItemFullWidth: false,
            blocks: [
                {
                    id: 'buttonBackgroundColor',
                    type: 'colorInput',
                    label: 'Background Color',
                    defaultValue: BUTTON_BACKGROUND_COLOR_DEFAULT_VALUE,
                },
                {
                    id: 'buttonBorderColor',
                    type: 'colorInput',
                    label: 'Border Color',
                    defaultValue: BUTTON_BORDER_COLOR_DEFAULT_VALUE,
                },
                {
                    id: 'buttonTextColor',
                    type: 'colorInput',
                    label: 'Text Color',
                    defaultValue: BUTTON_TEXT_COLOR_DEFAULT_VALUE,
                },
            ],
        },
    ],
});
