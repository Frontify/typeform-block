import { DropdownSize, IconEnum } from '@frontify/fondue';
import { BlockHeight } from './types';
import { BlockSettings, Bundle } from '@frontify/guideline-blocks-settings';

export const HEIGHT_DEFAULT_VALUE = BlockHeight.Small;

const settings: BlockSettings = {
    main: [
        {
            id: 'embed-style',
            type: 'dropdown',
            label: 'Embed Type',
            defaultValue: 'standard',
            size: DropdownSize.Large,
            choices: [
                {
                    value: 'standard',
                    icon: IconEnum.FigureTextBottom,
                    label: 'Standard',
                },
                {
                    value: 'popupButton',
                    icon: IconEnum.Button,
                    label: 'Popup Button',
                },
                {
                    value: 'sliderButton',
                    icon: IconEnum.Button,
                    label: 'Slider Button',
                },
            ],
        },
    ],
    content: [
        {
            id: 'form-id',
            type: 'input',
            label: 'Typeform Form ID',
            info: 'You can find <form-id> from the public URL of your form: https://form.typeform.com/to/<form-id>',
        },
        {
            id: 'buttonText',
            label: 'Button Label',
            type: 'input',
            placeholder: 'Open Form',
            defaultValue: 'Open Form',
            show: (bundle: Bundle): boolean =>
                bundle.getBlock('embed-style')?.value === 'popupButton' ||
                bundle.getBlock('embed-style')?.value === 'sliderButton',
        },
    ],
    layout: [
        {
            id: 'hideHeaders',
            type: 'switch',
            label: 'Hide Headers',
            defaultValue: false,
        },
        {
            id: 'hideFooter',
            type: 'switch',
            label: 'Hide Footer',
            defaultValue: false,
        },
        {
            id: 'isHeightCustom',
            type: 'switch',
            label: 'Block Height',
            switchLabel: 'Custom',
            defaultValue: false,
            show: (bundle: Bundle): boolean => bundle.getBlock('embed-style')?.value === 'standard',
            info: 'Determines the block height.',
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
            label: 'Background Transparency',
            info: '0% (fully transparent) to 100% (fully opaque)',
            type: 'input',
            placeholder: '0%',
            show: (bundle: Bundle): boolean => bundle.getBlock('embed-style')?.value === 'standard',
            rules: [
                {
                    errorMessage: "Please use a numerical value with or without '%'",
                    validate: (value: string) => value.match(/^-?\d+%?$/g) !== null,
                },
            ],
            onChange: (bundle: Bundle): void => {
                const blockOpacity = Number(bundle.getBlock('opacity')?.value);

                if (!Number.isNaN(blockOpacity)) {
                    bundle.setBlockValue('heightCustom', `${blockOpacity}%`);
                }
            },
        },
    ],
};

export default settings;
