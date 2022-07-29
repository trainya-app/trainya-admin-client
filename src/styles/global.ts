import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* body {} */

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    width: 100vw;
    max-width: 100vw;
    overflow-x: hidden;
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
