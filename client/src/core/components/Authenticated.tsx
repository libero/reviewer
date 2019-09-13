import React, { ReactNode, ReactElement } from "react"
import { Redirect } from "react-router"

type Props = {
    token: string,
    children?: ReactNode
}

const Authenticated: React.FC<Props> = ({ children, token }: Props): JSX.Element => {
    if (!token) {
        return <div></div>;
    }

    return children as ReactElement<any>;
}

export default Authenticated
