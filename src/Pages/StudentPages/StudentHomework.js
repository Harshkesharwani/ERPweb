import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from '@mui/material';
import { url } from '../../Store/Config';

const StudentHomework = () => {
    const [homework, setHomework] = useState([]);
    const [completedHomework, setCompletedHomework] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const [clasess, setClass] = useState('');
    const [section, setSection] = useState('');

    const getUserProfile = async () => {
        try {
            const userProfile = localStorage.getItem('userProfile');
            if (userProfile !== null) {
                const parsedProfile = JSON.parse(userProfile);
                setClass(parsedProfile['Class']);
                setSection(parsedProfile['section_or_department']);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    useEffect(() => {
        getUserProfile();
    }, []);

    useEffect(() => {
        if (clasess && section) {
            const date = new Date();
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            setCurrentDate(formattedDate);
            fetchHomework(formattedDate);
        }
    }, [clasess, section]);

    const fetchHomework = async (date) => {
        try {
            const response = await fetch(`${url}/homework`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    class: clasess,
                    section: section,
                    date: date,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setHomework(data["Home Work"] || []);
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching homework:', error);
            alert('Error fetching homework: ' + error.message);
        }
    };

    return (
        <Box className="p-4">
            <Typography variant="h4" gutterBottom className="mb-4">Student Homework</Typography>
            <Paper elevation={3} className="p-4 mb-4">
                <Typography variant="h6" className="mb-4">Assigned Homework</Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Subject</TableCell>
                                <TableCell>Assignment</TableCell>
                                <TableCell>Due Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {homework.length > 0 ? homework.map(({ id, Subject, Homework, Date }) => (
                                <TableRow key={id}>
                                    <TableCell>{Subject}</TableCell>
                                    <TableCell>{Homework}</TableCell>
                                    <TableCell>{Date}</TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">
                                        <Typography>No homework assigned.</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default StudentHomework;
