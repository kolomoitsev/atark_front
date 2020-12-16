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

import i18n from '../i18n';
import { withNamespaces } from 'react-i18next';

import axios from 'axios'

import moment from "moment";

require('moment/locale/uk.js');
// or if you want to include all locales:
require("moment/min/locales.min");

const {v4: uuidv4} = require('uuid');

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

const Orders = ({ t }) => {

    const history = useSelector(state => state.history)

    const [historyData, setHistoryData] = useState([])

    const locale = localStorage.getItem('lang')

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

    const classes = useStyles();

    return (

        <>
            <Title>{t('Recent Orders')}</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>{t('Index')}</TableCell>
                        <TableCell align='center'>{t('Transport')}</TableCell>
                        <TableCell align='center'>{t('User')}</TableCell>
                        <TableCell align='center'>{t('Tariff')}</TableCell>
                        <TableCell align='center'>{t('Book starting at')}</TableCell>
                        <TableCell align='center'>{t('Book ending at')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { historyData.length && historyData.map((row, i) => (

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
                                { locale === 'en' ? moment(row.r.book_start).locale('en').format('lll') :  moment(row.r.book_start).locale('uk').format('lll') }
                            </TableCell>
                            <TableCell align='center' key={uuidv4()}>
                                { locale === 'en' ? moment(row.r.book_end).locale('en').format('lll') :  moment(row.r.book_end).locale('uk').format('lll') }
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

export default withNamespaces()(Orders)
