import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

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

export const mainListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Rent store" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <DateRangeIcon />
            </ListItemIcon>
            <ListItemText primary="Schedule" />
        </ListItem>
        <ListItem button>
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
        <ListItem button>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Rents" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <DirectionsCarIcon />
            </ListItemIcon>
            <ListItemText primary="Transport" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <NotificationsNoneIcon />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add new rent" />
        </ListItem>

    </div>
);

export const thirdListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Options" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
        </ListItem>
    </div>
);
