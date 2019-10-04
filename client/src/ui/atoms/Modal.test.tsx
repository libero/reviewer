import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<Modal isShowing={false} hide={(): void => {}} />)).not.toThrow();
    });

    it('should render visible if isVisible is true', (): void => {
        const { baseElement } = render(<Modal isShowing={true} hide={(): void => {}} />);
        expect(baseElement.querySelector('.modal')).toBeInTheDocument();
    });

    it('should render hidden if isVisible is false', (): void => {
        const { baseElement } = render(<Modal isShowing={false} hide={(): void => {}} />);
        expect(baseElement.querySelector('.modal')).not.toBeInTheDocument();
    });

    it('should render the button text if passed in', (): void => {
        const buttonText = 'im a button';
        const { getByText } = render(<Modal isShowing={true} hide={(): void => {}} buttonText={buttonText} />);
        expect(getByText(buttonText)).toBeInTheDocument();
    });

    it('should change the type of button depending on what is passed in', (): void => {
        const { getByText } = render(
            <Modal isShowing={true} hide={(): void => {}} buttonText="Accept" buttonType="primary" />,
        );
        expect(getByText('Accept')).toHaveClass('button--primary');
    });

    it('should change be rendered fullscreen when fullscreen=true', (): void => {
        const { baseElement } = render(
            <Modal isShowing={true} hide={(): void => {}} buttonText="Accept" fullscreen={true} />,
        );
        expect(baseElement.querySelector('.modal')).toHaveClass('modal__fullscreen');
        expect(baseElement.querySelector('.modal__buttons')).toHaveClass('modal__buttons--fullscreen');
    });

    it('should render children when visible', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <Modal isShowing={true} hide={(): void => {}}>
                        <p>test</p>
                    </Modal>,
                ),
        ).not.toThrow();
    });

    it('should call hide when cancel is clicked', (): void => {
        const mockFn = jest.fn();
        const { getByText } = render(<Modal isShowing={true} hide={mockFn} />);
        fireEvent.click(getByText('Cancel'));
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should call hide when accept is clicked', (): void => {
        const mockFn = jest.fn();
        const { getByText } = render(<Modal isShowing={true} hide={mockFn} buttonText="Accept" />);
        fireEvent.click(getByText('Accept'));
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should call onAccept when accept is clicked', (): void => {
        const mockFn = jest.fn();
        const mockFn2 = jest.fn();
        const { getByText } = render(<Modal isShowing={true} hide={mockFn} onAccept={mockFn2} buttonText="Accept" />);
        fireEvent.click(getByText('Accept'));
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn2).toHaveBeenCalledTimes(1);
    });

    it('should not call onAccept when cancel is clicked', (): void => {
        const mockFn = jest.fn();
        const mockFn2 = jest.fn();
        const { getByText } = render(<Modal isShowing={true} hide={mockFn} onAccept={mockFn2} />);
        fireEvent.click(getByText('Cancel'));
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn2).not.toHaveBeenCalled();
    });
});
