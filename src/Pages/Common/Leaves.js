import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, Divider, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import moment from 'moment';
import { url } from '../../Store/Config';

const Leaves = () => {
    const [leaveData, setLeaveData] = useState([]);
    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchUserProfile = async () => {
        const userProfile = localStorage.getItem('userProfile');
        if (userProfile) {
            const parsedProfile = JSON.parse(userProfile);
            fetchLeaves(parsedProfile["enrollment_or_employee_id"]);
        }
    };

    const fetchLeaves = async (studentId) => {
        try {
            const response = await fetch(`${url}/leaves`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    enrollment_or_employment_id: studentId,
                })
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                const transformedData = data.leaves.map(leave => ({
                    id: leave.status,
                    reason: leave.type,
                    startDate: moment(leave.from_date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                    endDate: leave.to_date ? moment(leave.to_date, 'DD-MM-YYYY').format('YYYY-MM-DD') : null
                }));
                setLeaveData(transformedData);
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching leaves:', error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleApply = async () => {
        try {
            const response = await fetch(`${url}/apply-leave`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    reason,
                    start_date: startDate,
                    end_date: endDate
                })
            });
            if (response.ok) {
                // Optionally refresh leave data
                fetchUserProfile();
                handleClose();
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error applying for leave:', error);
        }
    };

    return (
        <Box className="p-4">
            <Typography variant="h4" gutterBottom>Student Leaves</Typography>

            {/* Leave List */}
            <Paper elevation={3} className="p-4 mb-4">
                <Typography variant="h6" className="mb-4">Leave History</Typography>
                <List>
                    {leaveData.length > 0 ? leaveData.map(({ id, reason, startDate, endDate }) => (
                        <React.Fragment key={id}>
                            <ListItem>
                                <ListItemText
                                    primary={`Reason: ${reason}`}
                                    secondary={`From: ${startDate} To: ${endDate || 'N/A'}`}
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    )) : (
                        <ListItem>
                            <ListItemText primary="No leave records found." />
                        </ListItem>
                    )}
                </List>
            </Paper>

            {/* Apply Leave Button */}
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Apply for Leave
            </Button>

            {/* Apply Leave Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Apply for Leave</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Reason"
                        type="text"
                        fullWidth
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Start Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="End Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
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

export default Leaves;
