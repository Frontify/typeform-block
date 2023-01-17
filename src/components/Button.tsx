import { Color } from '@frontify/fondue';
import { FC } from 'react';

type Props = {
    buttonBackgroundColor: Color;
    buttonBorderColor: Color;
    buttonTextColor: Color;
    children: JSX.Element;
};

export const Button: FC<Props> = ({ children, buttonBackgroundColor, buttonBorderColor, buttonTextColor }) => (
    <button
        className={
            'tw-group tw-border tw-box-box tw-relative tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-outline-none tw-font-body tw-font-medium tw-rounded tw-px-4 tw-h-9 tw-text-body-medium'
        }
        style={{
            backgroundColor: `rgb(${buttonBackgroundColor.red},${buttonBackgroundColor.green},${buttonBackgroundColor.blue})`,
            borderColor: `rgb(${buttonBorderColor.red},${buttonBorderColor.green},${buttonBorderColor.blue})`,
            color: `rgb(${buttonTextColor.red},${buttonTextColor.green},${buttonTextColor.blue})`,
        }}
    >
        {children}
    </button>
);
