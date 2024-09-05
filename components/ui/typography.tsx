import { PropsWithChildren } from "react";

interface TypographyProps {
  children: React.ReactNode,
  color?: string
}

export function TypographySmall({ children, color='black' }: TypographyProps) {
  return (
    <small className={`text-sm font-medium leading-none ${color}`}>{children}</small>
  )
}
