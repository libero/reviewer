import { cleanup, render, fireEvent, RenderResult } from '@testing-library/react';
import routerWrapper from '../../../test-utils/routerWrapper';
import routeWrapper from '../../../test-utils/routeWrapper';
import SubmissionWizard from './SubmissionWizard';

describe('SubmissonWizard', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        const { component } = routeWrapper(SubmissionWizard, { path: '/submit/:id' });
        expect((): RenderResult => render(component, { wrapper: routerWrapper() })).not.toThrow();
    });

    describe('Step navigation', (): void => {
        it('should redirect to author step if no step path given', (): void => {
            const { component, getProps } = routeWrapper(SubmissionWizard, { path: '/submit/:id' });
            render(component, { wrapper: routerWrapper(['/submit/id']) });
            expect(getProps().location.pathname).toBe('/submit/id/author');
        });
        // when we introduce form validation we should inject the schema at the Routes.tsx level this will allow these tests to work by passing an empty validation schema
        const testNavigationButtons = (buttonText: string, currentStep: string, expectedNextStep: string): void => {
            const { component, getProps } = routeWrapper(SubmissionWizard, { path: '/submit/:id' });
            const { getByText } = render(component, { wrapper: routerWrapper([`/submit/id/${currentStep}`]) });
            expect(getProps().location.pathname).toBe(`/submit/id/${currentStep}`);
            fireEvent.click(getByText(buttonText));
            expect(getProps().location.pathname).toBe(`/submit/id/${expectedNextStep}`);
        };

        const nextButtonText = 'next';
        const backButtonText = 'back';

        it('clicking Next on Author step takes you to Files', (): void => {
            testNavigationButtons(nextButtonText, 'author', 'files');
        });
        it('clicking Next on Files step takes you to Details', (): void => {
            testNavigationButtons(nextButtonText, 'files', 'details');
        });
        it('clicking Next on Details step takes you to Editors', (): void => {
            testNavigationButtons(nextButtonText, 'details', 'editors');
        });
        it('clicking Next on Editors step takes you to Disclosure', (): void => {
            testNavigationButtons(nextButtonText, 'editors', 'disclosure');
        });
        it('clicking Back on Disclosure step takes you to Editors', (): void => {
            testNavigationButtons(backButtonText, 'disclosure', 'editors');
        });
        it('clicking Back on Editors step takes you to Details', (): void => {
            testNavigationButtons(backButtonText, 'editors', 'details');
        });
        it('clicking Back on Details step takes you to Files', (): void => {
            testNavigationButtons(backButtonText, 'details', 'files');
        });
        it('clicking Back on Files step takes you to Author', (): void => {
            testNavigationButtons(backButtonText, 'files', 'author');
        });
    });
});
