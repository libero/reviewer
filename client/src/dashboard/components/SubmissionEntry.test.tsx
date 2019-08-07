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
        status: 'CONTINUE_SUBMISSION',
        updated: new Date().getTime(),
    };

    const mockSubmissionNoTitle: Submission = {
        id: 'someId',
        title: '',
        lastStepVisited: 'someStep',
        status: 'CONTINUE_SUBMISSION',
        updated: new Date().getTime(),
    };

    const getMockSubmissionForStatus = (status: string): Submission => ({
        id: 'someId',
        title: '',
        lastStepVisited: 'someStep',
        status: status,
        updated: new Date().getTime(),
    });

    const getMockSubmissionForDaysAgo = (daysAgo: number): Submission => {
        const date = new Date();
        date.setDate(new Date().getDate() - daysAgo);
        return {
            id: 'someId',
            title: '',
            lastStepVisited: 'someStep',
            status: 'CONTINUE_SUBMISSION',
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

    it('should render the correct classes for unfinished submissions', (): void => {
        const { container } = render(
            <SubmissionEntry submission={getMockSubmissionForStatus('CONTINUE_SUBMISSION')} />,
            {
                wrapper: routerWrapper(['/link-1']),
            },
        );
        expect(container.querySelector('.submission-entry__link--continue_submission')).toBeInTheDocument();
        expect(container.querySelector('.submission-entry__title--continue_submission')).toBeInTheDocument();
        expect(container.querySelector('.submission-entry__link_text--continue_submission')).toBeInTheDocument();
    });

    it('should render the correct classes for submitted submissions', (): void => {
        const { container } = render(<SubmissionEntry submission={getMockSubmissionForStatus('SUBMITTED')} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(container.querySelector('.submission-entry__link--submitted')).toBeInTheDocument();
        expect(container.querySelector('.submission-entry__title--submitted')).toBeInTheDocument();
        expect(container.querySelector('.submission-entry__link_text--submitted')).toBeInTheDocument();
    });

    it('should render the correct classes for rejected submissions', (): void => {
        const { container } = render(<SubmissionEntry submission={getMockSubmissionForStatus('REJECTED')} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(container.querySelector('.submission-entry__link--rejected')).toBeInTheDocument();
        expect(container.querySelector('.submission-entry__title--rejected')).toBeInTheDocument();
        expect(container.querySelector('.submission-entry__link_text--rejected')).toBeInTheDocument();
    });

    it('should render the correct route for the submission', (): void => {
        const { container } = render(<SubmissionEntry submission={mockSubmission} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(container.querySelector('a.submission-entry__link')).toHaveAttribute(
            'href',
            `/submission/${mockSubmission.id}/${mockSubmission.lastStepVisited}`,
        );
    });

    it('should render the correct title for the submission', (): void => {
        const { container } = render(<SubmissionEntry submission={mockSubmission} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(container.querySelector('span.submission-entry__title')).toHaveTextContent(mockSubmission.title);
    });

    it('should render the correct title if the submission has none', (): void => {
        const { container } = render(<SubmissionEntry submission={mockSubmissionNoTitle} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(container.querySelector('span.submission-entry__title')).toHaveTextContent('(no title)');
    });

    it('should render the correct Date string for a date today', (): void => {
        const { container } = render(<SubmissionEntry submission={mockSubmissionNoTitle} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(container.querySelector('.submission-entry__dates > time:first-child')).toHaveTextContent('Today');
    });

    it('should render the correct Date string for a date yesterday', (): void => {
        const { container } = render(<SubmissionEntry submission={getMockSubmissionForDaysAgo(1)} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(container.querySelector('.submission-entry__dates > time:first-child')).toHaveTextContent('Yesterday');
    });

    it('should render the correct Date string for a date last week', (): void => {
        const { container } = render(<SubmissionEntry submission={getMockSubmissionForDaysAgo(7)} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(container.querySelector('.submission-entry__dates > time:first-child')).toHaveTextContent('7 days ago');
    });

    it('should render the correct Date string for a date three weeks ago', (): void => {
        const { container } = render(<SubmissionEntry submission={getMockSubmissionForDaysAgo(18)} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(container.querySelector('.submission-entry__dates > time:first-child')).toHaveTextContent('3 weeks ago');
    });

    it('should render the correct Date string for a date 1 month ago', (): void => {
        const { container } = render(<SubmissionEntry submission={getMockSubmissionForDaysAgo(31)} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(container.querySelector('.submission-entry__dates > time:first-child')).toHaveTextContent('1 month ago');
    });

    it('should render the correct Date string for a date 1 year ago', (): void => {
        const { container } = render(<SubmissionEntry submission={getMockSubmissionForDaysAgo(730)} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(container.querySelector('.submission-entry__dates > time:first-child')).toHaveTextContent('2 years ago');
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
        fireEvent.click(baseElement.querySelector('.submission-entry__icon'));
        expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
    });
});
