/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import { FC, useCallback, useEffect, useState } from 'react';
import { useBlockSettings, useEditorState, useReadyForPrint } from '@frontify/app-bridge';
import type { BlockProps } from '@frontify/guideline-blocks-settings';
import { PopupButton, SliderButton, Widget } from '@typeform/embed-react';
import { Button, FormControl, FormControlStyle, TextInput } from '@frontify/fondue';
import { isValidTypeformId } from './utils/isValidTypformId';
import { ERROR_MSG, FORM_ID_INFO, FORM_ID_PLACEHOLDER } from './settings';
import { Resizeable } from './components/Resizable';
import { BlockHeight, Options, Settings } from './types';

export const TypeformBlock: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const {
        'form-id': settingsFormId,
        opacity,
        header,
        footer,
        position,
        'embed-style': embedStyle,
        buttonText,
    } = blockSettings;
    const options: Options = {
        id: settingsFormId,
        opacity: opacity ? 0 : 100,
        hideHeaders: !header,
        hideFooter: !footer,
        enableSandbox: isEditing,
        position,
    };
    const [formId, setFormId] = useState(blockSettings['form-id']);
    const [input, setInput] = useState(blockSettings['form-id']);
    const { setIsReadyForPrint } = useReadyForPrint(appBridge);
    const activeHeight = blockSettings.isHeightCustom ? blockSettings.heightCustom : blockSettings.heightSimple;

    const saveInputId = useCallback(() => {
        setIsReadyForPrint(false);
        setFormId(input);

        if (isValidTypeformId(input)) {
            setBlockSettings({
                ...blockSettings,
                ['form-id']: input,
            });
        }
    }, [blockSettings, input, setBlockSettings, setIsReadyForPrint]);

    useEffect(() => {
        setIsReadyForPrint(true);
    }, [setIsReadyForPrint]);

    useEffect(() => {
        setFormId(settingsFormId);
        setInput(settingsFormId);
    }, [settingsFormId]);

    const saveHeight = (height: number) => {
        setBlockSettings({
            ...blockSettings,
            heightCustom: `${height}px`,
            isHeightCustom: true,
        });
    };

    const labelId = `id-${window.crypto.getRandomValues(new Uint32Array(1))}`;

    if (!settingsFormId) {
        return (
            <>
                {isEditing ? (
                    <div
                        className={`tw-grid tw-gap-4 tw-content-center tw-bg-black-5 tw-p-20 tw-text-black-40 tw-resize-y tw-h-[${BlockHeight.Small}]`}
                    >
                        <FormControl
                            clickable
                            helper={!isValidTypeformId(formId) ? { text: ERROR_MSG } : { text: FORM_ID_INFO }}
                            style={!isValidTypeformId(formId) ? FormControlStyle.Danger : FormControlStyle.Primary}
                            label={{
                                children: 'Typeform form id',
                                htmlFor: labelId,
                            }}
                        >
                            <TextInput
                                value={input}
                                onChange={setInput}
                                onEnterPressed={saveInputId}
                                placeholder={FORM_ID_PLACEHOLDER}
                            />
                        </FormControl>
                        <div>
                            <Button onClick={saveInputId}>Confirm</Button>
                        </div>
                    </div>
                ) : (
                    <div
                        className={`tw-grid tw-gap-4 tw-content-center tw-justify-center tw-bg-black-5 tw-h-[${BlockHeight.Small}]`}
                    >
                        No Typeform form id defined.
                    </div>
                )}
            </>
        );
    }

    const renderEmbed = () => {
        switch (embedStyle) {
            case 'embed':
                delete options.position;

                return (
                    <>
                        {isEditing ? (
                            <Resizeable saveHeight={saveHeight} initialHeight={activeHeight}>
                                <Widget {...options} />
                            </Resizeable>
                        ) : (
                            <Widget {...options} style={{ height: activeHeight }} />
                        )}
                    </>
                );

            case 'popup':
                delete options.opacity;
                delete options.position;

                return (
                    <Button>
                        <PopupButton
                            {...options}
                            as="div"
                            className="tw--mx-4 tw-px-4 tw-h-9 tw-flex tw-items-center tw-justify-center"
                        >
                            {buttonText}
                        </PopupButton>
                    </Button>
                );

            case 'sidePanel':
                delete options.opacity;

                return (
                    <Button>
                        <SliderButton
                            {...options}
                            as="div"
                            className="tw--mx-4 tw-px-4 tw-h-9 tw-flex tw-items-center tw-justify-center"
                        >
                            {buttonText}
                        </SliderButton>
                    </Button>
                );

            default:
                return false;
        }
    };

    return <div className="tw-overflow-hidden">{renderEmbed()}</div>;
};
