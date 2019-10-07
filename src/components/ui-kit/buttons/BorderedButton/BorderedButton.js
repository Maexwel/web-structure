import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
    createStyles({
        borderedButton: {
            border: "1px solid white",
            margin: theme.spacing(1)
        },
    })
);

const BorderedButton = ({ label, onClick }) => {
    const classes = useStyles();
    return (
        <Button className={classes.borderedButton} color="inherit" onClick={onClick}>
            {label}
        </Button>
    )
}
export default BorderedButton;