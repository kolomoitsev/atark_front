import React, {useEffect, useState} from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom'

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";



import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {mainListItems, secondaryListItems, thirdListItems} from '../components/listitems';

import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import i18n from '../i18n';
import { withNamespaces } from 'react-i18next';

import {
    AddWorker,
    Chart,
    Deposits,
    ListWorker,
    Orders,
    Schedule,
    PointStats,
    ListRents,
    CategoriesList,
    ListTransport,
    CreateBook
} from '../components/index'

import MuiAlert from "@material-ui/lab/Alert";

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const HomePage = ({ t }) => {

    const dispatch = useDispatch()

    useEffect(() => {

        const getUserPoint = async () => {

            const _id = localStorage.getItem('_id')

            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/point/owner/${_id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            })
                .catch(e => console.log(e))

            data && await dispatch({type: 'ADD_POINT', payload: data[0]})

        }

        getUserPoint()

    }, []) //get point

    const point = useSelector(state => state.point)

    const [workers, setWorkers] = useState([])

    useEffect(() => {

        const getHistory = async () => {

            if (point && point._id) {

                const { data: { historyData } } = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/book/history/${point._id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                    .catch(e => console.log(e))

                historyData && dispatch({type: 'ADD_HISTORY', payload: historyData})
            }

        }
        getHistory()
    }, [point])

    useEffect(() => {

        const getPointStatistics = async () => {
            if (point && point._id) {
                const {data} = await axios
                    .get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/statistic/point/${point._id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                    .catch(e => console.log(e))

                data && await dispatch({type: 'SET_POINT_STATISTIC', payload: data})
            }
        }
        getPointStatistics()
    }, [point])

    useEffect(() => {
        const getWorkers = async () => {
            if (point && point._id) {
                const { data : { users } } = await axios
                    .get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/point/list/${point._id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                        }
                })
                setWorkers(users)
            }
        }
        getWorkers()
    }, [point])

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const addUserError = useSelector(state => state.errors.error)

    const [lang, setLang] = useState('en')

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }

    useEffect( () => {
        changeLanguage(lang)
        localStorage.setItem('lang', lang)
    }, [lang])

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        {t('Dashboard')}
                    </Typography>
                    <IconButton color="inherit">

                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">{t('Language')}</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={lang}
                                onChange={event => setLang(event.target.value)}
                            >
                                <MenuItem value={'uk'}>Украинский</MenuItem>
                                <MenuItem value={'en'}>English</MenuItem>
                            </Select>
                        </FormControl>

                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>{mainListItems}</List>
                <Divider/>
                <List>{secondaryListItems}</List>
                <Divider/>
                <List>{thirdListItems}</List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Router>
                            <Route exact path='/home'>
                                <Grid item xs={12} md={8} lg={9}>
                                    <Paper className={fixedHeightPaper}>
                                        <Chart/>
                                    </Paper>
                                </Grid>
                                {/* Recent Deposits */}
                                <Grid item xs={12} md={4} lg={3}>
                                    <Paper className={fixedHeightPaper}>
                                        <Deposits/>
                                    </Paper>
                                </Grid>
                                {/* Recent Orders */}
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <Orders/>
                                    </Paper>
                                </Grid>
                            </Route>
                            <Route path='/home/point'>


                                <Grid item xs={12} md={4} lg={3}>
                                    <Paper className={classes.drawerPaper}>
                                        <AddWorker/>
                                    </Paper>
                                </Grid>


                                <Divider />
                                <Grid item xs={12} md={12} lg={12}>
                                    <Grid container>

                                        {workers && workers.map(worker => <ListWorker worker={worker} />)}

                                    </Grid>
                                </Grid>

                                <Grid item xs={4} md={4} justify='center'> </Grid>

                                <Grid item xs={4} md={4} justify='center'>
                                    {!(JSON.stringify(addUserError) === '{}') &&
                                    <Alert onClick={event => dispatch({type: "ADD_ERROR", payload: {}})}
                                           severity="error">
                                        {addUserError}
                                    </Alert>}
                                </Grid>

                            </Route>
                            <Route path='/home/schedule'>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Schedule/>
                                </Grid>
                            </Route>
                            <Route path='/home/statistic'>
                                <Grid item xs={12} md={12} lg={12}>
                                    <PointStats />
                                </Grid>
                            </Route>
                            <Route path='/home/rents'>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Grid container>
                                        <ListRents />
                                    </Grid>
                                </Grid>
                            </Route>
                            <Route path='/home/categories'>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Grid container>
                                        <CategoriesList />
                                    </Grid>
                                </Grid>
                            </Route>
                            <Route path='/home/transport'>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Grid container>
                                        <ListTransport />
                                    </Grid>
                                </Grid>
                            </Route>
                            <Route path='/home/notifications'>
                                Notifications
                            </Route>
                            <Route path='/home/add'>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Grid container>
                                        <CreateBook />
                                    </Grid>
                                </Grid>
                            </Route>
                            <Route path='/home/additional'>
                                Options
                            </Route>
                            <Route path='/home/signout'>
                                Sign out
                            </Route>
                        </Router>
                    </Grid>
                    <Box pt={4}>
                        <Copyright/>
                    </Box>
                </Container>
            </main>
        </div>
    );
}

export default withNamespaces()(HomePage)
