/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MouseEvent as ReactMouseEvent, type ReactNode, useState } from 'react';

import { MIN_HEIGHT_VALUE } from '../settings';

type Props = {
    saveHeight: (height: number) => Promise<void>;
    initialHeight: string;
    children: ReactNode;
};

export const Resizable = ({ children, saveHeight, initialHeight }: Props) => {
    // Only set while dragging; otherwise the saved height is the single source of truth
    const [dragHeight, setDragHeight] = useState<number | null>(null);
    const [active, setActive] = useState(false);
    const height = dragHeight ?? parseFloat(initialHeight);

    const handler = (mouseDownEvent: ReactMouseEvent) => {
        const startSize = height;
        const startPosition = mouseDownEvent.pageY;
        let latestHeight = startSize;

        const onMouseMove = (mouseMoveEvent: MouseEvent) => {
            setActive(true);
            const newHeight = startSize - startPosition + mouseMoveEvent.pageY;
            if (newHeight > MIN_HEIGHT_VALUE) {
                latestHeight = newHeight;
                setDragHeight(newHeight);
            }
        };

        const onMouseUp = () => {
            setActive(false);
            document.body.removeEventListener('mousemove', onMouseMove);
            if (latestHeight === startSize) {
                setDragHeight(null);
                return;
            }
            // Keep the dragged height until the save lands, so the handle doesn't snap back meanwhile
            saveHeight(latestHeight)
                .finally(() => setDragHeight(null))
                .catch((error: unknown) => console.error('Failed to save the block height', error));
        };

        document.body.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseup', onMouseUp, { once: true });
    };

    return (
        <div className="tw-min-w-full tw-overflow-hidden">
            <div className="tw-grid tw-justify-items-stretch" style={{ height }}>
                {active && (
                    <div className="tw-fixed tw-top-0 tw-bottom-0 tw-right-0 tw-left-0 tw-select-none tw-z-40" />
                )}
                {children}
            </div>

            <button
                type="button"
                onMouseDown={handler}
                className="tw-flex tw-justify-center tw-w-full tw-pt-3 tw-pb-1 tw-border-none tw-cursor-ns-resize tw-bg-surface tw-z-50"
            >
                <span className="tw-block tw-w-8 tw-h-2 tw-bg-line-mid tw-border tw-border-line-strong tw-rounded-full" />
            </button>
        </div>
    );
};
