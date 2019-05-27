import blue from '@material-ui/core/colors/blue';
import indigo  from '@material-ui/core/colors/indigo';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProviderProps } from '@material-ui/core/styles/MuiThemeProvider';
import { createGenerateClassName } from '@material-ui/styles';
import { SheetsRegistry } from 'jss';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    },
    secondary: {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[700],
    },
  },
  typography: {
    useNextVariants: true,
  },
});

export interface PageContext extends MuiThemeProviderProps {
  generateClassName: any
  sheetsRegistry: SheetsRegistry
}

export default function(): PageContext {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
    children: undefined,
  };
}
