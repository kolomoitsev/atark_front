import React, {useState, useEffect} from "react";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Typography} from "@material-ui/core";
import {Box} from "@material-ui/core"
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";



const CreateBook = () => {

    const dispatch = useDispatch()

    const point = useSelector(state => state.point)

    const [transport, setTransport] = useState(null)
    const [category, setCategory] = useState(null)
    const [tariff, setTariff] = useState(null)
    const [user, setUser] = useState(null)

    const [validateBtn, setValidateBtn] = useState(false)

    useEffect(() => {

        const getTransport = async () => {

            if (point && point._id) {

                const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/transport/point/${point._id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                })

                //data && console.log(data)

                data && setTransport(data)

            }
        }

        const getCategory = async () => {

            const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/category/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            })

            //data && console.log(data)

            data && setCategory(data)

        }

        const getUsers = async () => {

            const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/user/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            })

            //data && console.log(data)

            data && setUser(data)

        }

            getTransport()
            getCategory()
            getUsers()

    }, [point])

    const tax = useSelector(state => state.book.category)

    useEffect( () => {

        const getTariff = async () => {

            if(tax){
                const {data : { tariffs }} = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/tariff/category/${tax._id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                })

                tariffs && setTariff(tariffs)

            }


        }

        getTariff()

    }, [tax])

    const SelectTransport = () => {
        const dispatch = useDispatch()

        const [selectedTransport, setSelectedTransport] = useState(null)

        selectedTransport && dispatch({type : "ADD_BOOK_TRANSPORT", payload : selectedTransport})

        return (
            <Autocomplete
                id="combo-box-demo"
                options={transport}
                getOptionLabel={(option) => option.transport_serial_number}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Select transport" variant="outlined" />}
                onChange={(event, value) => setSelectedTransport(value)}
            />
        );
    }

    const SelectCategory = () => {


        const [selectedCategory, setSelectedCategory] = useState(null)

        selectedCategory && dispatch({type : "ADD_BOOK_CATEGORY", payload : selectedCategory})

        return (
            <Autocomplete
                id="combo-box-demo2"
                options={category}
                getOptionLabel={(option) => option.category_name}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Select category" variant="outlined" />}
                onChange={(event, value) => setSelectedCategory(value)}
            />
        );
    }

    const SelectTariff = () => {
        const [selectedTariff, setSelectedTariff] = useState(null)

        selectedTariff && dispatch({type : "ADD_BOOK_TARIFF", payload : selectedTariff})


        return (
            <Autocomplete
                id="combo-box-demo3"
                options={tariff}
                getOptionLabel={(option) => option.tariff_name}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Select Tariff" variant="outlined" />}
                onChange={(event, value) => setSelectedTariff(value)}
            />
        );
    }

    const SelectUser = () => {
        const [selectedUser, setSelectedUser] = useState(null)

        selectedUser && dispatch({type : "ADD_BOOK_USER", payload : selectedUser})


        return (
            <Autocomplete
                id="combo-box-demo4"
                options={user}
                getOptionLabel={(option) => option.user_email}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Select User" variant="outlined" />}
                onChange={(event, value) => setSelectedUser(value)}
            />
        );
    }

    const DateAndTimePickers = () => {

        const useStyles = makeStyles((theme) => ({
            container: {
                display: 'flex',
                flexWrap: 'wrap',
                border: '1px solid #ccc',
                borderRadius: '3px',
                padding: '5px'
            },
            textField: {
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
                width: 250,
            },
        }));

        const classes = useStyles();

        return (
            <form className={classes.container} noValidate>
                <TextField
                    id="datetime-local"
                    label="Next appointment"
                    type="datetime-local"
                    defaultValue="2020-12-17T10:30"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event) => dispatch({type: "ADD_BOOK_DATE", payload: event.target.value})}
                />
            </form>
        );
    }


    const store = useSelector(state => state.book)

    useEffect( () => {

        const transport_id = store.transport._id
        const user_id = store.user._id
        const tariff_id = store.tariff._id
        const book_start = store.date

        if(!transport_id||  !user_id  || !tariff_id || !book_start) {
            setValidateBtn(false)
        } else setValidateBtn(true)

    }, [store])



    const handleBooking = async () => {

        const transport_id = store.transport._id
        const user_id = store.user._id
        const tariff_id = store.tariff._id
        const book_start = store.date

        if(validateBtn){
            axios.post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/book/`, {
                transport_id,
                user_id,
                tariff_id,
                book_start
            }, {
              headers: {
                  'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
              }
            })
                .then(res => {
                    if(res.data.error){alert(res.data.error)}
                    else alert(res.data.message)
                })
                .catch(err => console.log(err))
        }

    }

    return (
        <div >
            <Typography variant="h5" component="h2">
                Create new rent item
                <Box mt={2}>
                    { category && <SelectCategory /> }
                </Box>
                <Box mt={2}>
                    { transport && <SelectTransport /> }
                </Box>
                <Box mt={2}>
                    { tariff && <SelectTariff /> }
                </Box>
                <Box mt={2}>
                    { user && <SelectUser /> }
                </Box>
                <Box mt={3}>
                    <DateAndTimePickers />
                </Box>
                <Box mt={2}>
                    {
                        validateBtn === true ?
                            <Button onClick={handleBooking} variant="contained" color="primary" size="large">Create rent item</Button> :
                            <Button disabled variant="contained" color="primary" size="large">Create rent item</Button>
                    }

                </Box>
            </Typography>
        </div>
    )
}

export default CreateBook
