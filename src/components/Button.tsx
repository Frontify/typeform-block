/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Color, toRgbaString } from '@frontify/guideline-blocks-settings';
import { type FC } from 'react';

type Props = {
    buttonBackgroundColor: Color;
    buttonBorderColor: Color;
    buttonTextColor: Color;
    children: JSX.Element;
};

export const Button: FC<Props> = ({ children, buttonBackgroundColor, buttonBorderColor, buttonTextColor }) => (
    <span
        className={
            'tw-border tw-relative tw-inline-flex tw-items-center tw-justify-center tw-cursor-pointer tw-font-body tw-font-medium tw-rounded tw-px-4 tw-h-9 tw-text-body-medium'
        }
        style={{
            backgroundColor: toRgbaString(buttonBackgroundColor),
            borderColor: toRgbaString(buttonBorderColor),
            color: toRgbaString(buttonTextColor),
        }}
    >
        {children}
    </span>
);
