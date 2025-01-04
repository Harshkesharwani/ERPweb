import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';

const StudentDues = () => {
    const [dues, setDues] = useState([]);
    const [selectedDue, setSelectedDue] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [amountToPay, setAmountToPay] = useState('');

    useEffect(() => {
        // Fetch dues data from an API or use static data for demonstration
        const fetchDues = async () => {
            // Example static data
            const data = [
                { id: 1, reason: 'Library Fee', amount: 50 },
                { id: 2, reason: 'Sports Fee', amount: 100 },
                { id: 3, reason: 'Lab Fee', amount: 75 },
                // Add more dues as needed
            ];
            setDues(data);
        };

        fetchDues();
    }, []);

    const handleOpenDialog = (due) => {
        setSelectedDue(due);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setAmountToPay('');
    };

    const handlePayment = () => {
        // Implement payment logic here
        alert(`Payment of ${amountToPay} for ${selectedDue.reason} has been processed.`);
        handleCloseDialog();
    };

    return (
        <Box className="p-4">
            <Typography variant="h4" gutterBottom>Student Dues</Typography>
            <Paper elevation={3} className="p-4">
                <List>
                    {dues.length > 0 ? dues.map(({ id, reason, amount }) => (
                        <ListItem key={id} divider>
                            <ListItemText
                                primary={reason}
                                secondary={`Amount: $${amount}`}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="pay" onClick={() => handleOpenDialog({ reason, amount })}>
                                    <PaymentIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )) : <Typography>No dues available.</Typography>}
                </List>
            </Paper>

            {/* Payment Dialog */}
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Pay Dues</DialogTitle>
                <DialogContent>
                    {selectedDue && (
                        <div>
                            <Typography variant="h6">{selectedDue.reason}</Typography>
                            <Typography variant="body1">Amount: ${selectedDue.amount}</Typography>
                            <TextField
                                margin="dense"
                                label="Enter Amount to Pay"
                                type="number"
                                fullWidth
                                value={amountToPay}
                                onChange={(e) => setAmountToPay(e.target.value)}
                            />
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handlePayment} color="primary">
                        Pay
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default StudentDues;
