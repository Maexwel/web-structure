import { createMuiTheme } from '@material-ui/core/styles';
import { grey, green } from '@material-ui/core/colors';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: grey[800],
            light: grey[600]
        },
        secondary: {
            main: green[500]
        },
    },
}); 