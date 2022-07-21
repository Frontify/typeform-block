import { ReactElement } from 'react';
import { PopupButton, SliderButton, Widget } from '@typeform/embed-react';
import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import styles from './style.module.css';
import { FC } from 'react';

type Props = {
    appBridge: AppBridgeNative;
};

type Settings = {
    'embed-style': string;
    'form-id': string;
    isHeightCustom: boolean;
    heightCustom: string;
    heightSimple: string;
    buttonText: string;
    hideHeaders: boolean;
    hideFooter: boolean;
    opacity: number;
};

const Placeholder = (): ReactElement => (
    <div>
        <p className={styles.placeholder}>Please enter a Typeform form id in the block settings.</p>
    </div>
);

const TypeformBlock: FC<Props> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    if (!blockSettings['form-id']) {
        return <Placeholder />;
    }

    const renderEmbed = () => {
        switch (blockSettings['embed-style']) {
            case 'standard':
                return (
                    <Widget
                        style={{
                            height: blockSettings.isHeightCustom
                                ? blockSettings.heightCustom
                                : blockSettings.heightSimple,
                        }}
                        id={blockSettings['form-id']}
                        enableSandbox={!isEditing}
                        hideHeaders={blockSettings['hideHeaders']}
                        hideFooter={blockSettings['hideFooter']}
                        opacity={blockSettings['opacity']}
                    />
                );

            case 'popupButton':
                return (
                    <PopupButton
                        size={100}
                        opacity={100}
                        className="a-button-primary"
                        id={blockSettings['form-id']}
                        enableSandbox={!isEditing}
                        hideHeaders={blockSettings['hideHeaders']}
                        hideFooter={blockSettings['hideFooter']}
                    >
                        {blockSettings.buttonText}
                    </PopupButton>
                );

            case 'sliderButton':
                return (
                    <SliderButton
                        className="tw-outline-none tw-relative tw-flex tw-items-center tw-justify-center tw-border-0 tw-rounded tw-cursor-pointer tw-font-sans tw-transition-colors tw-px-4 tw-h-9 tw-text-s tw-text-white tw-bg-black-90 hover:tw-bg-black-100 active:tw-bg-black-superdark dark:tw-text-black dark:tw-bg-white dark:hover:tw-bg-black-10 dark:active:tw-bg-black-20"
                        id={blockSettings['form-id']}
                        enableSandbox={!isEditing}
                        hideHeaders={blockSettings['hideHeaders']}
                        hideFooter={blockSettings['hideFooter']}
                    >
                        {blockSettings.buttonText}
                    </SliderButton>
                );

            default:
                return <Placeholder />;
        }
    };

    return <div className={styles.container}>{renderEmbed()}</div>;
};

export default TypeformBlock;
