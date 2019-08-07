import React from 'react';
import { render, RenderResult, cleanup } from '@testing-library/react';
import Paragraph from './Paragraph';

describe('Paragraph', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<Paragraph type="writing" />)).not.toThrow();
    });

    it('should render with the correct classes', (): void => {
        const { getByText } = render(
            <div>
                <Paragraph type="writing">writing</Paragraph>
                <Paragraph type="reading">reading</Paragraph>
                <Paragraph type="small">small</Paragraph>
                <Paragraph type="small" secondary={true}>
                    secondary
                </Paragraph>
            </div>,
        );
        expect(getByText('writing')).toHaveClass('paragraph', 'paragraph--writing');
        expect(getByText('reading')).toHaveClass('paragraph', 'paragraph--reading');
        expect(getByText('small')).toHaveClass('paragraph', 'paragraph--small');
        expect(getByText('secondary')).toHaveClass('paragraph', 'paragraph--small', 'paragraph--secondary');
    });

    it('should render the children', (): void => {
        const { getByText } = render(
            <Paragraph type="writing">
                <span>test</span>
                <span>test2</span>
            </Paragraph>,
        );
        expect(getByText('test')).toBeInTheDocument();
        expect(getByText('test2')).toBeInTheDocument();
    });
});
