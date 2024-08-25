import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { url } from '../../Store/Config';

const localizer = momentLocalizer(moment);

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Events = () => {
    const [events, setEvents] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(monthNames[new Date().getMonth()]); // default to current month in words
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());           // default to current year

    useEffect(() => {
        fetchEvents(currentMonth, currentYear);
    }, [currentMonth, currentYear]);

    const fetchEvents = async (month, year) => {
        console.log(month, year);
        try {
            const response = await fetch(`${url}/events`, { // Replace with your API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ month: month, year: year }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            
            // Map the event data to the format required by the calendar
            const formattedEvents = data.events.map(event => ({
                id: `${event.year}-${event.month}-${event.date}`,
                title: event.eventname,
                start: new Date(`${event.month} ${event.date}, ${event.year} 00:00:00`),
                end: new Date(`${event.month} ${event.date}, ${event.year} 23:59:59`),
                dayOfWeek: event.dayOfWeek
            }));
    
            setEvents(formattedEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };
    

    const handleMonthChange = (date) => {
        const monthInWords = monthNames[date.getMonth()]; // Convert month number to words
        setCurrentMonth(monthInWords);
        setCurrentYear(date.getFullYear());
    };

    return (
        <Box className="p-4 flex flex-col md:flex-row gap-4">
            {/* Calendar */}
            <Paper elevation={3} className="flex-1 p-4">
                <Typography variant="h6" className="mb-4">Events Calendar</Typography>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '500px' }}
                    onNavigate={handleMonthChange}  // Detect month change
                />
            </Paper>

            {/* Event List */}
            <Paper elevation={3} className="flex-1 p-4">
                <Typography variant="h6" className="mb-4">Upcoming Events</Typography>
                <List>
                    {events.length > 0 ? events.map(({ id, title, start, end }) => (
                        <React.Fragment key={id}>
                            <ListItem>
                                <ListItemText
                                    primary={title}
                                    secondary={`Date: ${moment(start).format('YYYY-MM-DD')} | Time: ${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`}
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    )) : (
                        <ListItem>
                            <ListItemText primary="No upcoming events." />
                        </ListItem>
                    )}
                </List>
            </Paper>
        </Box>
    );
};

export default Events;
