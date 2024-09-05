import { TypographySmall } from './ui/typography';
import React, { PropsWithChildren } from 'react'

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <TypographySmall color='text-red-500'>{children}</TypographySmall>
  )
}

export default ErrorMessage;
