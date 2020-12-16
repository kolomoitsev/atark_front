import React, {useEffect, useState} from 'react'

import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from "@material-ui/lab/Autocomplete";
import MuiAlert from '@material-ui/lab/Alert';


import i18n from '../i18n';
import { withNamespaces } from 'react-i18next';

import axios from 'axios'
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    forms: {
        zIndex: theme.zIndex.drawer + 1,
    }
}));


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AddWorker = ({ t }) => {

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState(null)

    const [addingError, setAddingError] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {


        const getUsers = async () => {

            const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/user`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(`access_token`)}`
                }
            })
                .catch(e => console.log(e.response))

            data && await setUsers(data)

        }

        getUsers()

    }, [])


    const handleForm = () => {
        setOpen(!open)
    }

    //selectedUser && console.log(selectedUser)

    const FormDialog = () => {

        const point = useSelector(state => state.point)

        const [selectedUser, setUserSelected] = useState(null)


        const handleSelect = async (event) => {

            const selected = event.target.value

            const {data: {users}} = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/user/autocomplete/mail/${selected}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(`access_token`)}`
                }
            })
                .catch(err => console.log(err))

            users[0] && await setUserSelected(users[0]._id)

        }

        const handleUserAdd = async () => {

            if (point && point._id) {

                await axios.post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/point/worker`, {
                    point_id: point._id,
                    user_id: selectedUser,
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem(`access_token`)}`
                    }
                })
                    .then(res => {
                        if (res.data.error) {

                            dispatch({type: "ADD_ERROR", payload: `${res.data.error}`})
                            handleForm()
                        }
                    })
                    .catch(err => console.log(err))

            }
        }

        return (
            users && <div className={classes.forms}>


                <Dialog className={classes.forms} open={open} onClose={handleForm} aria-labelledby="form-dialog-title2">
                    <DialogTitle id="form-dialog-title2">{t('Adding new worker to rent point')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t('To add a new worker to your rent point you have to insert his mail and you will have all available users to add.')}
                        </DialogContentText>
                        {users && <Autocomplete
                            id="combo-box-demo2"
                            options={users}
                            onSelect={event => handleSelect(event)}
                            getOptionLabel={(option) => option.user_email}
                            renderInput={(params) => <TextField {...params} label={t('Select user')} variant="outlined"/>}
                        />}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleForm} color="primary">
                            {t('Cancel')}
                        </Button>
                        <Button onClick={handleUserAdd} variant="contained" color="primary">
                            {t('Add user')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    return (
        <>
            <FormDialog/>
            <Button
                onClick={handleForm}
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<AddToPhotosIcon/>}
            >
                {t('Add new worker')}
            </Button>
        </>
    )
}

export default withNamespaces()(AddWorker)
