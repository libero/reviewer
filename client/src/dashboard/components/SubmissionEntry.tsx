import React from 'react';
import { Delete } from '@material-ui/icons';
import moment from 'moment';
import useModal from '../../ui/hooks/useModal';
import { Modal } from '../../ui/atoms';
import { Submission } from '../../initial-submission/types';
import { Link } from 'react-router-dom';

const dashboardDateText = (date: number): string => {
    const diffDays = moment(new Date()).diff(date, 'days');
    if (diffDays < 0 || Number.isNaN(diffDays)) {
        return 'Invalid date';
    }

    if (diffDays === 0) {
        return 'Today';
    }

    if (diffDays === 1) {
        return 'Yesterday';
    }

    if (diffDays < 14) {
        return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    }

    if (diffDays < 30) {
        const diffWeeks = Math.round(diffDays / 7);
        return `${diffWeeks} ${diffWeeks === 1 ? 'week' : 'weeks'} ago`;
    }

    if (diffDays < 730) {
        const diffMonths = Math.round(diffDays / 30);
        return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
    }
    const diffYears = Math.round(diffDays / 365);
    return `${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`;
};

interface Props {
    submission: Submission;
}

const SubmissionEntry: React.FC<Props> = ({ submission }: Props): JSX.Element => {
    const { isShowing, toggle } = useModal();
    const status = submission.status.toLowerCase();
    return (
        <div className="submission-entry">
            <Link
                className={`submission-entry__link submission-entry__link--${status}`}
                to={`/submission/${submission.id}/${submission.lastStepVisited || 'title'}`}
            >
                <div className="submission-entry__content">
                    <span className={`submission-entry__title submission-entry__title--${status}`}>
                        {submission.title.length !== 0 ? submission.title : '(no title)'}
                    </span>
                    <div className={`submission-entry__link_text submission-entry__link_text--${status}`}>
                        <span>Continue Submission</span>
                    </div>
                    <div className="submission-entry__dates">
                        <time>{dashboardDateText(submission.updated)}</time>
                        <time className="submission-entry__date">
                            {moment(submission.updated).format('ddd D MMM YYYY')}
                        </time>
                    </div>
                </div>
            </Link>
            <div className="submission-entry__icon_container">
                <Modal hide={toggle} isShowing={isShowing} onAccept={(): void => {}}>
                    <h2>Confirm delete submission?</h2>
                    <p>
                        Your submission &quot;
                        {submission.title}
                        &quot; will be deleted permanently
                    </p>
                </Modal>
                <Delete
                    onClick={(): void => toggle()}
                    className="submission-entry__icon"
                    height="24"
                    width="24"
                    viewBox="3 3 18 18"
                />
            </div>
        </div>
    );
};

export default SubmissionEntry;
