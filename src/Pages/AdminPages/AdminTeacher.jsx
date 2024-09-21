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

const AdminTeacher = () => {
    const [teachers, setTeachers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [newTeacher, setNewTeacher] = useState({
        profile_type: 'teacher',
        Name: '',
        phone: '',
        email: '',
        section_or_department: '',
        city: '',
        country: '',
        state: '',
        postal_code: '',
        address: '',
        date_of_birth: '',
        father_name: '',
        mother_name: '',
        from_year: '',
        to_year: '',
        joining_date_or_admission_date: '',
        gender: '',
        age: '',
    });

    useEffect(() => {
        fetchTeachersData();
    }, []);

    const fetchTeachersData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${url}/admin_teacher_fetch`);
            const data = await response.json();
            const formattedTeachers = data.Teachers.map((teacher, index) => ({
                id: teacher.id, // Assuming `id` is the identifier
                Name: teacher.Name,
                phone: teacher.phone,
                email: teacher.email,
                section_or_department: teacher.section_or_department,
                address: teacher.address,
                EmployeeID: teacher['Employee ID'],
                date_of_birth: teacher.date_of_birth,
                joining_date_or_admission_date: teacher.joining_date_or_admission_date,
                age: teacher.Age,
            }));
            setTeachers(formattedTeachers);
            setDepartments(data.Deparments); // Assuming data.Deparments contains departments
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch data');
            setLoading(false);
        }
    };

    const handleOpenDialog = (teacher) => {
        if (teacher) {
            setSelectedTeacher(teacher);
            setIsEdit(true);
        } else {
            setSelectedTeacher(newTeacher);
            setIsEdit(false);
        }
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedTeacher(null);
    };

    const handleEditChange = (field, value) => {
        setSelectedTeacher(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`${url}${isEdit ? '/admin_teacher_update' : '/add_user'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedTeacher),
            });
            if (response.ok) {
                fetchTeachersData();
                handleCloseDialog();
            } else {
                setError(`Failed to ${isEdit ? 'update' : 'add'} teacher`);
            }
        } catch (error) {
            setError(`Failed to ${isEdit ? 'update' : 'add'} teacher`);
        }
    };

    const handleDelete = async (id) => {
        console.log("Teacher id", id)
        if (window.confirm("Do you really want to delete this teacher?")) {
            try {
                const response = await fetch(`${url}/admin_teacher_delete`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ teacher_id: id }),
                });
                if (response.ok) {
                    fetchTeachersData();
                } else {
                    setError('Failed to delete teacher');
                }
            } catch (error) {
                setError('Failed to delete teacher');
            }
        }
    };

    const columnDefs = [
        { headerName: "Name", field: "Name", sortable: true, filter: true },
        { headerName: "Phone", field: "phone", sortable: true, filter: true },
        { headerName: "Email", field: "email", sortable: true, filter: true },
        { headerName: "Address", field: "address", sortable: true, filter: true },
        { headerName: "Department", field: "section_or_department", sortable: true, filter: true },
        {
            headerName: "Actions",
            cellRenderer: (params) => (
                <div className='m-2 flex justify-center items-center space-x-6'>
                    <EditIcon
                        onClick={() => handleOpenDialog(params.data)}
                        className="text-yellow-500 cursor-pointer"
                    />
                    <DeleteIcon
                        onClick={() => handleDelete(params.data.EmployeeID)}
                        className="text-red-500 cursor-pointer"
                    />
                </div>
            )
        }
    ];

    return (
        <div className="flex flex-col items-center">
            <div className='flex flex-row space-x-7 m-4'>
                <h2 className="text-2xl font-bold mb-4">Admin Teacher</h2>
                <Button
                    color="primary"
                    onClick={() => handleOpenDialog(null)}
                    className="mb-4 rounded"
                >
                    + Add Teacher
                </Button>
            </div>

            {/* AG Grid for displaying teacher data */}
            <div className="ag-theme-alpine" style={{ height: 400, width: '75%' }}>
                <AgGridReact
                    rowData={teachers}
                    columnDefs={columnDefs}
                />
            </div>

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{isEdit ? "Edit Teacher" : "Add Teacher"}</DialogTitle>
                <DialogContent>
                    {selectedTeacher && (
                        <div className="flex flex-col space-y-4 max-w-3xl mx-auto">
                            <div className="flex flex-col-2 space-x-4">
                                <TextField
                                    label="Name"
                                    value={selectedTeacher.Name}
                                    onChange={(e) => handleEditChange('Name', e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="Phone"
                                    value={selectedTeacher.phone}
                                    onChange={(e) => handleEditChange('phone', e.target.value)}
                                    fullWidth
                                />
                            </div>
                            <div className="flex flex-col-2 space-x-4">
                                <TextField
                                    label="Email"
                                    value={selectedTeacher.email}
                                    onChange={(e) => handleEditChange('email', e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="Address"
                                    value={selectedTeacher.address}
                                    onChange={(e) => handleEditChange('address', e.target.value)}
                                    fullWidth
                                />
                            </div>
                            <div className="flex flex-col-2 space-x-4">
                                <TextField
                                    label="Department"
                                    value={selectedTeacher.section_or_department}
                                    onChange={(e) => handleEditChange('section_or_department', e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="Employee ID"
                                    value={selectedTeacher.EmployeeID}
                                    onChange={(e) => handleEditChange('EmployeeID', e.target.value)}
                                    fullWidth
                                />
                            </div>
                            <div className="flex flex-col-2 space-x-4">
                                <TextField
                                    label="Date of Birth"
                                    value={selectedTeacher.date_of_birth}
                                    onChange={(e) => handleEditChange('date_of_birth', e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="Joining Date"
                                    value={selectedTeacher.joining_date_or_admission_date}
                                    onChange={(e) => handleEditChange('joining_date_or_admission_date', e.target.value)}
                                    fullWidth
                                />
                            </div>
                            <div className="flex flex-col-2 space-x-4">
                                <TextField
                                    label="Age"
                                    value={selectedTeacher.age}
                                    onChange={(e) => handleEditChange('age', e.target.value)}
                                    fullWidth
                                    required
                                />
                            </div>
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

export default AdminTeacher;
