import React, {useEffect, useState} from "react";

import axios from "axios";


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {useSelector} from "react-redux";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ReactMapboxGl, {Feature, Layer, Marker} from "react-mapbox-gl";


import i18n from '../i18n';
import { withNamespaces } from 'react-i18next';

import 'mapbox-gl/dist/mapbox-gl.css';

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
    },
}));



const ListRents = ({t}) => {

    const [open, setOpen] = React.useState(false);

    const [selectedItem, setSelectedItem] = useState(null)

    const handleClose = () => {
        setOpen(false);
    };

    const setItem = (item) => {
        setSelectedItem(item)
        setOpen(true);

    }

    const increaseRating = async () => {

        const book_id = selectedItem.r._id;

        axios.patch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/book/rate/add/${book_id}`, {
            user_rating: 5
        }, {
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then(res => alert(res.data.message))
            .catch(err => console.log(err))




    }

    const decreaseRating = async () => {

        const book_id = selectedItem.r._id;

        axios.patch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/book/rate/min/${book_id}`, {
            user_rating: 5
        }, {
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then(res => alert(res.data.message))
            .catch(err => console.log(err))



    }

    const lockTransport = async () => {

        const transport_id = selectedItem.transport._id

        axios.patch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/transport/lock/${transport_id}`, {}, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then(res => alert(res.data.message))
            .catch(err => console.log(err))



    }

    const unlockTransport = async () => {

        const transport_id = selectedItem.transport._id

        axios.patch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/transport/unlock/${transport_id}`, {}, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then(res => alert(res.data.message))
            .catch(err => console.log(err))



    }

    const ResponsiveDialog = () =>  {

        const theme = useTheme();
        const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

        const Map = ReactMapboxGl({
            accessToken: 'pk.eyJ1Ijoia29sb21vaXRzZXYiLCJhIjoiY2tnZTZudTR2MTQ2eTJxcWFuMnM4bDl6biJ9.GzniTPg8FNExxfqYlwyGwQ'
        });

        const locale = localStorage.getItem('lang')

        const [geolocation, setGeolocation] = useState(null)

        useEffect( () => {

            const getGeoData = async () => {

                selectedItem && axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/info/book/${selectedItem.r._id}`, {
                        headers : {
                            'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
                        }
                    })
                        .then(res => setGeolocation(res.data.info))
                        .catch(err => console.log(err))

            }

            getGeoData()

        }, [selectedItem])

        return (
            <div>
                <Dialog
                    className={classes.form}
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {t("Rent details")}
                    </DialogTitle>
                    { selectedItem && <DialogContent>
                        <DialogContentText>
                            {t('Transport information')}
                            <p>
                                {t('Model')} : { selectedItem.transport.transport_name }
                                <br/>
                                {t('Serial number')} : { selectedItem.transport.transport_serial_number }
                            </p>

                            {t('User information')}
                            <p>
                                {t('Name')} : { selectedItem.user.user_name }
                                <br/>
                                {t('Email')} : { selectedItem.user.user_email }
                                <br/>
                                {t('Phone')} : { selectedItem.user.user_phone }
                                <br/>
                                {t('Rating')} : { selectedItem.user.user_rating }
                            </p>

                            <br/>

                            {t('Tariff information')}

                            <p>
                                {t('Tariff name')} : { selectedItem.tariff.tariff_name }
                                <br/>
                                {t('Rent started at')} :  {  locale === 'en' ?  moment(selectedItem.r.book_start).locale('en').format('lll')
                                : moment(selectedItem.r.book_start).locale('uk').format('lll') }
                                <br/>
                                {t('Rent ends at')} : {  locale === 'en' ?  moment(selectedItem.r.book_end).locale('en').format('lll')
                                : moment(selectedItem.r.book_end).locale('uk').format('lll') }

                            </p>

                            <Button onClick={increaseRating} variant="text" color="primary" size="small" >{t('Increase rating')}</Button>

                            <Button onClick={decreaseRating} variant="text" color="secondary" size="small">{t('Decrease rating')}</Button>

                        </DialogContentText>
                    </DialogContent> }



                    <Map
                        style="mapbox://styles/mapbox/streets-v11"
                        containerStyle={{
                            height: '45vh',
                            width: '35vw'
                        }}
                        center={[36.2347437, 49.989734]}
                    >

                        {
                            geolocation && geolocation.map(mapItem =>
                                <Marker
                                    coordinates={[parseFloat(mapItem.info_lng.$numberDecimal), parseFloat(mapItem.info_lat.$numberDecimal)]}
                                    anchor="bottom">
                                    <div class="mapMarkerStyle"><img src="https://img.icons8.com/ios/452/scooter.png" alt=""/></div>
                                </Marker>)
                        }

                    </Map>

                    { selectedItem && <DialogActions>

                        { selectedItem.transport.transport_status === 'active' ?
                            <Button autoFocus onClick={lockTransport} color="primary">
                                {t('Lock transport')}
                            </Button> :
                            <Button autoFocus onClick={unlockTransport} color="secondary">
                                {t('Unlock transport')}
                            </Button> }

                        <Button onClick={handleClose} color="primary" autoFocus>
                            {t('Close')}
                        </Button>
                    </DialogActions> }




                </Dialog>
            </div>
        );
    }

    const CardUI = ({ item }) => {

        const classes = useStyles();
        const bull = <span className={classes.bullet}>•</span>;

        return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {t('Status')}: { item.r.book_status }
                    </Typography>
                    <Typography variant="h5" component="h2">
                        { item.transport.transport_name }
                        <br/>
                        { item.transport.transport_serial_number }
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        { item.user.user_email }
                    </Typography>
                    <Typography variant="body2" component="p">
                        { item.tariff.tariff_name }
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={ () => setItem(item) } variant="contained" color="primary" size="small">{t('Read more')}</Button>
                </CardActions>
            </Card>
        );
    }


    const classes = useStyles();

    const history = useSelector(state => state.history)

    const [historyData, setHistoryData] = useState([])

    useEffect(() => {

        const getHistory = async () => {

            const iterableHistory = await history && await Object.values(history)

            const check = ("r" in iterableHistory[0])

            if (check === false) {
                await setHistoryData([])
            } else {
                await setHistoryData(iterableHistory)
            }

        }
        getHistory()

    }, [history])

    return (
        <>
            <ResponsiveDialog />
            { historyData.length && historyData.map((item, index) =>
            <Grid className={classes.space} md={3} >
                <CardUI item={item} key={index} />
            </Grid>
        ) }
        </>
    )
}

export default withNamespaces()(ListRents)
