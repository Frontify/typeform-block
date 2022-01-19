import { IconEnum } from '@frontify/arcade';
import { BlockHeight } from './types';
import { ApiSettings } from '@frontify/guideline-blocks-settings';

export const HEIGHT_DEFAULT_VALUE = BlockHeight.Small;

const settings: ApiSettings = {
    main: [
        {
            id: 'embed-style',
            type: 'dropdown',
            defaultValue: 'standard',
            size: 'Large',
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
                // {
                //     value: 'slider',
                //     icon: IconEnum.Side,
                //     label: 'Slider',
                // },
                // The popover embed type is covered by the Intercom chat icon
                // Typeform doesn't offer an option to change the position of
                // the button, so we have to wait until they add this
                // functionality.
                // {
                //     value: 'popover',
                //     icon: IconEnum.Center,
                //     label: 'Popover',
                // },
            ]
        }
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
            placeholder: 'Open',
            defaultValue: 'Open',
            show: (bundle: any): boolean => ['popupButton', 'sliderButton'].includes(bundle.getBlock('embed-style')?.value)
        }
    ],
    layout: [
        {
            id: 'hideHeader',
            type: 'switch',
            label: 'Hide header',
            defaultValue: false,
        },
        {
            id: 'hideProgressBar',
            type: 'switch',
            label: 'Hide progress bar',
            defaultValue: false,
        },
        {
            id: 'isHeightCustom',
            type: 'switch',
            label: 'Block Height',
            switchLabel: 'Custom',
            defaultValue: false,
            show: (bundle: any): boolean => bundle.getBlock('embed-style')?.value === 'standard',
            info: 'Determines the block height.',
            on: [
                {
                    id: 'heightCustom',
                    type: 'input',
                    placeholder: '100px',
                    rules: [
                        {
                            errorMessage: "Please use a numerical value with or without 'px'",
                            validate: (value: string) => value.match(/^(?:-?\d+)(?:px)?$/g) !== null,
                        }
                    ],
                    onChange: (bundle: any): void => {
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
            label: 'Background transparency',
            type: 'input',
            placeholder: '0%',
            show: (bundle: any): boolean => bundle.getBlock('embed-style')?.value === 'standard',
            rules: [
                {
                    errorMessage: "Please use a numerical value with or without '%'",
                    validate: (value: string) => value.match(/^(?:-?\d+)(?:%)?$/g) !== null,
                }
            ],
            onChange: (bundle: any): void => {
                const blockOpacity = Number(bundle.getBlock('opacity')?.value);

                if (!Number.isNaN(blockOpacity)) {
                    bundle.setBlockValue('heightCustom', `${blockOpacity}%`);
                }
            },
        }
    ]
};

export default settings;
