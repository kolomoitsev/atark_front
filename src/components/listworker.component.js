import React, {useEffect, useState} from "react";


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {useSelector} from "react-redux";
import axios from "axios";

const useStyles = makeStyles( theme => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    space: {
        padding: theme.spacing(2),
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    cardsDistance: {
        margin: '3px',
    }
}));

const CardUI = ({ worker }) => {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Role : <b>{ worker.u.user_role }</b>
                </Typography>
                <Typography variant="h5" component="h2">
                    { worker.u.user_name } {worker.u.user_last_name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    { worker.u.user_email }
                </Typography>
                <Typography variant="body2" component="p">
                    working since <b> { new Date(worker.w.createdAt).toLocaleDateString() } </b>
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="secondary" size="small">Remove</Button>
            </CardActions>
        </Card>
    );
}

const ListWorker = ({ worker }) => {

    const classes = useStyles();

    //console.log(worker)

    return (
        <Grid className={classes.space} md={3} >
            <CardUI worker={worker} />
        </Grid>

    )
}

export default ListWorker
