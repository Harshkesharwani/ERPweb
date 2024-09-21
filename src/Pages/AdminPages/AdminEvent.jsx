import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { url } from '../../Store/Config';

const AdminEvent = () => {
    const [events, setEvents] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [newEvent, setNewEvent] = useState({ eventname: '', date: '', month: '', description: '' });
    const [loading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(moment().format('MM'));

    useEffect(() => {
        fetchEvents(currentMonth);
    }, [currentMonth]);

    const fetchEvents = async (month) => {
        setLoading(true);
        try {
            const currentYear = moment().format('YYYY');
            const monthName = moment(month, 'MM').format('MMMM');

            const response = await fetch(`${url}/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ month: monthName, year: currentYear }),
            });

            const data = await response.json();
            const formattedEvents = data.events.map(event => ({
                eventname: event.eventname,
                date: event.date,
                month: event.month || '',
                description: event.description || '',
            }));
            setEvents(formattedEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (event) => {
        setSelectedEvent(event);
        setNewEvent(event || { eventname: '', date: '', month: '', description: '' });
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedEvent(null);
    };

    const handleSave = async () => {
        if (selectedEvent) {
            // Update event
            try {
                const response = await fetch(`${url}/admin_events_update`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...newEvent, id: selectedEvent.id }),
                });

                if (response.ok) {
                    fetchEvents(currentMonth);
                    handleCloseDialog();
                } else {
                    console.error('Failed to update event');
                }
            } catch (error) {
                console.error('Error updating event:', error);
            }
        } else {
            // Add new event
            try {
                const response = await fetch(`${url}/admin_events_create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newEvent),
                });

                if (response.ok) {
                    fetchEvents(currentMonth);
                    handleCloseDialog();
                } else {
                    console.error('Failed to add event');
                }
            } catch (error) {
                console.error('Error adding event:', error);
            }
        }
    };

    const handleDelete = async (event) => {
        console.log(event)
        try {
            const response = await fetch(`${url}/admin_events_delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event),
            });

            if (response.ok) {
                fetchEvents(currentMonth);
            } else {
                console.error('Failed to delete event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleMonthChange = (date) => {
        const month = moment(date).format('MM');
        setCurrentMonth(month);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row space-x-6 m-4">
                <h2 className="text-2xl font-bold mb-4">Admin Event</h2>
                <Button
                    color="primary"
                    onClick={() => handleOpenDialog(null)}
                    className="mb-4 text-2xl"
                >
                    + Events
                </Button>
            </div>

            <Calendar
                onNavigate={handleMonthChange}
                localizer={momentLocalizer(moment)}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 400, width: '100%' }}
                view="month"
            />

            <Grid container spacing={3} className="my-4">
                {events.map((event, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card className='m-4'>
                            <CardContent>
                                <Typography variant="h6">{event.eventname}</Typography>
                                <Typography color="textSecondary">{event.date}</Typography>
                                <Typography color="textSecondary">{event.month}</Typography>
                                <Typography>{event.description}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    color="primary"
                                    onClick={() => handleOpenDialog(event)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    color="secondary"
                                    onClick={() => handleDelete(event)}
                                >
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{selectedEvent ? "Edit Event" : "Add Event"}</DialogTitle>
                <DialogContent>
                    <div className="flex flex-col space-y-4 max-w-3xl mx-auto">
                        <TextField
                            label="eventname"
                            value={newEvent.eventname}
                            onChange={(e) => setNewEvent({ ...newEvent, eventname: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Date"
                            type="date"
                            value={newEvent.date}
                            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="month"
                            value={newEvent.month}
                            onChange={(e) => setNewEvent({ ...newEvent, month: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            value={newEvent.description}
                            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                            fullWidth
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminEvent;
