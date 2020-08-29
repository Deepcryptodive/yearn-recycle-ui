import { createGlobalStyle } from 'styled-components';
import WorkSansTTF from 'vendor/fonts/WorkSans-VariableFont_wght.ttf';

const WorkSans = {
  fontFamily: 'Work Sans Thin',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Work Sans Thin'),
    local('Work Sans Thin'),
    url(${WorkSansTTF}) format('truetype')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Work Sans Thin';
    font-weight: 600;
  }
  #app {
    height: 100%;
  }
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0px;
    * {
      font-family:"Work Sans Thin", system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
    h3 {
      margin-block-end: 0;
      font-size: 24px !important;
      font-weight: 600 !important;
      font-family: 'Work Sans Thin';
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      line-height: 1.2;
    }
    .identicon {
      border-radius: 50px;
    }
    h5 {
      margin-block-end: 0;
      font-size: 14px !important;
      font-weight: 600 !important;
      font-family: 'Work Sans Thin';
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      line-height: 1.2 !important;
    }
  }
  .MuiPaper-root {
    border: 1px solid rgba(25, 101, 233, 0.5);
    margin: 16px 0px;
    position: relative;
    transition: margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 50px;
    overflow: hidden;
  }
  .MuiAccordionSummary-content {
    margin: 0px !important;
  }
  .MuiButtonBase-root .MuiAccordionSummary-root {
    background-color: red !important;
  }
  .MuiButtonBase-root {
    padding: 30px 42px !important;
  }
  .MuiAccordionSummary-expandIcon {
    padding: 12px !important;
  }
  .MuiAccordion-rounded {
    border-radius: 50px !important;
  }
  .MuiAccordionDetails-root {
    padding: 0px 4px 24px 53px !important;
  }
  .MuiAccordion-root:before {
  }
  .MuiAccordion-root.Mui-expanded {
    margin: 32px 0px !important; 
  }
  .MuiPaper-elevation1 {
    box-shadow: none !important;
  }

  .connectModal {
    max-width: 600px !important;
  }
  .modal-header {
    padding: 6px 11px
    border-bottom: 0px !important;
  }
  .modal-content {
    border: 0px;
  }

`;

export default GlobalStyle;
