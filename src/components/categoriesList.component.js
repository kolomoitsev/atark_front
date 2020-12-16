import React, {useEffect, useState} from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Box from "@material-ui/core/Box"

import TextField from '@material-ui/core/TextField';


import i18n from '../i18n';
import { withNamespaces } from 'react-i18next';

import axios from 'axios'
import Grid from "@material-ui/core/Grid";

const imageToBase64 = require('image-to-base64');

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

const CardUI = ({ item }, {t}) => {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const removeCategory = async () => {
        const id = item._id

        axios.delete(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/category/delete/${id}`, {
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then(res => alert(res.data.message))
            .catch(err => console.log(err))
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    category
                </Typography>
                <Typography variant="h5" component="h2">
                    {item.category_name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {item.category_description}
                </Typography>
                <Typography variant="body2" component="p">
                    Created at { new Date(item.createdAt).toLocaleString() }
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={removeCategory} variant="contained" color="secondary" size="small">Remove</Button>
            </CardActions>
        </Card>
    );
}

const CategoriesList = ({t}) => {
    const classes = useStyles();

    const [categories, setCategories] = useState(null)

    const [open, setOpen] = React.useState(false);

    const ResponsiveDialog = () =>  {

        const handleClose = () => {
            setOpen(false);
        };

        const [categoryName, setCategoryName] = useState(null)
        const [categoryDescription, setCategoryDescription] = useState(null)



        const handleCategory = async () => {

            const category_name = categoryName
            const category_description = categoryDescription

            axios.post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/category/`, {
                category_name, category_description
            }, {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
                }
            })
                .then(res => alert(res.data.message))
                .then(() => setOpen(false))
                .catch(err => console.log(err))
        }



        return (
            <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{t('Subscribe')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t('To add new category you have to insert all field below')}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label={t("Category name")}
                            type="text"
                            fullWidth
                            onChange={event => setCategoryName(event.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label={t("Category description")}
                            type="text"
                            fullWidth
                            onChange={event => setCategoryDescription(event.target.value)}
                        />


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            {t('Cancel')}
                        </Button>
                        <Button onClick={ handleCategory } color="primary">
                            {t('Add new')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    useEffect(() => {

        const getCategories = async () => {

            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/category/`, {
                headers : {
                    'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
                }
            })

            data && setCategories(data)

        }

        getCategories()

    }, [])

    return (
        <>
            <Grid md={12}><Button onClick={() => setOpen(true)} variant="contained" color="primary" >{t('Add new category')}</Button></Grid>
            <ResponsiveDialog />
            { categories && categories.map((item, i) => <Grid className={classes.space} md={3} ><CardUI item={item} key={i} t={t} /></Grid> ) }
        </>
    )
}

export default withNamespaces()(CategoriesList)
