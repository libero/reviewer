import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import PeoplePicker from './PeoplePicker';

describe('PeoplePicker', (): void => {
    afterEach(cleanup);
    it('should render correctly', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <PeoplePicker onRemove={jest.fn()} onSearch={jest.fn()} label="" setSelectedPeople={jest.fn()} />,
                ),
        ).not.toThrow();
    });

    it('SelectedPeopleList button toggles the PeoplePickerSelector', async (): Promise<void> => {
        const { getByText, baseElement } = render(
            <PeoplePicker onRemove={jest.fn()} onSearch={jest.fn()} label="" setSelectedPeople={jest.fn()} />,
        );
        expect(baseElement.querySelector('.modal__overlay')).not.toBeInTheDocument();
        await fireEvent.click(getByText('selected_people_list--open'));
        expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
    });
});
