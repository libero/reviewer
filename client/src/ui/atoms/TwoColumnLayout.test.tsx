import React from 'react';
import { render, RenderResult, cleanup } from '@testing-library/react';
import TwoColumnLayout from './TwoColumnLayout';

describe('Paragraph', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <TwoColumnLayout>
                        <span>text</span>
                        <span>moreText</span>
                    </TwoColumnLayout>,
                ),
        ).not.toThrow();
    });
});
