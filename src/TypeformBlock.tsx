/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import { useBlockSettings, useEditorState, useReadyForPrint } from '@frontify/app-bridge';
import { Button, TextInput } from '@frontify/fondue/components';
import { type BlockProps } from '@frontify/guideline-blocks-settings';
import { PopupButton, SliderButton, Widget } from '@typeform/embed-react';
import { type FC, useEffect, useState } from 'react';

import blockScope from '../block-scope.json';

import { Button as TypeformButton } from './components/Button';
import { Resizable } from './components/Resizable';
import { FORM_ID_INFO } from './settings';
import { BlockHeight, type Options, type Settings } from './types';

// The scope class must wrap every render path: postcss/scope.cjs prefixes all Tailwind rules with it.
export const TypeformBlock: FC<BlockProps> = (props) => (
    <div className={blockScope.scope}>
        <TypeformBlockContent {...props} />
    </div>
);

// Mounted only while no form id is saved, so the draft starts empty every time the empty state appears
const FormIdEditor = ({ onConfirm }: { onConfirm: (formId: string) => Promise<void> }) => {
    const [input, setInput] = useState('');

    return (
        <div className="tw-bg-surface-dim tw-p-20 tw-text-low-contrast">
            <div className="tw-max-w-lg tw-mx-auto">
                <div className="sm:tw-flex sm:tw-items-center">
                    <div className="tw-w-full">
                        <TextInput
                            value={input}
                            onChange={(event) => setInput(event.currentTarget.value)}
                            placeholder="Typeform form id"
                            aria-label="Typeform form id"
                        />
                    </div>
                    <div className="tw-mt-3 sm:tw-mt-0 sm:tw-ml-3">
                        <Button onPress={() => onConfirm(input)}>Confirm</Button>
                    </div>
                </div>
                <div className="tw-text-small tw-mt-3">
                    <p>{FORM_ID_INFO}</p>
                </div>
            </div>
        </div>
    );
};

const TypeformBlockContent: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const {
        formId: settingsFormId,
        opacity: isBackgroundTransparent,
        header,
        footer,
        position,
        embedStyle,
        buttonText,
        buttonBackgroundColor,
        buttonBorderColor,
        buttonTextColor,
    } = blockSettings;
    const options: Options = {
        id: settingsFormId,
        hideHeaders: !header,
        hideFooter: !footer,
        enableSandbox: isEditing,
        position,
    };
    const { setIsReadyForPrint } = useReadyForPrint(appBridge);
    const activeHeight = blockSettings.isHeightCustom ? blockSettings.heightCustom : blockSettings.heightSimple;

    const saveFormId = async (formId: string) => {
        setIsReadyForPrint(false);
        await setBlockSettings({ formId });
        setIsReadyForPrint(true);
    };

    useEffect(() => {
        setIsReadyForPrint(true);
    }, [setIsReadyForPrint]);

    const saveHeight = async (height: number) => {
        await setBlockSettings({ heightCustom: `${height}px`, isHeightCustom: true });
    };

    if (!settingsFormId) {
        if (isEditing) {
            return <FormIdEditor onConfirm={saveFormId} />;
        } else {
            return (
                <div
                    className="tw-grid tw-gap-4 tw-content-center tw-justify-center tw-bg-surface-dim tw-text-low-contrast"
                    style={{ height: BlockHeight.Small }}
                >
                    No Typeform form id defined.
                </div>
            );
        }
    }

    if (embedStyle === 'embed') {
        const widgetProps = {
            ...options,
            opacity: isBackgroundTransparent ? 0 : 100,
            iframeProps: { title: 'Typeform' },
        };

        return (
            <div>
                {isEditing ? (
                    <Resizable saveHeight={saveHeight} initialHeight={activeHeight}>
                        <Widget {...widgetProps} />
                    </Resizable>
                ) : (
                    <Widget {...widgetProps} style={{ height: activeHeight }} />
                )}
            </div>
        );
    }

    if (embedStyle !== 'popup' && embedStyle !== 'sidePanel') {
        return <div />;
    }

    const TypeformTrigger = embedStyle === 'popup' ? PopupButton : SliderButton;

    return (
        <div>
            <TypeformButton
                buttonBackgroundColor={buttonBackgroundColor}
                buttonBorderColor={buttonBorderColor}
                buttonTextColor={buttonTextColor}
            >
                <TypeformTrigger
                    {...options}
                    buttonProps={{ type: 'button' }}
                    className="tw--mx-4 tw-px-4 tw-h-9 tw-flex tw-items-center tw-justify-center"
                >
                    {buttonText}
                </TypeformTrigger>
            </TypeformButton>
        </div>
    );
};
