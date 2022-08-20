import { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: any;
  isLoading?: boolean;
  onClick?: any;
  variant?: 'primary' | 'outlined' | 'white';
}

export const Button = ({
  children,
  isLoading,
  onClick,
  variant = 'primary',
  ...rest
}: ButtonProps) => (
  <Container onClick={onClick} variant={variant} {...rest}>
    {isLoading ? <span>loading</span> : children}
  </Container>
);
