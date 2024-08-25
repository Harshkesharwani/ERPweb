import React, { useState, useEffect } from 'react';
import {
    TextField, Button, Card, CardContent, Typography, List, ListItem,
    IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
    FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { url } from '../../Store/Config';

const TeacherHomework = () => {
    const [homeworkList, setHomeworkList] = useState([]);
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newHomework, setNewHomework] = useState({
        id: '',
        class: '',
        section: '',
        subject: '',
        homework: '',
        date: new Date(),
    });
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    useEffect(() => {
        if (selectedClass && selectedSection) {
            fetchHomeworkList();
        }
    }, [selectedClass, selectedSection]);

    const fetchUserProfile = async () => {
        try {
            const userProfile = localStorage.getItem('userProfile');
            if (userProfile) {
                const parsedProfile = JSON.parse(userProfile);
                fetchClassAndSection(parsedProfile["enrollment_or_employee_id"]);
            }
        } catch (error) {
            setError('Failed to fetch user profile');
            setLoading(false);
        }
    };

    const fetchClassAndSection = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${url}/teacher_class_section_details`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ enrollment_or_employee_id: id }),
            });
            const data = await response.json();
            setClasses(data.class || []);
            setSections(data.section || []);
        } catch (error) {
            setError('Failed to fetch class and section data');
        } finally {
            setLoading(false);
        }
    };

    const fetchHomeworkList = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${url}/admin_homework_fetch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ class: selectedClass, section: selectedSection }),
            });
            const data = await response.json();
            console.log(data);
            setHomeworkList(data || []);
        } catch (error) {
            setError('Failed to fetch homework list');
        } finally {
            setLoading(false);
        }
    };

    const handleAddHomework = async () => {
        try {
            const response = await fetch(`${url}/admin_homework_create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newHomework),
            });
            if (response.ok) {
                fetchHomeworkList();
                setModalVisible(false);
                resetHomeworkForm();
            } else {
                setError('Failed to add homework');
            }
        } catch (error) {
            setError('Failed to add homework');
        }
    };

    const handleEditHomework = async () => {
        try {
            const response = await fetch(`${url}/admin_homework_update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newHomework),
            });
            if (response.ok) {
                fetchHomeworkList();
                setModalVisible(false);
                setEditMode(false);
                resetHomeworkForm();
            } else {
                setError('Failed to update homework');
            }
        } catch (error) {
            setError('Failed to update homework');
        }
    };

    const resetHomeworkForm = () => {
        setNewHomework({
            id: '',
            class: '',
            section: '',
            subject: '',
            homework: '',
            date: new Date(),
        });
    };

    const handleEditPress = (item) => {
        setNewHomework({
            ...item,
            date: new Date(item.date),
        });
        setEditMode(true);
        setModalVisible(true);
    };

    return (
        <div className="p-4">
            <Typography variant="h4" gutterBottom>
                Teacher Homework Management
            </Typography>

            <div className='grid grid-cols-4 gap-4 mb-4'>
                <FormControl fullWidth className="mb-4">
                    <InputLabel>Class</InputLabel>
                    <Select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        label="Class"
                    >
                        {classes.map((cls) => (
                            <MenuItem key={cls} value={cls}>
                                {cls}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth className="mb-4">
                    <InputLabel>Section</InputLabel>
                    <Select
                        value={selectedSection}
                        onChange={(e) => setSelectedSection(e.target.value)}
                        label="Section"
                    >
                        {sections.map((sec) => (
                            <MenuItem key={sec} value={sec}>
                                {sec}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    onClick={() => setModalVisible(true)}
                    color="primary"
                    variant="contained"
                    className="mb-4"
                >
                    Add Homework
                </Button>
            </div>

            <Typography variant="h6" gutterBottom>
                Homework List
            </Typography>
            <List>
                {homeworkList.map((item) => (
                    <ListItem key={item.id} className="mb-2">
                        <Card variant="outlined" className="w-full">
                            <CardContent>
                                <Typography variant="h6">Subject: {item.subject}</Typography>
                                <Typography variant="body1">Class: {item.class}</Typography>
                                <Typography variant="body1">Section: {item.section}</Typography>
                                <Typography variant="body1">Homework: {item.homework}</Typography>
                                <IconButton onClick={() => handleEditPress(item)} color="primary">
                                    <EditIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                    </ListItem>
                ))}
            </List>

            <Dialog open={modalVisible} onClose={() => setModalVisible(false)}>
                <DialogTitle>{editMode ? 'Edit Homework' : 'Add Homework'}</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth variant="outlined" className="mt-2">
                        <InputLabel>Subject</InputLabel>
                        <Select
                            value={newHomework.subject}
                            onChange={(e) => setNewHomework({ ...newHomework, subject: e.target.value })}
                            label="Subject"
                        >
                            <MenuItem value="Math">Math</MenuItem>
                            <MenuItem value="English">English</MenuItem>
                            <MenuItem value="Science">Science</MenuItem>
                            {/* Add more subjects as needed */}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Class"
                        variant="outlined"
                        value={newHomework.class}
                        onChange={(e) => setNewHomework({ ...newHomework, class: e.target.value })}
                        className="mt-2"
                    />
                    <TextField
                        fullWidth
                        label="Section"
                        variant="outlined"
                        value={newHomework.section}
                        onChange={(e) => setNewHomework({ ...newHomework, section: e.target.value })}
                        className="mt-2"
                    />
                    <TextField
                        fullWidth
                        label="Homework"
                        variant="outlined"
                        value={newHomework.homework}
                        onChange={(e) => setNewHomework({ ...newHomework, homework: e.target.value })}
                        className="mt-2"
                        multiline
                        rows={4}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModalVisible(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={editMode ? handleEditHomework : handleAddHomework} color="primary">
                        {editMode ? 'Save Changes' : 'Add Homework'}
                    </Button>
                </DialogActions>
            </Dialog>

            {loading && <Typography>Loading...</Typography>}
            {error && <Typography color="error">{error}</Typography>}
        </div>
    );
};

export default TeacherHomework;
