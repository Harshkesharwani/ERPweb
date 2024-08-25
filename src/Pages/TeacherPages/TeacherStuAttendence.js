import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Typography, Card, CardContent, List, ListItem } from '@mui/material';

const demoStudents = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' }
];

const TeacherStudentAttendance = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [students, setStudents] = useState(demoStudents);
    const [attendance, setAttendance] = useState({});

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
    };

    const handleSectionChange = (event) => {
        setSelectedSection(event.target.value);
    };

    const handleAttendanceChange = (studentId, status) => {
        setAttendance(prev => ({
            ...prev,
            [studentId]: status
        }));
    };

    return (
        <div className="p-4">
            <Typography variant="h4" gutterBottom>
                Student Attendance
            </Typography>

            {/* Dropdowns for Class and Section */}
            <div className="grid grid-cols-2 gap-4">
                <FormControl fullWidth variant="outlined" className="mb-4">
                    <InputLabel>Class</InputLabel>
                    <Select
                        value={selectedClass}
                        onChange={handleClassChange}
                        label="Class"
                    >
                        <MenuItem value="Class 1">Class 1</MenuItem>
                        <MenuItem value="Class 2">Class 2</MenuItem>
                        <MenuItem value="Class 3">Class 3</MenuItem>
                        {/* Add more classes as needed */}
                    </Select>
                </FormControl>

                <FormControl fullWidth variant="outlined" className="mb-4">
                    <InputLabel>Section</InputLabel>
                    <Select
                        value={selectedSection}
                        onChange={handleSectionChange}
                        label="Section"
                    >
                        <MenuItem value="Section A">Section A</MenuItem>
                        <MenuItem value="Section B">Section B</MenuItem>
                        <MenuItem value="Section C">Section C</MenuItem>
                        {/* Add more sections as needed */}
                    </Select>
                </FormControl>
            </div>

            {/* Students List with Attendance Checkboxes */}
            <Typography variant="h6" gutterBottom>
                Student List
            </Typography>
            <Card variant="outlined">
                <CardContent>
                    <List>
                        {students.map((student) => (
                            <ListItem key={student.id} className="mb-2">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={attendance[student.id] === 'present'}
                                            onChange={() => handleAttendanceChange(student.id, attendance[student.id] === 'present' ? 'absent' : 'present')}
                                            sx={{
                                                color: attendance[student.id] === 'present' ? 'green' : 'red',
                                                '&.Mui-checked': {
                                                    color: attendance[student.id] === 'present' ? 'green' : 'red',
                                                },
                                            }}
                                        />
                                    }
                                    label={student.name}
                                />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </div>
    );
};

export default TeacherStudentAttendance;
