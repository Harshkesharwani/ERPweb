import React, { useState, useEffect } from 'react';
import {
    FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel,
    Typography, Card, CardContent, List, ListItem, Button
} from '@mui/material';
import { url } from '../../Store/Config';

const STATUS = {
    PRESENT: 'Present',
    ABSENT: 'Absent',
};

const TeacherStudentAttendance = () => {
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [loading, setLoading] = useState(false);
    const [attendance, setAttendance] = useState({});

    useEffect(() => {
        // Fetch class and section details when the component loads
        fetchUserProfile();
    }, []);

    useEffect(() => {
        if (selectedClass) {
            // Filter sections based on the selected class
            filterSections(selectedClass);
        }
    }, [selectedClass]);

    useEffect(() => {
        if (selectedClass && selectedSection) {
            // Fetch student list when both class and section are selected
            fetchStudentList();
        }
    }, [selectedClass, selectedSection]);

    const fetchUserProfile = async () => {
        try {
            const userProfile = localStorage.getItem('userProfile');
            if (userProfile) {
                const parsedProfile = JSON.parse(userProfile);
                fetchClassSectionDetails(parsedProfile["enrollment_or_employee_id"]);
            }
        } catch (error) {
            alert('Failed to fetch user profile');
            setLoading(false);
        }
    };

    const fetchClassSectionDetails = async (id) => {
        setLoading(true);
        try {
            // Fetch class-section data from API
            const response = await fetch(`${url}/teacher_class_section_details`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ enrollment_or_employee_id: id }), // replace with actual id
            });
            const data = await response.json();
            const mappedClasses = data.Sections.reduce((acc, [classNumber, section]) => {
                let existingClass = acc.find(cls => cls.classNumber === classNumber);
                if (!existingClass) {
                    existingClass = { classNumber, sections: [] };
                    acc.push(existingClass);
                }
                existingClass.sections.push({ section_id: section, section_name: section });
                return acc;
            }, []);
            setClasses(mappedClasses);
        } catch (error) {
            console.error('Failed to fetch class and section details', error);
        } finally {
            setLoading(false);
        }
    };

    const filterSections = (classId) => {
        const filteredSections = classes.find(cls => cls.classNumber === classId)?.sections || [];
        setSections(filteredSections);
    };

    const fetchStudentList = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${url}/student_fetch_classwise`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ class: selectedClass, section: selectedSection }),
            });
            const data = await response.json();
            const updatedStudents = data.map(student => ({
                ...student,
                status: STATUS.PRESENT, // default to present
            }));
            setStudents(updatedStudents);
        } catch (error) {
            console.error('Failed to fetch student list', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
        setSelectedSection(''); // Reset section when class changes
        setStudents([]); // Reset student list
    };

    const handleSectionChange = (event) => {
        setSelectedSection(event.target.value);
    };

    const handleAttendanceChange = (studentId, status) => {
        setStudents(prevStudents =>
            prevStudents.map(student =>
                student.student_id === studentId ? { ...student, status } : student
            )
        );
    };

    const saveAttendance = async () => {
        const attendanceData = students.map(student => ({
            student_id: student.student_id,
            status: student.status.toLowerCase(),
        }));
        const date = new Date(); // Format date as YYYY-MM-DD
        try {
            await fetch(`${url}/teacher_class_attendance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ class: selectedClass, section: selectedSection, date, attendance: attendanceData }),
            });
            alert('Attendance saved successfully');
        } catch (error) {
            alert('Failed to save attendance');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Student Attendance</h1>
            {/* Class and Section Dropdowns */}
            <div className="grid grid-cols-2 gap-4">
                <FormControl fullWidth variant="outlined" className="mb-4">
                    <InputLabel>Class</InputLabel>
                    <Select
                        value={selectedClass}
                        onChange={handleClassChange}
                        label="Class"
                    >
                        {classes.map(cls => (
                            <MenuItem key={cls.classNumber} value={cls.classNumber}>
                                {cls.classNumber}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth variant="outlined" className="mb-4">
                    <InputLabel>Section</InputLabel>
                    <Select
                        value={selectedSection}
                        onChange={handleSectionChange}
                        label="Section"
                        disabled={!selectedClass} // Disable section dropdown until class is selected
                    >
                        {sections.map(sec => (
                            <MenuItem key={sec.section_id} value={sec.section_name}>
                                {sec.section_name}
                            </MenuItem>
                        ))}
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
                            <ListItem key={student.student_id} className="mb-2">
                                <FormControlLabel
                                    control={
                                        <>
                                            <Checkbox
                                                checked={student.status === STATUS.PRESENT}
                                                onChange={() => handleAttendanceChange(student.student_id, STATUS.PRESENT)}
                                                color="primary"
                                            />
                                            <Checkbox
                                                checked={student.status === STATUS.ABSENT}
                                                onChange={() => handleAttendanceChange(student.student_id, STATUS.ABSENT)}
                                                color="secondary"
                                            />
                                        </>
                                    }
                                    label={student.student_name}
                                />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>

            {/* Save Button */}
            <Button
                onClick={saveAttendance}
                color="primary"
                variant="contained"
                className="mt-4"
                disabled={students.length === 0} // Disable if no students are loaded
            >
                Save Attendance
            </Button>
        </div>
    );
};

export default TeacherStudentAttendance;
