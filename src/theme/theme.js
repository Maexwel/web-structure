import { createMuiTheme } from '@material-ui/core/styles';
import { blue, indigo } from '@material-ui/core/colors';

export const theme = createMuiTheme({
    palette: {
        primary: blue, // Main color for the layout (app bar, ...)
        secondary: indigo, // Color used for inputs, ...
    },
});

export const successColor = '#4CAF50'; // Success is not part of this material-ui version