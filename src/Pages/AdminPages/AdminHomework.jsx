import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { url } from "../../Store/Config";

const Homework = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [homeworkData, setHomeworkData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        class: '',
        section: '',
        date: '',
        subject: '',
        homework: '',
    });
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        if (selectedClass && selectedSection) {
            fetchHomeworkData();
        }
    }, [selectedClass, selectedSection]);

    const fetchHomeworkData = async () => {
        setLoading(true);
        try {
            const dates = new Date().toISOString().split('T')[0];
            const response = await fetch(`${url}/admin_homework_fetch`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ class: selectedClass, section: selectedSection, date: dates }),
            });
            const data = await response.json();
            console.log(data)
            setHomeworkData(data);
        } catch (error) {
            console.error('Failed to fetch homework data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (homework) => {
        if (homework) {
            setEditData(homework);
            setFormData(homework);
        } else {
            setEditData(null);
            setFormData({ class: '', section: '', date: '', subject: '', homework: '' });
        }
        setModalOpen(true);
    };

    const handleCloseDialog = () => {
        setModalOpen(false);
    };

    const handleSave = async () => {
        if (editData) {
            await handleEditHomework();
        } else {
            await handleAddHomework();
        }
        handleCloseDialog();
    };

    const handleAddHomework = async () => {
        try {
            const response = await fetch(`${url}/admin_homework_create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                fetchHomeworkData();
            }
        } catch (error) {
            console.error('Failed to add homework:', error);
        }
    };

    const handleEditHomework = async () => {
        try {
            const response = await fetch(`${url}/admin_homework_update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                fetchHomeworkData();
            }
        } catch (error) {
            console.error('Failed to edit homework:', error);
        }
    };

    const handleDeleteHomework = async (id) => {
        try {
            const response = await fetch(`${url}/admin_homework_delete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(id),
            });
            if (response.ok) {
                fetchHomeworkData();
            }
        } catch (error) {
            console.error('Failed to delete homework:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mx-auto p-4">
            <div className='flex flex-row justify-between m-4'>
                <h1 className="text-2xl font-bold mb-4">Homework</h1>
                <Button color="primary" onClick={() => handleOpenDialog(null)}>
                    + Add Homework
                </Button>
            </div>
            <div className="flex space-x-4 mb-4">
                <FormControl fullWidth margin="normal">
                    <InputLabel>Class</InputLabel>
                    <Select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        label="Class"
                    >
                        {/* Replace with actual class options */}
                        <MenuItem value="10">10</MenuItem>
                        <MenuItem value="12">12</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Section</InputLabel>
                    <Select
                        value={selectedSection}
                        onChange={(e) => setSelectedSection(e.target.value)}
                        label="Section"
                    >
                        {/* Replace with actual section options */}
                        <MenuItem value="A">A</MenuItem>
                        <MenuItem value="B">B</MenuItem>
                    </Select>
                </FormControl>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="mt-4">
                    {homeworkData.map((homework) => (
                        <li key={homework.homework} className="border p-2 mb-2 flex justify-between items-center">
                            <div>
                                <h2 className="font-bold">{homework.subject}</h2>
                                <p>{homework.homework}</p>
                            </div>
                            <div>
                                <EditIcon
                                    onClick={() => handleOpenDialog(homework)}
                                    className="text-yellow-500 cursor-pointer"
                                />
                                <DeleteIcon
                                    onClick={() => handleDeleteHomework(homework)}
                                    className="text-red-500 cursor-pointer"
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <Modal open={modalOpen} onClose={handleCloseDialog}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2">
                        {editData ? "Edit Homework" : "Add Homework"}
                    </Typography>
                    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Class</InputLabel>
                            <Select
                                name="class"
                                value={formData.class}
                                onChange={handleChange}
                                label="Class"
                            >
                                {/* Replace with actual class options */}
                                <MenuItem value="10">10</MenuItem>
                                <MenuItem value="12">12</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Section</InputLabel>
                            <Select
                                name="section"
                                value={formData.section}
                                onChange={handleChange}
                                label="Section"
                            >
                                {/* Replace with actual section options */}
                                <MenuItem value="A">A</MenuItem>
                                <MenuItem value="B">B</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            label="Date"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            label="Subject"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="homework"
                            value={formData.homework}
                            onChange={handleChange}
                            label="Homework"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        <Button type="submit" variant="contained" color="primary">
                            {editData ? "Update" : "Create"}
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default Homework;
