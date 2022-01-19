import { ReactElement } from 'react';
import { Widget, PopupButton, SliderButton, Sidetab, Popover } from '@typeform/embed-react';
import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import styles from './style.module.css'

type Props = {
    appBridge: AppBridgeNative;
}

type Settings = {
    'embed-style': string;
    'form-id': string;
    'isHeightCustom': boolean;
    'heightCustom': string;
    'heightSimple': string;
    'buttonText': string;
}

const Placeholder = (): ReactElement => <div><p className={styles.placeholder}>Please enter a Typeform form id in the block settings.</p></div>
const SettingsPlaceholder = (): ReactElement => <div><p className={styles.placeholder}>Please use the settings to modify this block.</p></div>

export default function TypeformBlock({ appBridge }: Props): ReactElement {
    const isEditing = useEditorState();
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    if (!blockSettings['form-id']) {
        return <Placeholder />
    }

    const renderEmbed = () => {
        switch(blockSettings['embed-style']) {
            case 'standard':
                return <Widget style={{height: blockSettings.isHeightCustom ? blockSettings.heightCustom : blockSettings.heightSimple}} id={blockSettings['form-id']} enableSandbox={!isEditing} />

            case 'popupButton':
                return <PopupButton size={100} opacity={100} className="tw-outline-none tw-relative tw-flex tw-items-center tw-justify-center tw-border-0 tw-rounded tw-cursor-pointer tw-font-sans tw-transition-colors tw-px-4 tw-h-9 tw-text-s tw-text-white tw-bg-black-90 hover:tw-bg-black-100 active:tw-bg-black-superdark dark:tw-text-black dark:tw-bg-white dark:hover:tw-bg-black-10 dark:active:tw-bg-black-20" id={blockSettings['form-id']} enableSandbox={!isEditing}>{blockSettings.buttonText}</PopupButton>

            case 'sliderButton':
                return <SliderButton className="tw-outline-none tw-relative tw-flex tw-items-center tw-justify-center tw-border-0 tw-rounded tw-cursor-pointer tw-font-sans tw-transition-colors tw-px-4 tw-h-9 tw-text-s tw-text-white tw-bg-black-90 hover:tw-bg-black-100 active:tw-bg-black-superdark dark:tw-text-black dark:tw-bg-white dark:hover:tw-bg-black-10 dark:active:tw-bg-black-20" id={blockSettings['form-id']} enableSandbox={!isEditing}>{blockSettings.buttonText}</SliderButton>

            case 'slider':
                if (isEditing) {
                    return <SettingsPlaceholder />
                }

                return <Sidetab id={blockSettings['form-id']} enableSandbox={!isEditing} buttonText="Yolo">{blockSettings.buttonText}</Sidetab>

            // The popover embed type is covered by the Intercom chat icon
            // Typeform doesn't offer an option to change the position of
            // the button, so we have to wait until they add this
            // functionality.
            // case 'popover':
            //      if (isEditing) {
            //          return <SettingsPlaceholder />
            //      }
            //
            //     return <Popover id={blockSettings['form-id']} enableSandbox={!isEditing} />

            default:
                return <Placeholder />
        }
    }

    return <div className={styles.container}>{renderEmbed()}</div>
}
