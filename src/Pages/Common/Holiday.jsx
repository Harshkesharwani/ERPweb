import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { url } from '../../Store/Config';

const localizer = momentLocalizer(moment);

const HolidayPage = () => {
    const [holidays, setHolidays] = useState([]);

    // Fetch holidays from the API
    const fetchHolidays = async (month) => {
        try {
            const response = await fetch(`${url}/holidays`, {
                method: 'GET',
            });
            const data = await response.json();
            const formattedHolidays = data.holidays.map((holiday) => ({
                id: `${holiday.year}-${holiday.month}-${holiday.date}`,
                title: holiday.name,
                start: new Date(`${holiday.year}-${holiday.month}-${holiday.date}`),
                end: new Date(`${holiday.year}-${holiday.month}-${holiday.date}`),
            }));
            setHolidays(formattedHolidays);
        } catch (error) {
            console.error('Error fetching holidays:', error);
        }
    };
    useEffect(() => {
        fetchHolidays();
    }, []);

    return (
        <Box className="p-4 flex flex-col md:flex-row gap-4">
            {/* Calendar */}
            <Paper elevation={3} className="flex-1 p-4">
                <Typography variant="h6" className="mb-4">Holidays Calendar</Typography>
                <Calendar
                    localizer={localizer}
                    events={holidays}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '500px' }}
                />
            </Paper>
            <Paper elevation={3} className="flex-1 p-4">
                <List>
                    {holidays ? holidays.map(({ id, title, start }) => (
                        <React.Fragment key={id}>
                            <ListItem>
                                <ListItemText
                                    primary={title}
                                    secondary={`Date: ${moment(start).format('YYYY-MM-DD')}`}
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    )) : (
                        <ListItem>
                            <ListItemText primary="No holidays for this month." />
                        </ListItem>
                    )}
                </List>
            </Paper>
        </Box>
    );
};

export default HolidayPage;
