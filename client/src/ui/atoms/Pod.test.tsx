import React from 'react';
import Pod from './Pod';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';

describe('Pod', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <Pod buttonIcon={<div />} buttonText="B" onClick={(): void => {}}>
                        A
                    </Pod>,
                ),
        ).not.toThrow();
    });

    it('should have the "pod__error" class if invalid passed in', (): void => {
        const { container } = render(
            <Pod buttonIcon={<div />} buttonText="B" onClick={(): void => {}} invalid={true}>
                A
            </Pod>,
        );
        expect(container.querySelector('.pod')).toHaveClass('pod__error');
    });

    it('should call onClick callback when button is clicked', async (): Promise<void> => {
        const callback = jest.fn();
        const { container } = render(
            <Pod buttonIcon={<div />} buttonText="B" onClick={callback}>
                A
            </Pod>,
        );
        await fireEvent.click(container.querySelector('.pod__button'));
        expect(callback).toBeCalled();
    });

    it('displays children passed', (): void => {
        const { container } = render(
            <Pod buttonIcon={<div />} buttonText="B" onClick={(): void => {}}>
                <div className="testElement" />
            </Pod>,
        );
        expect(container.querySelector('.testElement')).toBeInTheDocument();
    });

    it('displays the passed icon inside of the button', (): void => {
        const { container } = render(
            <Pod buttonIcon={<div className="testIcon" />} buttonText="B" onClick={(): void => {}}></Pod>,
        );
        expect(container.querySelector('.pod__button').querySelector('.testIcon')).toBeInTheDocument();
    });

    it('renders the passed button text inside of the button', (): void => {
        const { container } = render(
            <Pod buttonIcon={<div />} buttonText="Test Button Text" onClick={(): void => {}}></Pod>,
        );
        expect(container.querySelector('.pod__button').textContent).toBe('Test Button Text');
    });
});
