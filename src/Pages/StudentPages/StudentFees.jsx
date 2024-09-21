import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const StudentFees = () => {
    const [feeStructure, setFeeStructure] = useState([]);

    useEffect(() => {
        // Fetch fee structure data from an API or use static data for demonstration
        const fetchFeeStructure = async () => {
            // Example static data
            const data = [
                { id: 1, component: 'Tuition Fee', amount: 1500 },
                { id: 2, component: 'Library Fee', amount: 100 },
                { id: 3, component: 'Laboratory Fee', amount: 200 },
                { id: 4, component: 'Sports Fee', amount: 50 },
                { id: 5, component: 'Activity Fee', amount: 75 },
                // Add more fee components as needed
            ];
            setFeeStructure(data);
        };

        fetchFeeStructure();
    }, []);

    const handlePayment = () => {
        alert('Payment functionality is not implemented yet.');
        // Implement payment functionality here
    };

    return (
        <Box className="p-4">
            <Typography variant="h4" gutterBottom className="mb-4">Student Fee Structure</Typography>
            <Paper elevation={3} className="p-4 mb-4">
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Fee Component</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {feeStructure.length > 0 ? feeStructure.map(({ id, component, amount }) => (
                                <TableRow key={id}>
                                    <TableCell>{component}</TableCell>
                                    <TableCell>${amount}</TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={2} className="text-center">
                                        <Typography>No fee structure available.</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Button
                onClick={handlePayment}
                color="primary"
                className="mt-4"
            >
                Pay Fees
            </Button>
        </Box>
    );
};

export default StudentFees;
