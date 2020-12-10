import React, {useEffect, useState} from "react";

import axios from 'axios'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

import Autocomplete from "@material-ui/lab/Autocomplete";

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const Copyright = () =>  {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
                Rent point limited
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    formControl: {
        width: '100%',
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const RegisterPage = () => {

    useEffect( () => {

        const getCities = async () => {
           await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/city`, {
               headers: {
                   'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
               }
           })
               .then(res => setCities(res.data))
               .catch(e => console.log(e.response))


        }

        getCities()

    }, [])

    const classes = useStyles();

    const [city, setCities] = useState(null)

    const [user_name, set_user_name] = useState(null)
    const [user_middle_name, set_user_middle_name] = useState(null)
    const [user_last_name, set_user_last_name] = useState(null)

    const [user_phone, set_user_phone] = useState(null)
    const [user_email, set_user_email] = useState(null)

    const [user_password, set_user_password] = useState(null)
    const [user_id_number, set_user_id_number] = useState(null)

    const [user_address, set_user_address] = useState(null)
    const [user_city_registered, set_user_city_registered] = useState(null)
    const [user_role, set_user_role] = useState(null)

    const [showBackdrop, setShowBackdrop] = useState(false)

    const handleForm = (event) => {

        event.preventDefault()

        setShowBackdrop(true)

    }

    return(
        <Container component="main" maxWidth="xs">

            <Backdrop className={ classes.backdrop } open={ showBackdrop } onClick={() => setShowBackdrop(!showBackdrop)}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={ handleForm } >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="middleName"
                                label="Middle Name"
                                name="middleName"
                                autoComplete="mname"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="userPhone"
                                label="User Phone"
                                name="userPhone"
                                autoComplete="uphone"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Select Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    //value={age}
                                    //onChange={handleChange}
                                    label="Select role"
                                >
                                    <MenuItem value={10}>Point owner</MenuItem>
                                    <MenuItem value={20}>Point worker</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            {city && <Autocomplete
                                id="combo-box-demo"
                                options={city}
                                onSelect={event => set_user_city_registered(event.target.value)}
                                getOptionLabel={(option) => option.city_name}
                                renderInput={(params) => <TextField {...params} label="Select city" variant="outlined"/>}
                            />
                            }
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="userAddress"
                                label="User Address"
                                name="userAddress"
                                autoComplete="uAddress"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    )

}

export default RegisterPage
