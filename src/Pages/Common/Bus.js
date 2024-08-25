import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { url } from '../../Store/Config';

const BusPage = () => {
    const [buses, setBuses] = useState([]);
    const [selectedBus, setSelectedBus] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState('');
    const [applyReason, setApplyReason] = useState('');
    const [studentBusData, setStudentBusData] = useState(null);
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [parentName, setParentName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        fetchBuses();
        fetchUserProfile();
    }, []);

    const fetchBuses = async () => {
        try {
            const response = await fetch(`${url}/bus_details_fetch`);
            const data = await response.json();
            setBuses(data.Result);
        } catch (error) {
            console.error('Error fetching bus data:', error);
        }
    };

    const fetchUserProfile = async () => {
        try {
            const userProfile = localStorage.getItem('userProfile');
            if (userProfile) {
                const parsedProfile = JSON.parse(userProfile);
                setUserId(parsedProfile["enrollment_or_employee_id"]);
                setName(parsedProfile["Name"]);
                setParentName(parsedProfile["father_name"]);
                setPhoneNumber(parsedProfile["phone"]);
                if (parsedProfile['bus'] === "applied") {
                    fetchStudentBusData(parsedProfile["enrollment_or_employee_id"]);
                }
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const fetchStudentBusData = async (id) => {
        try {
            const response = await fetch(`${url}/bus_applied_fetch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ enrollment_or_employee_id: id }),
            });
            const data = await response.json();
            console.log(data)
            setStudentBusData(data.result);
        } catch (error) {
            console.log('Error fetching student bus data:', error);
        }
    };

    const handleOpen = (bus) => {
        setSelectedBus(bus);
        setSelectedRoute('');
        setApplyReason('');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedBus(null);
    };

    const handleApply = async () => {
        console.log(selectedRoute);
        if (!selectedRoute) {
            alert('Please select a route.');
            return;
        }

        const applicationData = {
            enrollment_or_employee_id: userId,
            student_name: name,
            parent_name: parentName,
            phone_number: phoneNumber,
            bus_number: selectedBus.bus_number,
            boarding_point: selectedRoute,
            date_applied: new Date().toISOString(),
        };

        try {
            const response = await fetch(`${url}/bus_apply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(applicationData),
            });

            if (response.ok) {
                alert('Your application has been sent.');
                handleClose();
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error applying for bus:', error);
            alert('Failed to submit application.');
        }
    };

    const handleCancelBusApplication = async () => {
        try {
            const response = await fetch(`${url}/bus_applied_cancel`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    enrollment_or_employee_id: studentBusData.enrollment_or_employee_id,
                    student_name: studentBusData.student_name,
                    parent_name: studentBusData.parent_name,
                    phone_number: studentBusData.phone_number,
                    bus_number: studentBusData.bus_number,
                    boarding_point: studentBusData.boarding_point,
                }),
            });

            if (response.ok) {
                alert('Your bus application has been canceled.');
                fetchBuses();
                setStudentBusData(null);
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error canceling bus application:', error);
            alert('Failed to cancel bus application.');
        }
    };

    return (
        <Box className="p-4">
            <Typography variant="h4" gutterBottom>Bus Details</Typography>
            <Paper elevation={3} className="p-4 mb-4">
                <Typography variant="h6" className="mb-4">Available Buses</Typography>
                <List>
                    {buses.length > 0 ? buses.map((bus) => (
                        <React.Fragment key={bus.bus_number}>
                            <ListItem button onClick={() => handleOpen(bus)}>
                                <ListItemText
                                    primary={`Bus Number: ${bus.bus_number}`}
                                    secondary={`Driver: ${bus.driver_name}, Route: ${bus.route}, Capacity: ${bus.capacity}, Time: ${bus.time}`}
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    )) : (
                        <ListItem>
                            <ListItemText primary="No buses available." />
                        </ListItem>
                    )}
                </List>
            </Paper>

            {studentBusData && (
                <Paper elevation={3} className="p-4 mb-4">
                    <Typography variant="h6" className="mb-4">Your Bus Application</Typography>
                    <Typography><strong>Bus Number:</strong> {studentBusData.bus_number}</Typography>
                    <Typography><strong>Boarding Point:</strong> {studentBusData.boarding_point}</Typography>
                    <Typography><strong>Student Name:</strong> {studentBusData.student_name}</Typography>
                    <Typography><strong>Parent Name:</strong> {studentBusData.parent_name}</Typography>
                    <Typography><strong>Phone Number:</strong> {studentBusData.phone_number}</Typography>
                    <Button variant="contained" color="error" onClick={handleCancelBusApplication}>
                        Cancel Bus Application
                    </Button>
                </Paper>
            )}

            {/* Bus Detail Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Apply for Bus</DialogTitle>
                <DialogContent>
                    {selectedBus && (
                        <Box>
                            <Typography variant="h6" gutterBottom>Bus Details</Typography>
                            <Typography><strong>Bus Number:</strong> {selectedBus.bus_number}</Typography>
                            <Typography><strong>Driver Name:</strong> {selectedBus.driver_name}</Typography>
                            <Typography><strong>Driver Phone:</strong> {selectedBus.driver_phone_number}</Typography>
                            <Typography><strong>Starting Point:</strong> {selectedBus.starting_point}</Typography>
                            <Typography><strong>Ending Point:</strong> {selectedBus.ending_point}</Typography>
                            <Typography><strong>Route:</strong> {selectedBus.route}</Typography>

                            <FormControl fullWidth variant="outlined" margin="dense" className="mb-4">
                                <InputLabel>Route</InputLabel>
                                <Select
                                    value={selectedRoute}
                                    onChange={(e) => setSelectedRoute(e.target.value)}
                                    label="Route"
                                >
                                    {selectedBus.route.split('to ').map((route, index) => (
                                        <MenuItem key={index} value={route}>
                                            {route}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleApply} color="primary">
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default BusPage;
