import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { red, amber } from '@material-ui/core/colors';

const theme = createMuiTheme({
    props: {
        MuiTableCell: {
            padding: '16px 8px',
        }
    },
    palette: {
        primary: {
            main: red[900],
            light: red[600],
            dark: red.A700
        },
        secondary: {
            main: amber.A700,
            light: amber[200],
            dark: amber[900]
        },
        type: 'dark'
    },
});

console.log(theme);


ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
