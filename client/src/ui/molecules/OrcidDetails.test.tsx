import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import OrcidDetails, { AuthorDetails } from './OrcidDetails';

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

    it('should fill the correct boxes with author information when the text is clicked', async (): Promise<void> => {
        const { container, getByLabelText } = render(<OrcidDetails getOrcidDetails={mockORCIDDetails} />);
        await fireEvent.click(container.querySelector('.typography__body--link'));
        expect((getByLabelText('First name') as HTMLInputElement).value).toBe('Bob');
    });
});
