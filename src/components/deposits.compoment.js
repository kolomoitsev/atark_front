import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import {useDispatch, useSelector} from "react-redux";

import i18n from '../i18n';
import { withNamespaces } from 'react-i18next';

import moment from "moment";

require('moment/locale/uk.js');
// or if you want to include all locales:
require("moment/min/locales.min");

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

const Deposits = ({t})  => {
    const classes = useStyles();

    const stats = useSelector(state => state.statistic_point)

    const locale = localStorage.getItem('lang')

    //console.log(locale)

    return (
        <>
            <Title>{t('Recent Deposits')}</Title>
            <Typography component="p" variant="h4">
                {stats && stats.money_total} UAH
                <br/>
                {stats && stats.rides_total} rides
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                on {  locale === 'en' ?  moment().locale('en').format('lll') : moment().locale('uk').format('lll') }

            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    {t('View balance')}
                </Link>
            </div>
        </>
    );
}

export default withNamespaces()(Deposits)
