import React, { CSSProperties } from 'react';
import { render, cleanup, RenderResult, waitForElement, fireEvent, act } from '@testing-library/react';
import PeoplePickerSelector from './PeoplePickerSelector';
import mockOffsetSize from '../../../test-utils/offsetSizeMock';

let people = [
    {
        id: '1',
        name: 'Name 1',
        institution: 'Institution 1',
        focuses: ['Tag 1', 'Tage 2'],
        expertises: ['Tag 3'],
    },
    {
        id: '2',
        name: 'Name 2',
        institution: 'Institution 2',
        focuses: ['Tag 1', 'Tage 2'],
        expertises: ['Tag 3'],
    },
    {
        id: '3',
        name: 'Name 3',
        institution: 'Institution 3',
        focuses: ['Tag 1', 'Tage 2'],
        expertises: ['Tag 3'],
    },
    {
        id: '4',
        name: 'Name 4',
        institution: 'Institution 4',
        focuses: ['Tag 1', 'Tage 2'],
        expertises: ['Tag 3'],
    },
];

describe('PeoplePickerSelector', (): void => {
    afterEach(cleanup);
    const originalGetComputedStyle = window.getComputedStyle;
    beforeAll((): void => {
        mockOffsetSize(1920, 1080);
        window.getComputedStyle = jest.fn().mockImplementation(
            (): CSSProperties => {
                return { marginTop: 50, marginBottom: 50, paddingBottom: 50 };
            },
        );
    });

    afterAll((): void => {
        window.getComputedStyle = originalGetComputedStyle;
    });

    it('should render correctly', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <PeoplePickerSelector
                        initialySelected={[]}
                        onDone={jest.fn()}
                        onSearch={jest.fn()}
                        label=" "
                        toggle={jest.fn()}
                        isShowing={true}
                    />,
                ),
        ).not.toThrow();
    });

    it('it renders all of the passed people', async (): Promise<void> => {
        const { baseElement } = render(
            <PeoplePickerSelector
                initialySelected={[]}
                people={people}
                onDone={jest.fn()}
                onSearch={jest.fn()}
                label=" "
                toggle={jest.fn()}
                isShowing={true}
            />,
        );
        await waitForElement(
            (): NodeListOf<Element> => baseElement.querySelectorAll('.people-picker__modal_list--item'),
        );
        expect(baseElement.querySelectorAll('.people-picker__modal_list--item')).toHaveLength(4);
    });

    it('outputs the passed label text', (): void => {
        const { getByText } = render(
            <PeoplePickerSelector
                people={people}
                initialySelected={[]}
                onDone={jest.fn()}
                onSearch={jest.fn()}
                label="SomeTestLabel"
                toggle={jest.fn()}
                isShowing={true}
            />,
        );

        expect(getByText('SomeTestLabel')).toBeInTheDocument();
    });

    it('it renders all of the selected people with the correct icon', (): void => {
        const { baseElement } = render(
            <PeoplePickerSelector
                people={people}
                initialySelected={['1', '3']}
                onDone={jest.fn()}
                onSearch={jest.fn()}
                label=" "
                toggle={jest.fn()}
                isShowing={true}
            />,
        );
        expect(baseElement.querySelectorAll('.person-pod__selected_icon')).toHaveLength(2);
    });

    it('renders guidance text string with min value shown when min selected not met', (): void => {
        const min = 2;
        const { baseElement } = render(
            <PeoplePickerSelector
                people={people}
                onDone={jest.fn()}
                onSearch={jest.fn()}
                label=" "
                toggle={jest.fn()}
                min={min}
                isShowing={true}
            />,
        );
        expect(baseElement.querySelector('.people-picker__guidance').textContent).toBe(
            'validation--peoplepicker_guidance-prefix ' + min + ' validation--peoplepicker_guidance-suffix',
        );
    });

    it('does not render guidance text if min value is 0', (): void => {
        const min = 0;
        const { baseElement } = render(
            <PeoplePickerSelector
                people={people}
                onDone={jest.fn()}
                onSearch={jest.fn()}
                label=" "
                toggle={jest.fn()}
                min={min}
                isShowing={true}
            />,
        );
        expect(baseElement.querySelector('.people-picker__guidance').textContent).toBe('');
    });

    it('does not render guidance text if no min selected is passed', (): void => {
        const { baseElement } = render(
            <PeoplePickerSelector
                people={people}
                onDone={jest.fn()}
                onSearch={jest.fn()}
                label=" "
                toggle={jest.fn()}
                isShowing={true}
            />,
        );
        expect(baseElement.querySelector('.people-picker__guidance').textContent).toBe('');
    });

    it('it adds the selected people when clicked', async (): Promise<void> => {
        const { baseElement } = render(
            <PeoplePickerSelector
                initialySelected={[]}
                people={people}
                onDone={jest.fn()}
                onSearch={jest.fn()}
                label=" "
                toggle={jest.fn()}
                isShowing={true}
            />,
        );

        expect(baseElement.querySelectorAll('.person-pod__selected_icon')).toHaveLength(0);
        await fireEvent.click(baseElement.querySelector('.pod__button'));
        expect(baseElement.querySelectorAll('.person-pod__selected_icon')).toHaveLength(1);
        expect(baseElement.querySelectorAll('.person-pod__selected_icon')).toHaveLength(1);
    });

    it('it adds the selected people when clicked and confirmed', (): void => {
        // this test will be fragile, needs a rethink
        const doneMock = jest.fn();
        const { baseElement } = render(
            <PeoplePickerSelector
                initialySelected={[]}
                people={people}
                onDone={doneMock}
                onSearch={jest.fn()}
                label=" "
                toggle={jest.fn()}
                isShowing={true}
            />,
        );
        expect(baseElement.querySelectorAll('.person-pod__selected_icon')).toHaveLength(0);
        fireEvent.click(baseElement.querySelector('.pod__button'));
        fireEvent.click(baseElement.querySelector('.modal .button--primary'));
        expect(doneMock).toHaveBeenCalledWith(['1']);
    });

    it('it does not add the selected people when clicked and confirmed', (): void => {
        const doneMock = jest.fn();
        const { baseElement } = render(
            <PeoplePickerSelector
                initialySelected={[]}
                people={people}
                onDone={doneMock}
                onSearch={jest.fn()}
                label=" "
                toggle={jest.fn()}
                isShowing={true}
            />,
        );
        expect(baseElement.querySelectorAll('.person-pod__selected_icon')).toHaveLength(0);
        fireEvent.click(baseElement.querySelector('.pod__button'));
        fireEvent.click(baseElement.querySelector('.modal .button'));
        expect(doneMock).not.toHaveBeenCalled();
    });

    it('it should show the banner when the maximum selected has been reached', (): void => {
        const doneMock = jest.fn();
        const { baseElement } = render(
            <PeoplePickerSelector
                initialySelected={['1', '2', '3', '4']}
                people={people}
                onDone={doneMock}
                onSearch={jest.fn()}
                label=" "
                toggle={jest.fn()}
                isShowing={true}
                max={4}
            />,
        );
        expect(baseElement.querySelectorAll('.person-pod__selected_icon')).toHaveLength(4);
        expect(baseElement.querySelector('.banner')).toBeInTheDocument();
    });

    it('should call the onSearch callback when the user types a string into the search box', async (): Promise<
        void
    > => {
        jest.useFakeTimers();

        const searchMock = jest.fn();
        const { baseElement } = render(
            <PeoplePickerSelector
                initialySelected={[]}
                people={people}
                onDone={jest.fn()}
                onSearch={searchMock}
                label=" "
                toggle={jest.fn()}
                isShowing={true}
            />,
        );
        await fireEvent.change(baseElement.querySelector('input'), { target: { value: 'someSearch' } });
        act(() => jest.advanceTimersByTime(510));
        expect(searchMock).toBeCalledWith('someSearch');
    });
});
