import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';

import {
    Scheduler,
    DayView,
    WeekView,
    MonthView,
    Appointments,
    AppointmentForm,
    AppointmentTooltip,
    ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Room from '@material-ui/icons/Room';


import { fade } from '@material-ui/core/styles/colorManipulator';
import {useSelector} from "react-redux";
import {Typography} from "@material-ui/core";

const style = theme => ({
    todayCell: {
        backgroundColor: fade(theme.palette.primary.main, 0.1),
        '&:hover': {
            backgroundColor: fade(theme.palette.primary.main, 0.14),
        },
        '&:focus': {
            backgroundColor: fade(theme.palette.primary.main, 0.16),
        },
    },
    weekendCell: {
        backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
        '&:hover': {
            backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
        },
        '&:focus': {
            backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
        },
    },
    today: {
        backgroundColor: fade(theme.palette.primary.main, 0.16),
    },
    weekend: {
        backgroundColor: fade(theme.palette.action.disabledBackground, 0.06),
    },
    cellSize: {
        fontSize: '14px !important',
        fontWeight: 500
    },
    inside: {
        margin: '0 25px'
    }
});

const TimeTableCellBase = ({ classes, ...restProps }) => {
    const { startDate } = restProps;
    const date = new Date(startDate);
    if (date.getDate() === new Date().getDate()) {
        return <WeekView.TimeTableCell {...restProps} className={classes.todayCell} />;
    } if (date.getDay() === 0 || date.getDay() === 6) {
        return <WeekView.TimeTableCell {...restProps} className={classes.weekendCell} />;
    } return <WeekView.TimeTableCell {...restProps} />;
};

const TimeTableCell = withStyles(style, { name: 'TimeTableCell' })(TimeTableCellBase);

const DayScaleCellBase = ({ classes, ...restProps }) => {
    const { startDate, today } = restProps;
    if (today) {
        return <WeekView.DayScaleCell {...restProps} className={classes.today} />;
    } if (startDate.getDay() === 0 || startDate.getDay() === 6) {
        return <WeekView.DayScaleCell {...restProps} className={classes.weekend} />;
    } return <WeekView.DayScaleCell {...restProps} />;
};

const DayScaleCell = withStyles(style, { name: 'DayScaleCell' })(DayScaleCellBase);

const Schedule = () => {

    const bookings = useSelector(state => state.history)

    const [data, setData] = useState(null)



    useEffect( () => {

        const convertData = async () => {

            const iterableHistory = await bookings && await Object.values(bookings)

            const check = await ("r" in iterableHistory[0])

            if (check === false) {
                await setData([])
            } else {
                const appointments = []
                await iterableHistory && iterableHistory.map(iter => {

                    //console.log(iter)

                    const temp = {

                            startDate: (new Date(iter.r.book_start).toJSON()),
                            endDate: (new Date(iter.r.book_end).toJSON()),
                            title: iter.user.user_name,
                            user: iter.user,
                            tariff: iter.tariff,
                            transport: iter.transport
                        }

                        appointments.push(temp)

                })


                setData(appointments)

            }

        }

        convertData()

    }, [bookings])

    const commitChanges = ({ added, changed, deleted }) => {

        console.log(added, changed, deleted)

        // this.setState((state) => {
        //     let { data } = state;
        //     if (added) {
        //         const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        //         data = [...data, { id: startingAddedId, ...added }];
        //     }
        //     if (changed) {
        //         data = data.map(appointment => (
        //             changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
        //     }
        //     if (deleted !== undefined) {
        //         data = data.filter(appointment => appointment.id !== deleted);
        //     }
        //     return { data };
        // });
    }

    const Content = withStyles(style, { name: 'Content' })(({
                                                                children, appointmentData, classes, ...restProps
                                                            }) => (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
            {console.log(appointmentData)}
            <Grid container alignItems="center">
                <Grid item xs={12} className={classes.inside}>
                    <Typography className={classes.cellSize}> &#8226; User name: { appointmentData.user.user_name }</Typography>
                    <Typography className={classes.cellSize}> &#8226; User last name: { appointmentData.user.user_last_name }</Typography>
                    <Typography className={classes.cellSize}> &#8226; User phone: { appointmentData.user.user_phone }</Typography>
                    <Typography className={classes.cellSize}> &#8226; User email: { appointmentData.user.user_email }</Typography>
                    <br/>
                    <Typography className={classes.cellSize}> &#8226; Transport name: { appointmentData.transport.transport_name }</Typography>
                    <Typography className={classes.cellSize}> &#8226; Transport serial number: { appointmentData.transport.transport_serial_number }</Typography>
                    <br/>
                    <Typography className={classes.cellSize}> &#8226; Tariff: { appointmentData.tariff.tariff_name }</Typography>
                    <Typography className={classes.cellSize}> &#8226; Tariff length: { appointmentData.tariff.tariff_length }</Typography>
                    <Typography className={classes.cellSize}> &#8226; Tariff price: { appointmentData.tariff.tariff_price }</Typography>
                </Grid>
            </Grid>
        </AppointmentTooltip.Content>
    ));

    return (
        <Paper>
            {data && <Scheduler
                data={data}
                height={660}
            >
                {/*<ViewState currentDate={'2020-12-04T18:14:19.832Z'}/>*/}
                <ViewState currentDate={Date.now()}/>
                <EditingState
                    onCommitChanges={commitChanges}
                />

                <IntegratedEditing/>
                <WeekView
                    startDayHour={8}
                    endDayHour={21}
                    timeTableCellComponent={TimeTableCell}
                    dayScaleCellComponent={DayScaleCell}
                />
                <ConfirmationDialog/>
                <Appointments/>
                <AppointmentTooltip showOpenButton showDeleteButton contentComponent={Content} />
                <AppointmentForm/>
            </Scheduler>
            }
        </Paper>

    );
}


export default Schedule
