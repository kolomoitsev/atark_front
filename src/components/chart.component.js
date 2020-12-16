import React, {useEffect, useState} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import {useSelector} from "react-redux";
import axios from "axios";



import i18n from '../i18n';
import { withNamespaces } from 'react-i18next';


import moment from "moment";

require('moment/locale/uk.js');
// or if you want to include all locales:
require("moment/min/locales.min");

// Generate Sales Data
const createData = (time, amount) => {
    return { time, amount };
}

let data = []

const aggregateData = (items) => {

        const groups = items.reduce((groups, item) => {

            const date = item && item.r.book_start.split('T')[0];

            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(item);
            return groups;

        }, {});

        const groupArrays = Object.keys(groups).map((date) => {
            return {
                date,
                //amount: groups[date],
                count: groups[date].length
            };
        });

    return groupArrays

}


const Chart = ({ t }) =>  {

    const point = useSelector(state => state.point)

    const locale = localStorage.getItem('lang')

    useEffect( () => {

        const getHistory = async () => {

            if(point && point._id){

                const { data: { historyData } } = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/book/history/${point._id}`, {
                    headers: {
                        'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                    .catch(e => console.log(e))

                const iterableHistory = historyData && Object.values(historyData)

                const toChart = aggregateData(iterableHistory)

                for(let i of toChart){

                    data.push(createData(i.date, i.count))
                }


            }

        }
        getHistory()
    })

    const theme = useTheme();

    return (
        <>
            <Title>{t('Today')}</Title>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                            Sales ($)
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}

export default withNamespaces()(Chart)
