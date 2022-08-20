import styled, { css } from 'styled-components';

const containerVariants = {
  primary: css`
    background: ${({ theme }) => theme.colors.blue[500]};
    color: ${({ theme }) => theme.colors.blue[100]};
  `,
  outlined: css`
    background: transparent;
    border: 2px solid ${({ theme }) => theme.colors.blue[500]};
    color: ${({ theme }) => theme.colors.blue[500]};
  `,
  white: css`
    background: #fff;
    color: ${({ theme }) => theme.colors.blue[500]};
  `,
};

interface ContainerProps {
  variant: 'primary' | 'outlined' | 'white';
}

export const Container = styled.button<ContainerProps>`
  background: ${({ theme }) => theme.colors.blue[500]};
  border: 0;
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.blue[100]};
  font-weight: 700;
  box-shadow: 0 0.2rem 0.3rem ${({ theme }) => `${theme.colors.blue[300]}10`};
  transition: background 0.2s;

  ${({ variant }) => containerVariants[variant] || containerVariants.primary};

  &:hover {
    background: ${({ theme, variant }) => theme.colors.blue[600]};
    color: ${({ variant, theme }) =>
      variant === 'white' || variant === 'outlined' ? theme.colors.white : ''};
  }

  &:active {
    background: ${({ theme }) => theme.colors.blue[500]};
  }
`;
