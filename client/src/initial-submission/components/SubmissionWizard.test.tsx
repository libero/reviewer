import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import routerWrapper from '../../../test-utils/routerWrapper';
import routeWrapper from '../../../test-utils/routeWrapper';
import SubmissionWizard from './SubmissionWizard';

describe('SubmissonWizard', (): void => {
  afterEach(cleanup);

  it('should render correctly', (): void => {
    const { component } = routeWrapper(SubmissionWizard, { path: '/submit/:id' })
    expect(() => render(component,
      { wrapper: routerWrapper() })).not.toThrow();
  });

  describe('Step navigation', () => {
    it('should redirect to author step if no step path given', (): void => {
      const { component, getProps } = routeWrapper(SubmissionWizard, { path: '/submit/:id' })
      render(component,{ wrapper: routerWrapper(['/submit/id']) });
      expect(getProps().location.pathname).toBe('/submit/id/author');
    });
    // when we introduce form validation we should inject the schema at the Routes.tsx level this will allow these tests to work by passing an empty validation schema
    const testNextNavigation = (currentStep: string, expectedNextStep: string) => {
      const { component, getProps } = routeWrapper(SubmissionWizard, { path: '/submit/:id' })
      const { getByText } = render(component,{ wrapper: routerWrapper([`/submit/id/${currentStep}`]) });
      expect(getProps().location.pathname).toBe(`/submit/id/${currentStep}`);
      fireEvent.click(getByText('Next'))
      expect(getProps().location.pathname).toBe(`/submit/id/${expectedNextStep}`);
    }

    it('clicking Next on Author step takes you to Files', (): void => {
      testNextNavigation('author', 'files');
    });
    it('clicking Next on Files step takes you to Details', (): void => {
      testNextNavigation('files', 'details');
    });
    it('clicking Next on Details step takes you to Editors', (): void => {
      testNextNavigation('details', 'editors');
    });
    it('clicking Next on Editors step takes you to Disclosure', (): void => {
      testNextNavigation('editors', 'disclosure');
    });
  })
})