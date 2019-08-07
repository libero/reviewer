import React, { ReactNode } from 'react';
import Paragraph from './Paragraph';

interface Props {
    children?: ReactNode;
}
const Footer = ({ children }: Props): JSX.Element => (
    <Paragraph className="footer" type="small" secondary={true}>
        {children}
    </Paragraph>
);

export default Footer;
