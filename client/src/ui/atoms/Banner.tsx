import React, { ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}
const Banner = ({ children }: Props): JSX.Element => <div className="banner">{children}</div>;
export default Banner;
