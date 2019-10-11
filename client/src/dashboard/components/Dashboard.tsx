import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { Button, Paragraph } from '../../ui/atoms';
import SubmissionList from './SubmissionList';
import { getSubmissionsQuery } from '../graphql';

const Dashboard = withRouter(
    (): JSX.Element => {
        const { loading, data } = useQuery(getSubmissionsQuery);
        const { t } = useTranslation();

        return (
            <div className="dashboard main-content--centered">
                <div className="dashboard__button_container">
                    <Button type="primary" onClick={(): void => {}}>
                        {t('dashboard:new-submission')}
                    </Button>
                </div>
                {loading ? 'loading' : <SubmissionList submissions={data.getSubmissions} />}
                <Paragraph type="footer">
                    To find existing submissions or to submit a{' '}
                    <Link className="footer__link" to="/author-guide/types">
                        Research Advance
                    </Link>{' '}
                    please visit our{' '}
                    <a className="footer__link" href="https://submit.elifesciences.org">
                        full peer review and submissions system
                    </a>{' '}
                </Paragraph>
            </div>
        );
    },
);

export default Dashboard;
