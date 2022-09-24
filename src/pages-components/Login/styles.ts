/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.blue[900]};
  display: flex;
  align-items: center;
`;

export const MainContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  padding: 0 3.2rem;
  margin: 0 auto;
  min-height: 100vh;
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: 768px) {
    padding: 0 2rem;
  }

  @media (max-width: 468px) {
    padding: 0 1.6rem;
  }
  header {
    display: flex;
    justify-content: center;
  }
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex: 1;
  width: 100%;
  height: 100%;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  max-width: 550px;
  background-color: #ffffff05;
  border: 1px solid #ffffff08;
  backdrop-filter: blur(10px);
  padding: 4.8rem 5.6rem 6.4rem;
  border-radius: 2rem;
  margin-bottom: 2.4rem;
  height: 100%;

  @media (max-width: 468px) {
    padding: 3.2rem 2.4rem 2.4rem;
  }

  .login-btn {
    height: 5.6rem;
    margin-top: 1.6rem;
  }

  h2 {
    font-size: 3.2rem;
    text-align: center;
    font-weight: 700;
  }

  .sub-title {
    display: block;
    text-align: center;
    margin-top: -0.8rem;
  }

  span {
    color: ${({ theme }) => theme.colors.gray[500]};
  }

  .inputs-group {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    margin-top: 1.6rem;
  }

  .has-account {
    text-align: center;

    a {
      color: ${({ theme }) => theme.colors.blue[500]};
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const InputContainer = styled.div<{
  isFocus?: boolean;
  hasError?: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > div {
    width: 100%;
    display: flex;

    background: transparent;
    border-radius: 0.8rem;
    border: 1px solid ${({ theme }) => theme.colors.gray[500]};
    height: 4.8rem;
    overflow: hidden;
    outline: ${({ isFocus, hasError, theme }) =>
      isFocus
        ? `1px solid ${theme.colors.blue[500]}`
        : hasError
        ? `1px solid ${theme.colors.red.main}`
        : '0'};

    input {
      flex: 1;
      background: none;
      border: 0;
      outline: none;
      color: ${({ theme }) => theme.colors.gray[300]};
    }

    .icon {
      width: 4.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.8rem;
    }

    .visibility-control {
      background: none;
      border: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 1.6rem;
      font-size: 1.4rem;

      span {
        color: ${({ theme }) => theme.colors.gray[300]};
        font-size: 1.8rem;
        display: flex;
      }
    }
  }

  .error-msg {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.red.main};
    margin-top: 0.4rem;
  }
`;
