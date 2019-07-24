import React from 'react'

type AppBarIconProps = {
  link: string,
  imgSrc: string,
  altText: string
}

const AppBarIcon: React.FC<AppBarIconProps> = ({link = '', imgSrc = '', altText = ''}): JSX.Element => (
  <a href={link} className="app-bar__icon">
    <img className="app-bar__img" src={imgSrc} alt={altText} />
  </a>
)

export default AppBarIcon