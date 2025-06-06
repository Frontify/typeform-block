/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import { useBlockSettings, useEditorState, useReadyForPrint } from '@frontify/app-bridge';
import { FormControl } from '@frontify/fondue';
import { Button, TextInput } from '@frontify/fondue/components';
import { type BlockProps } from '@frontify/guideline-blocks-settings';
import { PopupButton, SliderButton, Widget } from '@typeform/embed-react';
import { type FC, useCallback, useEffect, useState } from 'react';

import { Button as TypeformButton } from './components/Button';
import { Resizeable } from './components/Resizable';
import { FORM_ID_INFO } from './settings';
import { BlockHeight, type Options, type Settings } from './types';

export const TypeformBlock: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const {
        formId: settingsFormId,
        opacity,
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
        opacity: opacity ? 0 : 100,
        hideHeaders: !header,
        hideFooter: !footer,
        enableSandbox: isEditing,
        position,
    };
    const [input, setInput] = useState(blockSettings.formId);
    const { setIsReadyForPrint } = useReadyForPrint(appBridge);
    const activeHeight = blockSettings.isHeightCustom ? blockSettings.heightCustom : blockSettings.heightSimple;

    const saveInputId = useCallback(async () => {
        setIsReadyForPrint(false);

        await setBlockSettings({
            ...blockSettings,
            formId: input,
        });
    }, [blockSettings, input, setBlockSettings, setIsReadyForPrint]);

    useEffect(() => {
        setIsReadyForPrint(true);
    }, [setIsReadyForPrint]);

    useEffect(() => {
        setInput(settingsFormId);
    }, [settingsFormId]);

    const saveHeight = async (height: number) => {
        await setBlockSettings({
            ...blockSettings,
            heightCustom: `${height}px`,
            isHeightCustom: true,
        });
    };

    if (!settingsFormId) {
        if (isEditing) {
            return (
                <div className="tw-bg-black-5 tw-p-20 tw-text-black-40">
                    <div className="tw-max-w-lg tw-mx-auto">
                        <div className="sm:tw-flex sm:tw-items-center">
                            <div className="tw-w-full">
                                <FormControl clickable>
                                    <TextInput
                                        value={input}
                                        onChange={(event) => setInput(event.currentTarget.value)}
                                        placeholder="Typeform form id"
                                    />
                                </FormControl>
                            </div>
                            <div className="tw-mt-3 sm:tw-mt-0 sm:tw-ml-3">
                                <Button onPress={() => saveInputId()}>Confirm</Button>
                            </div>
                        </div>
                        <div className="tw-text-sm tw-mt-3">
                            <p>{FORM_ID_INFO}</p>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div
                    className="tw-grid tw-gap-4 tw-content-center tw-justify-center tw-bg-black-5 tw-text-black-40"
                    style={{ height: BlockHeight.Small }}
                >
                    No Typeform form id defined.
                </div>
            );
        }
    }

    const renderEmbed = () => {
        switch (embedStyle) {
            case 'embed':
                if (isEditing) {
                    return (
                        <Resizeable saveHeight={saveHeight} initialHeight={activeHeight}>
                            <Widget iframeProps={{ title: 'Typeform' }} {...options} />
                        </Resizeable>
                    );
                } else {
                    return <Widget iframeProps={{ title: 'Typeform' }} {...options} style={{ height: activeHeight }} />;
                }

            case 'popup':
                delete options.opacity;

                return (
                    <TypeformButton
                        buttonBackgroundColor={buttonBackgroundColor}
                        buttonBorderColor={buttonBorderColor}
                        buttonTextColor={buttonTextColor}
                    >
                        <PopupButton
                            {...options}
                            as="button"
                            className="tw--mx-4 tw-px-4 tw-h-9 tw-flex tw-items-center tw-justify-center"
                        >
                            {buttonText}
                        </PopupButton>
                    </TypeformButton>
                );

            case 'sidePanel':
                delete options.opacity;

                return (
                    <TypeformButton
                        buttonBackgroundColor={buttonBackgroundColor}
                        buttonBorderColor={buttonBorderColor}
                        buttonTextColor={buttonTextColor}
                    >
                        <SliderButton
                            {...options}
                            as="button"
                            className="tw--mx-4 tw-px-4 tw-h-9 tw-flex tw-items-center tw-justify-center"
                        >
                            {buttonText}
                        </SliderButton>
                    </TypeformButton>
                );

            default:
                return null;
        }
    };

    return <div>{renderEmbed()}</div>;
};
