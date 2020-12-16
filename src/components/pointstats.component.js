import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import CardComponent from './Card';
import styles from './Cards.module.css';
import {useSelector} from "react-redux";


import i18n from '../i18n';
import { withNamespaces } from 'react-i18next';

import moment from "moment";

require('moment/locale/uk.js');
// or if you want to include all locales:
require("moment/min/locales.min");


const PointStats = ({t}) => {

    const stats = useSelector(state => state.statistic_point)

    const rides = stats.rides_total

    const money = stats.money_total

    const time = stats.time_total

    const locale = localStorage.getItem('lang')

    return (
         <div className={styles.container}>
            <Typography gutterBottom variant="h4" component="h2">{t('Points stats')}</Typography>
            <br />
            <Grid container spacing={4} justify="center">
                { rides && <CardComponent
                    className={styles.infected}
                    cardTitle={t('Rides')}
                    value={rides}
                    lastUpdate={  locale === 'en' ?  moment(Date.now()).locale('en').format('LLLL') : moment(Date.now()).locale('uk').format('LLLL') }
                    cardSubtitle={t('Number of total rides on transport from this point.')}
                /> }
                { money && <CardComponent
                    className={styles.recovered}
                    cardTitle={t('Money')}
                    value={stats.money_total}
                    lastUpdate={  locale === 'en' ?  moment(Date.now()).locale('en').format('LLLL') : moment(Date.now()).locale('uk').format('LLLL') }
                    cardSubtitle={t('Number of total money earned on this point.')}
                /> }
                { time && <CardComponent
                    className={styles.deaths}
                    cardTitle={t('Time')}
                    value={stats.time_total}
                    lastUpdate={  locale === 'en' ?  moment(Date.now()).locale('en').format('LLLL') : moment(Date.now()).locale('uk').format('LLLL') }
                    cardSubtitle={t('Number time in minutes spent total on this point.')}
                /> }
            </Grid>
        </div>
    );
};

export default withNamespaces()(PointStats);
