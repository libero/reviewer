import React from 'react';
import PersonInfo from './PersonInfo';
import { cleanup, render, RenderResult } from '@testing-library/react';

describe('PersonInfo', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect(
            (): RenderResult => render(<PersonInfo name="" institution="" expertises={[]} focuses={[]} />),
        ).not.toThrow();
    });

    it('should render the name', (): void => {
        const testName = 'Test Name';
        const { getByText } = render(<PersonInfo name={testName} institution="" expertises={[]} focuses={[]} />);
        expect(getByText(testName)).toBeInTheDocument();
    });

    it('should render the institution', (): void => {
        const testInstitution = 'Test Institution';
        const { getByText } = render(<PersonInfo name="" institution={testInstitution} expertises={[]} focuses={[]} />);
        expect(getByText(testInstitution)).toBeInTheDocument();
    });

    it('should render the expertises', (): void => {
        const testExpertises = ['expertise 1', 'expertise 2'];
        const { getByText } = render(<PersonInfo name="" institution="" expertises={testExpertises} focuses={[]} />);
        expect(getByText(testExpertises.join(', '))).toBeInTheDocument();
    });

    it('should render the focuses', (): void => {
        const testFocuses = ['focus 1', 'focus 2'];
        const { getByText } = render(<PersonInfo name="" institution="" expertises={[]} focuses={testFocuses} />);
        expect(getByText(testFocuses.join(', '))).toBeInTheDocument();
    });
});
