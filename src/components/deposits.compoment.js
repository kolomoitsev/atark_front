import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import {useDispatch, useSelector} from "react-redux";

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

const Deposits = ()  => {
    const classes = useStyles();

    const stats = useSelector(state => state.statistic_point)

    return (
        <>
            <Title>Recent Deposits</Title>
            <Typography component="p" variant="h4">
                {stats && stats.money_total} UAH
                <br/>
                {stats && stats.rides_total} rides
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                on {(new Date()).toLocaleTimeString()}
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View balance
                </Link>
            </div>
        </>
    );
}

export default Deposits
