import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, MenuItem, FormControl, InputLabel, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// Demo data
const classes = ['Class 1', 'Class 2', 'Class 3'];
const examTypes = ['Final', 'Half Year', 'Quarterly'];

const demoTimetable = {
    'Class 1': {
        'Final': [
            { subject: 'Math', date: '2024-08-15', time: '09:00 AM' },
            { subject: 'English', date: '2024-08-16', time: '11:00 AM' }
        ],
        'Half Year': [
            { subject: 'Science', date: '2024-09-10', time: '10:00 AM' },
            { subject: 'History', date: '2024-09-12', time: '01:00 PM' }
        ],
        'Quarterly': [
            { subject: 'Geography', date: '2024-10-05', time: '08:00 AM' },
            { subject: 'Biology', date: '2024-10-07', time: '12:00 PM' }
        ]
    },
    'Class 2': {
        'Final': [
            { subject: 'Physics', date: '2024-08-18', time: '09:00 AM' },
            { subject: 'Chemistry', date: '2024-08-20', time: '11:00 AM' }
        ],
        'Half Year': [
            { subject: 'Math', date: '2024-09-15', time: '10:00 AM' },
            { subject: 'English', date: '2024-09-17', time: '01:00 PM' }
        ],
        'Quarterly': [
            { subject: 'Computer Science', date: '2024-10-10', time: '08:00 AM' },
            { subject: 'Physical Education', date: '2024-10-12', time: '12:00 PM' }
        ]
    }
};

const TeacherExamination = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedExamType, setSelectedExamType] = useState('');
    const [timetable, setTimetable] = useState([]);

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
    };

    const handleExamTypeChange = (event) => {
        setSelectedExamType(event.target.value);
    };

    const handleShowTimetable = () => {
        if (selectedClass && selectedExamType) {
            const data = demoTimetable[selectedClass]?.[selectedExamType] || [];
            setTimetable(data);
        }
    };

    return (
        <div className="p-4">
            <Typography variant="h4" gutterBottom>
                Examination Timetable
            </Typography>

            <Card variant="outlined" className="mb-4">
                <CardContent>
                    <Typography variant="h6">Select Class and Exam Type</Typography>
                    
                    <FormControl fullWidth variant="outlined" className="mt-2">
                        <InputLabel>Class</InputLabel>
                        <Select
                            value={selectedClass}
                            onChange={handleClassChange}
                            label="Class"
                        >
                            {classes.map((cls) => (
                                <MenuItem key={cls} value={cls}>
                                    {cls}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth variant="outlined" className="mt-2">
                        <InputLabel>Exam Type</InputLabel>
                        <Select
                            value={selectedExamType}
                            onChange={handleExamTypeChange}
                            label="Exam Type"
                        >
                            {examTypes.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        onClick={handleShowTimetable}
                        color="primary"
                        variant="contained"
                        className="mt-4"
                    >
                        Show Timetable
                    </Button>
                </CardContent>
            </Card>

            {timetable.length > 0 && (
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Timetable</Typography>
                        <TableContainer component={Paper} className="mt-4">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Subject</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {timetable.map((entry, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{entry.subject}</TableCell>
                                            <TableCell>{entry.date}</TableCell>
                                            <TableCell>{entry.time}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default TeacherExamination;
