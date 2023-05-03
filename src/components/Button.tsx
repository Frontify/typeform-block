import { Color } from '@frontify/fondue';
import { FC } from 'react';

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
            backgroundColor: `rgb(${buttonBackgroundColor.red},${buttonBackgroundColor.green},${buttonBackgroundColor.blue})`,
            borderColor: `rgb(${buttonBorderColor.red},${buttonBorderColor.green},${buttonBorderColor.blue})`,
            color: `rgb(${buttonTextColor.red},${buttonTextColor.green},${buttonTextColor.blue})`,
        }}
    >
        {children}
    </span>
);
