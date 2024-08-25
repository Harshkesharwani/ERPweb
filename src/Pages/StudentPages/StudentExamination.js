import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { url } from '../../Store/Config';

const StudentExamination = () => {
    const [selectedExamType, setSelectedExamType] = useState('Half Yearly');
    const [examSchedule, setExamSchedule] = useState([]);
    const [className, setClassName] = useState('');
    const [section, setSection] = useState('');
    const [examTypeInput, setExamTypeInput] = useState('Half Yearly');

    const fetchExamSchedule = async (examType) => {
        try {
            const currentDate = new Date();
            const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

            const response = await fetch(`${url}/exam_time_table`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    class: className,
                    section: section,
                    date: formattedDate,
                    exam_type: examType,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setExamSchedule(data["Exam Time Table"] || []);
        } catch (error) {
            console.error('Error fetching exam schedule:', error);
            alert('Error fetching exam schedule: ' + error.message);
        }
    };

    const getUserProfile = async () => {
        try {
            const userProfile = localStorage.getItem('userProfile');
            if (userProfile !== null) {
                const parsedProfile = JSON.parse(userProfile);
                setClassName(parsedProfile['Class']);
                setSection(parsedProfile['section_or_department']);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const handleExamTypeChange = (event) => {
        setExamTypeInput(event.target.value);
    };

    const handleFilter = () => {
        setSelectedExamType(examTypeInput);
        fetchExamSchedule(examTypeInput);
    };

    useEffect(() => {
        getUserProfile();
        fetchExamSchedule(selectedExamType); // Fetch exam schedule on initial load
    }, [selectedExamType]);

    return (
        <Box className="p-4">
            <Typography variant="h4" gutterBottom className="mb-4">Student Examination Timetable</Typography>
            <Paper elevation={3} className="p-4 mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                    value={examTypeInput}
                    onChange={handleExamTypeChange}
                    label="Enter Exam Type"
                    variant="outlined"
                    fullWidth
                />
                <Button
                    onClick={handleFilter}
                    variant="contained"
                    color="primary"
                    className="mt-4 md:mt-0"
                >
                    Show Timetable
                </Button>
            </Paper>
            <Paper elevation={3} className="p-4">
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Subject</TableCell>
                                <TableCell>Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {examSchedule.length > 0 ? examSchedule.map(({ id, Date, Subject, Time }) => (
                                <TableRow key={id}>
                                    <TableCell>{Date}</TableCell>
                                    <TableCell>{Subject}</TableCell>
                                    <TableCell>{Time}</TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">
                                        <Typography>No timetable available for this exam type.</Typography>
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

export default StudentExamination;
