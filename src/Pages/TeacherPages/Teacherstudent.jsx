import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Typography, Card, CardContent, List, ListItem, CircularProgress } from '@mui/material';
import { url } from '../../Store/Config';

const TeacherStudentPage = () => {
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    useEffect(() => {
        if (selectedClass) {
            filterSections(selectedClass);
        }
    }, [selectedClass]);

    useEffect(() => {
        if (selectedClass && selectedSection) {
            fetchStudentsData();
        }
    }, [selectedClass, selectedSection]);

    const fetchUserProfile = async () => {
        const userProfile = localStorage.getItem('userProfile');
        if (userProfile) {
            const parsedProfile = JSON.parse(userProfile);
            fetchClassAndSection(parsedProfile["enrollment_or_employee_id"]);
        }
    };

    const fetchClassAndSection = async (id) => {
        try {
            const response = await fetch(`${url}/teacher_class_section_details`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ enrollment_or_employee_id: id }),
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
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch class and section data');
            setLoading(false);
        }
    };

    const filterSections = (classId) => {
        const filteredSections = classes.find(cls => cls.classNumber === classId)?.sections || [];
        setSections(filteredSections);
    };

    const fetchStudentsData = async () => {
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
            setStudents(data || []);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch students data');
            setLoading(false);
        }
    };

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
        setSelectedSection('');  // Reset section when class changes
    };

    const handleSectionChange = (event) => {
        setSelectedSection(event.target.value);
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Students</h1>
            {/* Dropdown for Class */}
            <div className='grid grid-cols-2 gap-4'>
                <FormControl fullWidth variant="outlined" className="mb-4">
                    <InputLabel>Class</InputLabel>
                    <Select
                        value={selectedClass}
                        onChange={handleClassChange}
                        label="Class"
                    >
                        {classes.map((classValue) => (
                            <MenuItem key={classValue.classNumber} value={classValue.classNumber}>
                                {classValue.classNumber}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Dropdown for Section */}
                <FormControl fullWidth variant="outlined" className="mb-4" disabled={!selectedClass}>
                    <InputLabel>Section</InputLabel>
                    <Select
                        value={selectedSection}
                        onChange={handleSectionChange}
                        label="Section"
                    >
                        {sections.map((sectionValue) => (
                            <MenuItem key={sectionValue.section_id} value={sectionValue.section_name}>
                                {sectionValue.section_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            {/* Display Loading State */}
            {loading && <CircularProgress />}

            {/* Display Error Message */}
            {error && <Typography color="error">{error}</Typography>}

            {/* Student List */}
            {!loading && !error && students.length > 0 && (
                <List>
                    {students.map((student) => (
                        <ListItem key={student.id} className="mb-2">
                            <Card variant="outlined" className="w-full">
                                <CardContent>
                                    <Typography variant="h6">ID: {student.student_id}</Typography>
                                    <Typography variant="body1">Name: {student.student_name}</Typography>
                                    <Typography variant="body1">Phone: {student.phone}</Typography>
                                </CardContent>
                            </Card>
                        </ListItem>
                    ))}
                </List>
            )}

            {/* No Students Found */}
            {!loading && !error && students.length === 0 && selectedClass && selectedSection && (
                <Typography variant="body1">No students found for the selected class and section.</Typography>
            )}
        </div>
    );
};

export default TeacherStudentPage;
