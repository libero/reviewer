import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import SubmissionList from './SubmissionList';
import { Submission } from '../../initial-submission/types';
import routerWrapper from '../../../test-utils/routerWrapper';

describe('SubmissionList', (): void => {
    afterEach(cleanup);

    const mockSubmission: Submission = {
        id: 'someId',
        title: 'testSubmission',
        lastStepVisited: 'someStep',
        updated: new Date().getTime(),
    };

    it('should render correctly', (): void => {
        expect(
            (): RenderResult =>
                render(<SubmissionList submissions={[mockSubmission]} />, {
                    wrapper: routerWrapper(['/link-1']),
                }),
        ).not.toThrow();
    });

    it('should render empty list message correctly', (): void => {
        const { getByText } = render(<SubmissionList submissions={[]} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(getByText("You don't have any submissions. Maybe you should make one?")).toBeInTheDocument();
    });
});
