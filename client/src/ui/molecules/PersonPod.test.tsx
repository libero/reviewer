import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import PersonPod from './PersonPod';

describe('Button', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<PersonPod toggleHandler={jest.fn()} />)).not.toThrow();
    });

    it('should toggle the check if preselected is passed in', async (): Promise<void> => {
        const { container } = render(<PersonPod toggleHandler={jest.fn()} initialySelected={true} />);
        expect(container.querySelectorAll('[data-selected]').length).toBe(1);
    });

    it('should toggle the check if the button is clicked', async (): Promise<void> => {
        const mockHandler = jest.fn();
        const { container } = render(<PersonPod toggleHandler={mockHandler} />);
        await fireEvent.click(container.querySelector('.pod__button'));
        expect(container.querySelectorAll('[data-selected]').length).toBe(1);
    });

    it('should call the callback if the button is clicked', async (): Promise<void> => {
        const mockHandler = jest.fn();
        const { container } = render(<PersonPod toggleHandler={mockHandler} />);
        await fireEvent.click(container.querySelector('.pod__button'));
        expect(mockHandler).toHaveBeenCalled();
    });

    it('should render name prop text', (): void => {
        const { getByText } = render(<PersonPod toggleHandler={jest.fn()} name="A TEST NAME" />);
        expect(getByText('A TEST NAME')).toBeInTheDocument();
    });

    it('should render institution prop text', (): void => {
        const { getByText } = render(<PersonPod toggleHandler={jest.fn()} institution="A TEST INSTITUTION" />);
        expect(getByText('A TEST INSTITUTION')).toBeInTheDocument();
    });

    it('should render a comma seperated list of focuses', (): void => {
        const { getByText } = render(<PersonPod toggleHandler={jest.fn()} focuses={['FocusA', 'FocusB', 'FocusC']} />);
        expect(getByText('FocusA, FocusB, FocusC')).toBeInTheDocument();
    });

    it('should render a comma seperated list of expertieses', (): void => {
        const { getByText } = render(
            <PersonPod toggleHandler={jest.fn()} expertises={['Expertise1', 'Expertise2', 'Expertise3']} />,
        );
        expect(getByText('Expertise1, Expertise2, Expertise3')).toBeInTheDocument();
    });

    it('should render a comma seperated list of focuses and expertises', (): void => {
        const { getByText } = render(
            <PersonPod
                toggleHandler={jest.fn()}
                focuses={['FocusA', 'FocusB', 'FocusC']}
                expertises={['Expertise1', 'Expertise2', 'Expertise3']}
            />,
        );
        expect(getByText('FocusA, FocusB, FocusC, Expertise1, Expertise2, Expertise3')).toBeInTheDocument();
    });

    it('should use an override select icon if passed', () => {
        const { container, rerender } = render(
            <PersonPod
                initialySelected={true}
                toggleHandler={jest.fn()}
            />,
        );
        expect(container.querySelector('.pod__button').querySelector('.person-pod__selected_icon')).toBeInTheDocument();
        rerender(<PersonPod
            initialySelected={true}
            selectedButtonIcon={<div className="testIcon" />}
            toggleHandler={jest.fn()}
        />)
        expect(container.querySelector('.pod__button').querySelector('.person-pod__selected_icon')).not.toBeInTheDocument();
        expect(container.querySelector('.pod__button').querySelector('.testIcon')).toBeInTheDocument();


    })
});
