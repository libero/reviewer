import React, { ReactNode } from 'react'
type AppBarProps = {
  children: ReactNode
}
const AppBar: React.FC<AppBarProps> = ({ children }): JSX.Element => (
  <div className="appbar" >{ children }</div>
)

export default AppBar