import React, {useEffect, useState} from 'react';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {useSelector} from "react-redux";
import Title from './Title'

import axios from 'axios'

const {v4: uuidv4} = require('uuid');

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

const Orders = () => {

    const history = useSelector(state => state.history)

    const [historyData, setHistoryData] = useState([])

    useEffect(() => {

        const getHistory = async () => {

            const iterableHistory = await history && await Object.values(history)

            const check = ("r" in iterableHistory[0])

            if (check === false) {
                await setHistoryData([])
            } else await setHistoryData(iterableHistory)

        }
        getHistory()

    }, [history])

    const classes = useStyles();

    historyData && console.log(historyData)


    return (

        <>
            <Title>Recent Orders</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Index</TableCell>
                        <TableCell align='center'>Transport</TableCell>
                        <TableCell align='center'>User</TableCell>
                        <TableCell align='center'>Tariff</TableCell>
                        <TableCell align='center'>Book starting at</TableCell>
                        <TableCell align='center'>Book ending at</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {historyData.length && historyData.map((row, i) => (

                        <TableRow key={row.r._id}>
                            <TableCell align='center' key={uuidv4()}>
                                {i + 1}
                            </TableCell>
                            <TableCell align='center' key={uuidv4()}>
                                {`${row.transport.transport_name}, ${row.transport.transport_serial_number}`}
                            </TableCell>
                            <TableCell align='center' key={uuidv4()}>
                                {`${row.user.user_name.charAt(0).toUpperCase() + row.user.user_name.slice(1)}, ${row.user.user_phone}`}
                            </TableCell>
                            <TableCell align='center' key={uuidv4()}>
                                {`${row.tariff.tariff_name}, ${row.tariff.tariff_price}`}
                            </TableCell>
                            <TableCell align='center' key={uuidv4()}>
                                {new Date(row.r.book_start).toLocaleString()}
                            </TableCell>
                            <TableCell align='center' key={uuidv4()}>
                                {new Date(row.r.book_end).toLocaleString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                    See more orders
                </Link>
            </div>
        </>
    );
}

export default Orders
