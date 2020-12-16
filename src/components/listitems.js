import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import { Link } from 'react'

import LayersIcon from '@material-ui/icons/Layers';

import HomeIcon from '@material-ui/icons/Home';
import StoreIcon from '@material-ui/icons/Store';
import DateRangeIcon from '@material-ui/icons/DateRange';
import TimelineIcon from '@material-ui/icons/Timeline';

import CategoryIcon from '@material-ui/icons/Category';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const redirectButton = (link) => {

    window.location = link

}

export const mainListItems = (
    <div>
        <ListItem button onClick={() => redirectButton('/home')}>
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => redirectButton('/home/point')}>
            <ListItemIcon>
                <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Rent store" />
        </ListItem>
        <ListItem button onClick={() => redirectButton('/home/schedule')}>
            <ListItemIcon>
                <DateRangeIcon />
            </ListItemIcon>
            <ListItemText primary="Schedule" />
        </ListItem>
        <ListItem button onClick={() => redirectButton('/home/statistic')}>
            <ListItemIcon>
                <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="Statistics" />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        {/*<ListSubheader inset>Services</ListSubheader>*/}
        <ListItem button onClick={() => redirectButton('/home/rents')}>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Rents" />
        </ListItem>
        <ListItem button onClick={() => redirectButton('/home/categories')}>
            <ListItemIcon>
                <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" />
        </ListItem>
        <ListItem button onClick={() => redirectButton('/home/transport')}>
            <ListItemIcon>
                <DirectionsCarIcon />
            </ListItemIcon>
            <ListItemText primary="Transport" />
        </ListItem>
        <ListItem button onClick={() => redirectButton('/home/notifications')}>
            <ListItemIcon>
                <NotificationsNoneIcon />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem button onClick={() => redirectButton('/home/add')}>
            <ListItemIcon>
                <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add new rent" />
        </ListItem>

    </div>
);

export const thirdListItems = (
    <div>
        <ListItem button onClick={() => redirectButton('/home/additional')}>
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Options" />
        </ListItem>
        <ListItem button onClick={() => redirectButton('/home/signout')}>
            <ListItemIcon>
                <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
        </ListItem>
    </div>
);
