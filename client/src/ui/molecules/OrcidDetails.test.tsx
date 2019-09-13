import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import OrcidDetails from './OrcidDetails';

describe('Button', (): void => {
    afterEach(cleanup);
    const mockORCIDDetails = jest.fn().mockReturnValue({
        authorFirstName: 'Bob',
        authorLastName: 'Ross',
        authorEmail: 'a@b.com',
        institution: 'Happy Little Trees',
    });

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<OrcidDetails getOrcidDetails={mockORCIDDetails} />)).not.toThrow();
    });

    it('should hide the prefill text link when no function specified', async (): Promise<void> => {
        const { container } = render(<OrcidDetails />);
        expect(container.querySelectorAll('.typography__body--primary').length).toBe(0);
    });

    it('should fill the correct boxes with author information when the text is clicked', async (): Promise<void> => {
        const { container, getByLabelText } = render(<OrcidDetails getOrcidDetails={mockORCIDDetails} />);
        await fireEvent.click(container.querySelector('.typography__body--link'));
        expect((getByLabelText('First name') as HTMLInputElement).value).toBe('Bob');
    });
});
