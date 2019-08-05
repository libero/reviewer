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
        const { getByText } = render(<Modal isShowing={true} hide={mockFn} />);
        fireEvent.click(getByText('Accept'));
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should call onAccept when accept is clicked', (): void => {
        const mockFn = jest.fn();
        const mockFn2 = jest.fn();
        const { getByText } = render(<Modal isShowing={true} hide={mockFn} onAccept={mockFn2} />);
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
