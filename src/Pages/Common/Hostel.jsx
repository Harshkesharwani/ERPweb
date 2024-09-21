import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { url } from '../../Store/Config';

const HostelPage = () => {
    const [name, setName] = useState('');
    const [parentName, setParentName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userId, setUserId] = useState('');
    const [hostelData, setHostelData] = useState([]);
    const [studentHostelData, setStudentHostelData] = useState(null);
    const [selectedHostel, setSelectedHostel] = useState(null);
    const [applyReason, setApplyReason] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getUserProfile();
    }, []);

    const getUserProfile = async () => {
        try {
            const userProfile = localStorage.getItem('userProfile');
            if (userProfile !== null) {
                const parsedProfile = JSON.parse(userProfile);
                setUserId(parsedProfile["enrollment_or_employee_id"]);
                setName(parsedProfile.Name);
                setParentName(parsedProfile.father_name);
                setPhoneNumber(parsedProfile.phone);
                
                if (parsedProfile.hostel === "applied") {
                    fetchStudentHostelData(parsedProfile["enrollment_or_employee_id"]);
                } else {
                    fetchHostelData();
                }
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const fetchHostelData = async () => {
        try {
            const response = await fetch(`${url}/hostel_details_fetch`);
            const data = await response.json();
            console.log("Hostel data:", data);
            setHostelData(data.Result); // Ensure this is the correct path for your data
        } catch (error) {
            console.error('Error fetching hostel data:', error);
        }
    };

    const fetchStudentHostelData = async (studentId) => {
        try {
            const response = await fetch(`${url}/hostel_applied_fetch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    enrollment_or_employee_id: studentId
                }),
            });
            const data = await response.json();
            setStudentHostelData(data.result);
        } catch (error) {
            console.error('Error fetching student hostel data:', error);
        }
    };

    const handleApply = async () => {
        if (!selectedHostel) return;

        const applicationData = {
            enrollment_or_employee_id: userId,
            student_name: name,
            parent_name: parentName,
            phone_number: phoneNumber,
            building_name: selectedHostel.building_name,
            reason: applyReason,
        };

        try {
            const response = await fetch(`${url}/hostel_apply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(applicationData),
            });
            if (response.ok) {
                alert('Your application has been submitted.');
                handleClose();
                fetchHostelData(); // Refresh hostel list
            } else {
                alert('Failed to submit application.');
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('Failed to submit application.');
        }
    };

    const handleCancelApplication = async () => {
        if (!studentHostelData) return;

        try {
            const response = await fetch(`${url}/hostel_applied_cancel`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    enrollment_or_employee_id: userId,
                    student_name: name,
                    parent_name: parentName,
                    phone_number: phoneNumber,
                    building_name: studentHostelData.building_name,
                }),
            });
            if (response.ok) {
                alert('Your hostel application has been canceled.');
                setStudentHostelData(null);
                fetchHostelData(); // Refresh hostel list
            } else {
                alert('Failed to cancel application.');
            }
        } catch (error) {
            console.error('Error canceling application:', error);
            alert('Failed to cancel application.');
        }
    };

    const handleOpen = (hostel) => {
        setSelectedHostel(hostel);
        setApplyReason('');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedHostel(null);
    };

    return (
        <Box className="p-4">
            <h1 className="text-3xl font-bold mb-6">Hostel</h1>
            {/* Display applied hostel details */}
            {studentHostelData ? (
                <Paper elevation={3} className="p-4 mb-4">
                    <Typography variant="h6" className="mb-4">Your Hostel Application</Typography>
                    <Typography><strong>Building Name:</strong> {studentHostelData.building_name}</Typography>
                    <Typography><strong>Student Name:</strong> {studentHostelData.student_name}</Typography>
                    <Typography><strong>Parent Name:</strong> {studentHostelData.parent_name}</Typography>
                    <Typography><strong>Phone Number:</strong> {studentHostelData.phone_number}</Typography>
                    <Button variant="contained" color="error" onClick={handleCancelApplication}>
                        Cancel Hostel Application
                    </Button>
                </Paper>
            ) : (
                <Paper elevation={3} className="p-4 mb-4">
                    <Typography variant="h6" className="mb-4">Available Hostels</Typography>
                    <List>
                        {hostelData.length > 0 ? hostelData.map((hostel) => (
                            <React.Fragment key={hostel.id}>
                                <ListItem button onClick={() => handleOpen(hostel)}>
                                <ListItemText
                                    primary={hostel.building_name}
                                    secondary={`Available Beds: ${hostel.available_beds}, Hostel Type: ${hostel.hostel_type}, Hostel Fees: ${hostel.hostel_fees}, Mess Fees: ${hostel.mess_fees}`}
                                />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        )) : (
                            <ListItem>
                                <ListItemText primary="No hostels available." />
                            </ListItem>
                        )}
                    </List>
                </Paper>
            )}

            {/* Hostel Detail Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Apply for Hostel</DialogTitle>
                <DialogContent>
                    {selectedHostel && (
                        <Box>
                            <Typography variant="h6" gutterBottom>Hostel Details</Typography>
                            <Typography><strong>Building Name:</strong> {selectedHostel.building_name}</Typography>
                            <Typography><strong>Type:</strong> {selectedHostel.hostel_type}</Typography>
                            <Typography><strong>Fees:</strong> Hostel - {selectedHostel.hostel_fees}, Mess - {selectedHostel.mess_fees}</Typography>
                            <Typography><strong>Available Beds:</strong> {selectedHostel.available_beds}</Typography>
                            <Typography><strong>Total Beds:</strong> {selectedHostel.total_beds}</Typography>
                            <TextField
                                margin="dense"
                                label="Reason for Applying"
                                type="text"
                                fullWidth
                                value={applyReason}
                                onChange={(e) => setApplyReason(e.target.value)}
                            />
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

export default HostelPage;
