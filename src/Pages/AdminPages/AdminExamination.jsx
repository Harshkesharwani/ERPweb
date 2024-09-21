import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { url } from "../../Store/Config";

const AdminExaminationPage = () => {
    const [examData, setExamData] = useState([]);
    const [newExams, setNewExams] = useState([]);
    const [currentExam, setCurrentExam] = useState({
        class: '',
        subject: '',
        date: '',
        time: '',
        endTime: '',
        examType: '',
        id: ''
    });
    const [modalVisible1, setModalVisible1] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [open, setOpen] = useState(false);
    const [searchClass, setSearchClass] = useState('');
    const [searchExamType, setSearchExamType] = useState('');

    useEffect(() => {
        if (searchClass && searchExamType) {
            fetchExamData();
        }
    }, [searchClass, searchExamType]);

    const fetchExamData = async () => {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
        try {
            const response = await fetch(`${url}/admin_exam_time_table`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    class: searchClass,
                    exam_type: searchExamType,
                    date: formattedDate,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setExamData(data['Exam Time Table']);
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching exam data:', error);
        }
    };

    const handleAddExam = () => {
        const formattedExam = {
            ...currentExam,
            date: formatDate(currentExam.date),
            time: formatTime(currentExam.time),
            endTime: formatTime(currentExam.endTime),
        };
        setNewExams((prevExams) => [...prevExams, formattedExam]);
        setCurrentExam({
            class: '',
            subject: '',
            date: '',
            examType: '',
            time: '',
            endTime: '',
        });
        setOpen(false);
    };

    const handleNewExamSubmit = async () => {
        try {
            const response = await fetch(`${url}/${editMode ? 'admin_update_exam_time_table' : 'admin_save_exam_time_table'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentExam), // Fixed: passing object directly
            });
            if (response.ok) {
                fetchExamData();
                setNewExams([]);
                setModalVisible1(false);
                alert('Examinations saved successfully');
            } else {
                throw new Error('Failed to save examinations');
            }
        } catch (error) {
            console.error('Error saving examinations:', error);
            alert('Failed to save examinations');
        }
    };

    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    const formatTime = (time) => {
        const t = new Date(time);
        let hours = t.getHours();
        const minutes = t.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    };

    const handleOpenDialog = (exam) => {
        if (exam) {
            setCurrentExam({
                class: exam.class || '',
                subject: exam.subject || '',
                date: exam.date || '',
                examType: exam.examType || '',
                time: exam.time || '',
                endTime: exam.endTime || '',
                id: exam.id || '',
            });
            setEditMode(true);
        } else {
            setCurrentExam({
                class: '',
                subject: '',
                date: '',
                time: '',
                endTime: '',
                examType: '',
            });
            setEditMode(false);

        }
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleSaveExam = () => {
        if (editMode) {
            handleNewExamSubmit();
        } else {
            handleNewExamSubmit();
        }
    };

    const handleDeleteExam = async (exam) => {
        try {
            const response = await fetch(`${url}/admin_delete_exam_time_table`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: exam.id }), // Assuming 'id' is the unique identifier
            });
            if (response.ok) {
                fetchExamData();
                alert('Examination deleted successfully');
            } else {
                throw new Error('Failed to delete examination');
            }
        } catch (error) {
            console.error('Error deleting examination:', error);
            alert('Failed to delete examination');
        }
    };

    const columns = [
        { headerName: 'Subject', field: 'subject', sortable: true, filter: true },
        { headerName: 'Date', field: 'date', sortable: true, filter: true },
        { headerName: 'Time', field: 'time', sortable: true, filter: true },
        { headerName: 'Class', field: 'class', sortable: true, filter: true },
        { headerName: 'Exam Type', field: 'examType', sortable: true, filter: true },
        {
            headerName: 'Actions',
            field: 'actions',
            cellRenderer: (params) => (
                <div className='space-x-6'>
                    <Button color="primary" startIcon={<EditIcon />} onClick={() => handleOpenDialog(params.data)}>
                        Edit
                    </Button>
                    <Button color="secondary" startIcon={<DeleteIcon />} onClick={() => handleDeleteExam(params.data)}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className='flex flex-row p-4 justify-between'>
                <h2 className="text-2xl font-bold mb-4">Examination</h2>
                <Button color="primary" startIcon={<AddIcon />} onClick={() => handleOpenDialog(null)}>
                    Add Examination
                </Button>
            </div>
            <div className="flex flex-col space-y-4 mb-6">
                <div className="flex space-x-4 mb-4">
                    <TextField
                        label="Search by Class"
                        value={searchClass}
                        onChange={(e) => setSearchClass(e.target.value)}
                        className="w-1/2"
                    />
                    <FormControl className="w-1/2">
                        <InputLabel>Search by Exam Type</InputLabel>
                        <Select
                            value={searchExamType}
                            onChange={(e) => setSearchExamType(e.target.value)}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="Final">Final</MenuItem>
                            <MenuItem value="Half Yearly">Half Yearly</MenuItem>
                            <MenuItem value="Quarterly">Quarterly</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
                    <AgGridReact
                        rowData={examData}
                        columnDefs={columns}
                        defaultColDef={{
                            flex: 1,
                            minWidth: 100,
                            resizable: true,
                        }}
                    />
                </div>
            </div>

            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>{editMode ? 'Edit Examination' : 'Add Examination'}</DialogTitle>
                <DialogContent className='space-y-6'>
                    <TextField
                        label="Subject"
                        value={currentExam.subject}
                        onChange={(e) => setCurrentExam({ ...currentExam, subject: e.target.value })}
                        className="mt-4 w-full"
                    />
                    <TextField
                        label="Date"
                        type="date"
                        value={currentExam.date}
                        onChange={(e) => setCurrentExam({ ...currentExam, date: e.target.value })}
                        className="mt-4 w-full"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Time"
                        type="time"
                        value={currentExam.time}
                        onChange={(e) => setCurrentExam({ ...currentExam, time: e.target.value })}
                        className="mt-4 w-full"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="End Time"
                        type="time"
                        value={currentExam.endTime}
                        onChange={(e) => setCurrentExam({ ...currentExam, endTime: e.target.value })}
                        className="mt-4 w-full"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Class"
                        value={currentExam.class}
                        onChange={(e) => setCurrentExam({ ...currentExam, class: e.target.value })}
                        className="mt-4 w-full"
                    />
                    <FormControl className="mt-4 w-full">
                        <InputLabel>Exam Type</InputLabel>
                        <Select
                            value={currentExam.examType}
                            onChange={(e) => setCurrentExam({ ...currentExam, examType: e.target.value })}
                        >
                            <MenuItem value="Final">Final</MenuItem>
                            <MenuItem value="Half Yearly">Half Yearly</MenuItem>
                            <MenuItem value="Quarterly">Quarterly</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveExam} color="primary">
                        {editMode ? 'Save Changes' : 'Add Examination'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminExaminationPage;
