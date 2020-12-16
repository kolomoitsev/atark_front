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

import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


import i18n from '../i18n';
import { withNamespaces } from 'react-i18next';

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


const ListTransport = ({t}) => {

    const [open, setOpen] = React.useState(false);

    const [selectedItem, setSelectedItem] = useState(null)

    const handleClose = () => {
        setOpen(false);
    };

    const setItem = (item) => {
        setSelectedItem(item)
        setOpen(true);

    }

    const lockTransport = async (id) => {

        axios.patch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/transport/lock/${id}`, {}, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then(res => alert(res.data.message))
            .catch(err => console.log(err))

    }

    const unlockTransport = async (id) => {

        axios.patch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/transport/unlock/${id}`, {}, {
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

        console.log(selectedItem)

        const Map = ReactMapboxGl({
            accessToken: 'pk.eyJ1Ijoia29sb21vaXRzZXYiLCJhIjoiY2tnZTZudTR2MTQ2eTJxcWFuMnM4bDl6biJ9.GzniTPg8FNExxfqYlwyGwQ'
        });

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
                        {t("Transport details")}
                    </DialogTitle>
                    { selectedItem && <DialogContent>
                        <DialogContentText>
                            {t('Transport information')}
                            <p>
                                {t('Model')}: { selectedItem.transport_name }
                                <br/>
                                {t('Serial number')}: { selectedItem.transport_serial_number }
                                <br/>
                                {t('Insurance number')} : { selectedItem.transport_insurance_number }
                                <br/>
                                {t('Created at')} : { new Date(selectedItem.createdAt).toLocaleString() }
                            </p>

                            <Map
                                style="mapbox://styles/mapbox/streets-v11"
                                containerStyle={{
                                    height: '35vh',
                                    width: '35vw'
                                }}
                                center={[36.2347437, 49.989734]}
                            >
                                <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                                    <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
                                </Layer>
                            </Map>;

                        </DialogContentText>
                    </DialogContent> }
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
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
                        transport status: { item.transport_status }
                    </Typography>
                    <Typography variant="h5" component="h2">
                        { item.transport_name }
                        <br/>
                        { item.transport_serial_number }
                    </Typography>
                    <Typography variant="body2" component="p">
                        insurance number { item.transport_insurance_number }
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={ () => setItem(item) } variant="contained" color="primary" size="small">Details</Button>

                    { item.transport_status === 'active'  ?
                        <Button onClick={ () => lockTransport(item._id) } variant="contained" color="secondary" size="small">Lock</Button>  :
                        <Button onClick={ () => unlockTransport(item._id) } variant="contained" color="primary" size="small">Unlock</Button> }
                </CardActions>
            </Card>
        );
    }

    const classes = useStyles();

    const point = useSelector(state => state.point)

    const [transportData, setTransportData] = useState([])

    useEffect(() => {

        const getTransport = async () => {

            if(point && point._id){

                const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/transport/point/${point._id}`, {
                    headers : {
                        'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
                    }
                })

                //data && console.log(data)

                data && setTransportData(data)

            }

        }
        getTransport()

    }, [point])

    return (
        <>
            <ResponsiveDialog />
            { transportData.length && transportData.map((item, index) =>
                <Grid className={classes.space} md={3} >
                    <CardUI item={item} key={index} />
                </Grid>
            ) }
        </>
    )
}

export default withNamespaces()(ListTransport)
