import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import SubmissionEntry from './SubmissionEntry';
import { Submission } from '../../initial-submission/types';
import routerWrapper from '../../../test-utils/routerWrapper';

describe('SubmissionEntry', (): void => {
    afterEach(cleanup);

    const mockSubmission: Submission = {
        id: 'someId',
        title: 'testSubmission',
        lastStepVisited: 'someStep',
        updated: new Date().getTime(),
    };

    const mockSubmissionNoTitle: Submission = {
        id: 'someId',
        title: '',
        lastStepVisited: 'someStep',
        updated: new Date().getTime(),
    };

    const getMockSubmissionForDaysAgo = (daysAgo: number): Submission => {
        const date = new Date();
        date.setDate(new Date().getDate() - daysAgo);
        return {
            id: 'someId',
            title: '',
            lastStepVisited: 'someStep',
            updated: date.getTime(),
        };
    };

    it('should render correctly', (): void => {
        expect(
            (): RenderResult =>
                render(<SubmissionEntry submission={mockSubmission} />, {
                    wrapper: routerWrapper(['/link-1']),
                }),
        ).not.toThrow();
    });

    it('should render the correct route for the submission', (): void => {
        const { container } = render(<SubmissionEntry submission={mockSubmission} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(container.querySelector('a.dashboard-entry__link')).toHaveAttribute(
            'href',
            `/submission/${mockSubmission.id}/${mockSubmission.lastStepVisited}`,
        );
    });

    it('should render the correct title for the submission', (): void => {
        const { container } = render(<SubmissionEntry submission={mockSubmission} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(container.querySelector('span.dashboard-entry__title')).toHaveTextContent(mockSubmission.title);
    });

    it('should render the correct title if the submission has none', (): void => {
        const { container } = render(<SubmissionEntry submission={mockSubmissionNoTitle} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(container.querySelector('span.dashboard-entry__title')).toHaveTextContent('(no title)');
    });

    it('should render the correct Date string for a date today', (): void => {
        const { container } = render(<SubmissionEntry submission={mockSubmissionNoTitle} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(container.querySelector('.dashboard-entry__dates > time:first-child')).toHaveTextContent('Today');
    });

    it('should render the correct Date string for a date yesterday', (): void => {
        const { container } = render(<SubmissionEntry submission={getMockSubmissionForDaysAgo(1)} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(container.querySelector('.dashboard-entry__dates > time:first-child')).toHaveTextContent('Yesterday');
    });

    it('should render the correct Date string for a date last week', (): void => {
        const { container } = render(<SubmissionEntry submission={getMockSubmissionForDaysAgo(7)} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(container.querySelector('.dashboard-entry__dates > time:first-child')).toHaveTextContent('7 days ago');
    });

    it('should render the correct Date string for a date three weeks ago', (): void => {
        const { container } = render(<SubmissionEntry submission={getMockSubmissionForDaysAgo(18)} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(container.querySelector('.dashboard-entry__dates > time:first-child')).toHaveTextContent('3 weeks ago');
    });

    it('should render the correct Date string for a date 1 month ago', (): void => {
        const { container } = render(<SubmissionEntry submission={getMockSubmissionForDaysAgo(31)} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(container.querySelector('.dashboard-entry__dates > time:first-child')).toHaveTextContent('1 month ago');
    });

    it('should render the correct Date string for a date 1 year ago', (): void => {
        const { container } = render(<SubmissionEntry submission={getMockSubmissionForDaysAgo(730)} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(container.querySelector('.dashboard-entry__dates > time:first-child')).toHaveTextContent('2 years ago');
    });

    it('should not render the modal on first render', (): void => {
        const { baseElement } = render(<SubmissionEntry submission={mockSubmission} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(baseElement.querySelector('.modal__overlay')).not.toBeInTheDocument();
    });

    it('should render the modal on delete click', (): void => {
        const { baseElement } = render(<SubmissionEntry submission={mockSubmission} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        fireEvent.click(baseElement.querySelector('.dashboard-entry__icon'));
        expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
    });
});
