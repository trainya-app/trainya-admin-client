import { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: any;
  isLoading?: boolean;
  variant?: 'primary' | 'outlined' | 'white' | 'danger';
}

export const Button = ({
  children,
  isLoading,
  variant = 'primary',
  ...rest
}: ButtonProps) => (
  <Container variant={variant || 'primary'} {...rest}>
    {isLoading ? <span>Carregando</span> : children}
  </Container>
);
