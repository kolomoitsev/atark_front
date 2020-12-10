import React, {useState} from "react";

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

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress'

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AuthPage = () => {

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const [authError, setAuthError] = useState(false)

    const [showBackdrop, setShowBackdrop] = useState(false)

    const handleForm = async(event) => {

        event.preventDefault()

        setShowBackdrop(true)

        await axios.post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/user/login`, {
            user_email:username, user_password:password
        })
            .then(({ data: { _id, access_token, user_email } }) => {
                localStorage.setItem(`_id`, _id)
                localStorage.setItem(`access_token`, access_token)
                localStorage.setItem(`user_email`, user_email)
                window.location.href = '/'
            })
            .catch(err => {
                setShowBackdrop(false)
                setAuthError(true)
            })

    }

    const classes = useStyles();

    return(
        <Container component="main" maxWidth="xs">

            <Backdrop className={ classes.backdrop } open={ showBackdrop } onClick={() => setShowBackdrop(!showBackdrop)}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Snackbar open={authError} autoHideDuration={6000} onClose={() => setAuthError(false)}>
                <Alert onClose={() => setAuthError(false)} severity="error">
                    Bad credentials!
                </Alert>
            </Snackbar>

            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={ handleForm } >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={event => setUsername(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={event => setPassword(event.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>

            </div>
            <Box mt={8}>
                <Copyright />
            </Box>

        </Container>
    )

}

export default AuthPage
