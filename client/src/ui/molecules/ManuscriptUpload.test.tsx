import React from 'react';
import { render, RenderResult, fireEvent, cleanup, act, queryByText } from '@testing-library/react';
import flushPromises from '../../../test-utils/flushPromises';
import ManuscriptUpload from './ManuscriptUpload';

function dispatchEvt(node: Document | Element | Window, type: string, data: any) {
    const event = new Event(type, { bubbles: true });
    Object.assign(event, data);
    fireEvent(node, event);
}

function mockData(files: File[]) {
    return {
        dataTransfer: {
            files,
            items: files.map(file => ({
                kind: 'file',
                type: file.type,
                getAsFile: () => file,
            })),
            types: ['Files'],
        },
    };
}

describe('ManuscriptUpload', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<ManuscriptUpload />)).not.toThrow();
    });

    it('should render default inactive content when inactive', (): void => {
        const { container } = render(<ManuscriptUpload />);

        expect(queryByText(container, 'manuscript-upload.inactive-content')).not.toBeNull();
        expect(queryByText(container, 'manuscript-upload.active-content')).toBeNull();
    });

    it('should render default active content when active', async (): Promise<void> => {
        const ui = <ManuscriptUpload />;
        const { container } = render(ui);
        const dropzone = container.querySelector('.manuscript-upload__dropzone');
        const file = new File([JSON.stringify({ ping: true })], 'ping.json', { type: 'application/json' });
        const data = mockData([file]);

        await act(async () => {
            dispatchEvt(dropzone, 'dragenter', data);
            await flushPromises();
        });

        expect(queryByText(container, 'manuscript-upload.active-content')).not.toBeNull();
        expect(queryByText(container, 'manuscript-upload.inactive-content')).toBeNull();
    });

    it('should render custom inactive content when inactive', (): void => {
        const { container } = render(<ManuscriptUpload inactiveContent="custom inactive content" />);

        expect(queryByText(container, 'custom inactive content')).not.toBeNull();
        expect(queryByText(container, 'manuscript-upload.active-content')).toBeNull();
    });

    it('should render custom active content when active', async (): Promise<void> => {
        const ui = <ManuscriptUpload activeContent="custom active content" />;
        const { container } = render(ui);
        const dropzone = container.querySelector('.manuscript-upload__dropzone');
        const file = new File([JSON.stringify({ ping: true })], 'ping.json', { type: 'application/json' });
        const data = mockData([file]);

        await act(async () => {
            dispatchEvt(dropzone, 'dragenter', data);
            await flushPromises();
        });

        expect(queryByText(container, 'custom active content')).not.toBeNull();
        expect(queryByText(container, 'manuscript-upload.inactive-content')).toBeNull();
    });
});
