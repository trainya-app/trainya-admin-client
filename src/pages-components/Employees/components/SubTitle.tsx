import { HTMLAttributes, ReactNode } from 'react';

interface IProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export const SubTitle = ({ children, className, ...rest }: IProps) => (
  <h3 className={`text-3xl font-bold text-gray-600 ${className}`} {...rest}>
    {children}
  </h3>
);
