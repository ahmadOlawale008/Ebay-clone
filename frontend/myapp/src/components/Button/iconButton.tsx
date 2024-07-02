import React, { LazyExoticComponent, ReactElement } from 'react'
import IconType from '../../assets/icons/icons'
import { twMerge } from 'tailwind-merge'
import isAnImageType from '../../utils/isAnImageType'

interface IconButton extends IconType {
  icon: string | JSX.Element | LazyExoticComponent<React.FC<IconType>> | ReactElement,
  className?: string
}
const IconButton: React.FC<IconButton> = ({ iconStyles, className, icon }) => {
  const renderIcon = () => {
    if (typeof icon === 'string' && isAnImageType(icon)) {
      return <img src={icon} className={twMerge("size-5", className)} alt="icon" />;
    } else if (React.isValidElement(icon)) {
      return React.cloneElement(icon as React.ReactElement<any>, {
        className: twMerge("size-5", className)
      })
    } else if (icon as React.LazyExoticComponent<React.FC<IconType>>) {
      const IconComponent = icon as React.LazyExoticComponent<React.FC<IconType>>;
      return <IconComponent className={className} />;
    }
    return null;
  };
  return (
    <>
      {renderIcon()}
    </>
  )
}

export default IconButton
