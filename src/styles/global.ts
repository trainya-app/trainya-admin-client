import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    width: 100vw;
    max-width: 100vw;
    overflow-x: hidden;
    font-family: 'Open Sans', sans-serif;
    color: ${({ theme }) => theme.colors.blue[900]};
  }

  body, input, textarea, select, button {
    font-family: 'Open Sans', sans-serif;
    font-size: 1.6rem;
  }

  ul {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    filter: brightness(0.7);
    cursor: not-allowed;
  }
`;

export default GlobalStyle;
