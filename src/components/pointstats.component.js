import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import CardComponent from './Card';
import styles from './Cards.module.css';

const PointStats = () => {

    return (
        <div className={styles.container}>
            <Typography gutterBottom variant="h4" component="h2">Points stats</Typography>
            <Grid container spacing={3} justify="center">
                <CardComponent
                    className={styles.infected}
                    cardTitle="Stats"
                    value={100}
                    lastUpdate={Date.now()}
                    cardSubtitle="Number of active cases from COVID-19."
                />
                <CardComponent
                    className={styles.recovered}
                    cardTitle="Recovered"
                    value={200}
                    lastUpdate={Date.now()}
                    cardSubtitle="Number of recoveries from COVID-19."
                />
                <CardComponent
                    className={styles.deaths}
                    cardTitle="Deaths"
                    value={300}
                    lastUpdate={Date.now()}
                    cardSubtitle="Number of deaths caused by COVID-19."
                />
            </Grid>
        </div>
    );
};

export default PointStats;
