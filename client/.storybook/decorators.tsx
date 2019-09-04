import React, { ReactNode, Suspense } from 'react';

interface Props {
    children?: ReactNode;
}

const SuspenseWrapper = ({ children }: Props) =>
    (<Suspense fallback={<div>loading...</div>}>{children}</Suspense>);

export const SuspenseDecorator = (story:any) => <SuspenseWrapper>{story()}</SuspenseWrapper>;
