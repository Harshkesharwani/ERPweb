import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { url } from "../../Store/Config";

const AdminStudent = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        fetchStudentsData();
    }, []);

    const fetchStudentsData = async () => {
        try {
            const response = await fetch(`${url}/admin_student_fetch`);
            const data = await response.json();
            setStudents(data.Students);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch data');
            setLoading(false);
        }
    };

    const handleOpenDialog = (student) => {
        setSelectedStudent(student);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedStudent(null);
    };

    const handleSave = async () => {
        try {
            // Clone the selectedStudent object to avoid directly modifying state
            const studentData = { ...selectedStudent };
    
            // If adding a new user (i.e., student_id is not present), add profile_type
            if (!studentData.student_id) {
                studentData.profile_type = 'student';
            }
    
            const response = await fetch(
                `${url}/${studentData.student_id ? 'admin_student_update' : 'add_user'}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(studentData),
                }
            )
    
            if (response.ok) {
                fetchStudentsData(); // Refresh the student data
                handleCloseDialog(); // Close the dialog
            } else {
                setError('Failed to save data');
            }
        } catch (error) {
            setError('Failed to save data');
        }
    };
    

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Do you really want to delete this data?');
        if (confirmDelete) {
            try {
                const response = await fetch(`${url}/admin_student_delete`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ student_id: id }),
                });
                if (response.ok) {
                    fetchStudentsData();
                } else {
                    setError('Failed to delete data');
                }
            } catch (error) {
                setError('Failed to delete data');
            }
        }
    };

    const handleEditChange = (field, value) => {
        setSelectedStudent((prevStudent) => ({
            ...prevStudent,
            [field]: value,
        }));
    };

    const columnDefs = [
        { headerName: "Name", field: "Name", sortable: true, filter: true },
        { headerName: "Phone", field: "phone", sortable: true, filter: true },
        { headerName: "Email", field: "email", sortable: true, filter: true },
        { headerName: "Address", field: "address", sortable: true, filter: true },
        { headerName: "Grade", field: "Class", sortable: true, filter: true },
        { headerName: "DOB", field: "date_of_birth", sortable: true, filter: true },
        {
            headerName: "Actions",
            cellRenderer: (params) => (
                <div className='m-2 flex justify-center items-center space-x-6'>
                    <EditIcon
                        onClick={() => handleOpenDialog(params.data)}
                        className="text-yellow-500 cursor-pointer"
                    />
                    <DeleteIcon
                        onClick={() => handleDelete(params.data.student_id)}
                        className="text-red-500 cursor-pointer"
                    />
                </div>
            )
        }
    ];

    return (
        <div className="flex flex-col items-center">
            <div className='flex flex-row space-x-6 m-4'>
                <h2 className="text-2xl font-bold mb-4">Admin Student</h2>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog({ Name: '', phone: '', email: '', address: '', student_class: '', date_of_birth: '' })}
                    className="mb-4 text-2xl"
                >
                    +
                </Button>
            </div>

            {/* AG Grid for displaying student data */}
            <div className="ag-theme-alpine" style={{ height: 400, width: '75%' }}>
                <AgGridReact
                    rowData={students}
                    columnDefs={columnDefs}
                />
            </div>

            {/* Loading and error handling */}
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{selectedStudent && selectedStudent.id ? "Edit Student" : "Add Student"}</DialogTitle>
                <DialogContent>
                    {selectedStudent && (
                        <div className="flex flex-col space-y-4 max-w-3xl mx-auto">
                            <TextField
                                label="Name"
                                value={selectedStudent.Name}
                                onChange={(e) => handleEditChange('Name', e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Phone"
                                value={selectedStudent.phone}
                                onChange={(e) => handleEditChange('phone', e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Email"
                                value={selectedStudent.email}
                                onChange={(e) => handleEditChange('email', e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Address"
                                value={selectedStudent.address}
                                onChange={(e) => handleEditChange('address', e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="age"
                                value={selectedStudent.age}
                                onChange={(e) => handleEditChange('age', e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Date of Birth"
                                value={selectedStudent.date_of_birth}
                                onChange={(e) => handleEditChange('date_of_birth', e.target.value)}
                                fullWidth
                            />
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminStudent;
