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


import i18n from '../i18n';
import { withNamespaces } from 'react-i18next';


import moment from "moment";

require('moment/locale/uk.js');
// or if you want to include all locales:
require("moment/min/locales.min");

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

const CardUI = ({ worker, t}) => {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const point_id = worker.w.point_id;
    const point_owner_id = localStorage.getItem('_id');
    const user_id = worker.u._id



    const deleteWorker = async () => {

        const token = await localStorage.getItem('access_token')

        axios.patch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/point/worker/out/`, { point_id, point_owner_id, user_id }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const locale = localStorage.getItem('lang')

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Role : <b>{ worker.u.user_role }</b>
                    <br/>
                    Status : <b>{ worker.w.point_worker_status }</b>
                </Typography>
                <Typography variant="h5" component="h2">
                    { worker.u.user_name } {worker.u.user_last_name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    { worker.u.user_email }
                </Typography>
                <Typography variant="body2" component="p">
                    working since <b> {  locale === 'en' ?  moment(worker.w.createdAt).locale('en').format('lll') :
                    moment(worker.w.createdAt).locale('uk').format('lll') } </b>
                </Typography>
            </CardContent>
            <CardActions>
                { worker.w.point_worker_status === 'deleted' ?
                    <Button disabled variant="contained" color="primary" size="small">Remove</Button>
                    :
                    <Button onClick={ deleteWorker } variant="contained" color="secondary" size="small">Remove</Button>
                }
            </CardActions>
        </Card>
    );
}

const ListWorker = ({worker}) => {

    const classes = useStyles();

    return (
        <Grid className={classes.space} md={3} >
            <CardUI worker={worker}/>
        </Grid>

    )
}

export default withNamespaces()(ListWorker)
