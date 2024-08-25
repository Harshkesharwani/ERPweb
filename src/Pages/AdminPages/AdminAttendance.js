import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Paper, Typography, IconButton } from '@mui/material';
import { AgCharts } from 'ag-charts-react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { url } from "../../Store/Config";
import { Admin_Attendence_fetch, Admin_Attendence_update, Admin_Attendence_add, Admin_Attendence_delete } from '../../Store/AdminStore/AdminAPI';

const localizer = momentLocalizer(moment);

const AdminAttendance = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [enrollment_or_employee_id, setenrollment_or_employee_id] = useState('');
    const [attendanceStatus, setAttendanceStatus] = useState('');
    const [check_in_time, setcheck_in_time] = useState('');
    const [check_out_time, setcheck_out_time] = useState('');
    const [type, settype] = useState(''); // 'Full Day' or 'Half Day'
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [chartData, setChartData] = useState([]);

    // Function to handle date selection in the calendar
    const handleSelectSlot = ({ start }) => {
        setSelectedDate(start);
        setAttendanceStatus(''); // Reset attendance status when date changes
        setcheck_in_time('');
        setcheck_out_time('');
        settype('');
    };

    // Function to handle student ID input change
    const handleenrollment_or_employee_idChange = (e) => {
        setenrollment_or_employee_id(e.target.value);
        setAttendanceStatus(''); // Reset attendance status when student ID changes
    };

    // Function to fetch attendance data
    const fetchAttendanceData = async () => {
        if (selectedDate && enrollment_or_employee_id) {
            const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
            console.log(formattedDate);
            try {
                const response = await fetch(`${url}${Admin_Attendence_fetch}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ enrollment_or_employee_id, date: formattedDate }),
                });
                const data = await response.json();
                console.log(data)
                if (response.ok) {
                    if (data.data && data.data.length > 0) {
                        const attendanceData = data.data[0];
                        setAttendanceStatus(attendanceData.status || 'No data available');
                        setcheck_in_time(attendanceData.check_in_time || '');
                        setcheck_out_time(attendanceData.check_out_time || '');
                        settype(attendanceData.type || '');
                    } else {
                        alert('No attendance data found for the selected date.');
                    }
                } else {
                    alert('Failed to fetch attendance data');
                }
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        } else {
            alert('Please select a date and enter a student ID.');
        }
    };

    // Function to handle form submission
    const handleSubmit = () => {
        fetchAttendanceData();
    };

    // Function to handle opening the edit modal
    const handleOpenEditModal = () => {
        setEditModalOpen(true);
    };

    // Function to handle closing the edit modal
    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    // Function to handle opening the add attendance modal
    const handleOpenAddModal = () => {
        setAddModalOpen(true);
    };

    // Function to handle closing the add attendance modal
    const handleCloseAddModal = () => {
        setAddModalOpen(false);
    };

    // Function to handle opening the delete confirmation modal
    const handleOpenDeleteModal = () => {
        setDeleteModalOpen(true);
    };

    // Function to handle closing the delete confirmation modal
    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
    };

    // Function to handle saving changes (update attendance)
    const handleSaveChanges = async () => {
        try {
            const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
            const response = await fetch(`${url}${Admin_Attendence_update}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    enrollment_or_employee_id,
                    date: formattedDate,
                    status: attendanceStatus,
                    check_in_time,
                    check_out_time,
                    type
                }),
            });
            if (response.ok) {
                alert('Attendance updated successfully');
            } else {
                alert('Failed to update attendance');
            }
        } catch (error) {
            console.error('Error updating attendance:', error);
        }
        handleCloseEditModal();
    };

    // Function to handle adding new attendance
    const handleAddAttendance = async () => {
        try {
            const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
            const response = await fetch(`${url}${Admin_Attendence_add}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    enrollment_or_employee_id,
                    date: formattedDate,
                    status: attendanceStatus,
                    check_in_time,
                    check_out_time,
                    type
                }),
            });
            if (response.ok) {
                alert('Attendance added successfully');
            } else {
                alert('Failed to add attendance');
            }
        } catch (error) {
            console.error('Error adding attendance:', error);
        }
        handleCloseAddModal();
    };

    // Function to handle deleting attendance
    const handleDeleteAttendance = async () => {
        try {
            const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
            const response = await fetch(`${url}${Admin_Attendence_delete}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ enrollment_or_employee_id, date: formattedDate, check_in_time: '10:00', check_out_time: '23:00', type: 'halfday' }),
            });
            if (response.ok) {
                alert('Attendance deleted successfully');
                // Optionally reset state or fetch new data
                setAttendanceStatus('');
                setcheck_in_time('');
                setcheck_out_time('');
                settype('');
            } else {
                alert('Failed to delete attendance');
            }
        } catch (error) {
            console.error('Error deleting attendance:', error);
        }
        handleCloseDeleteModal();
    };

    // Update chart data based on fetched attendance data
    useEffect(() => {
        const presentCount = attendanceStatus === 'Present' ? 1 : 0;
        const absentCount = attendanceStatus === 'Absent' ? 1 : 0;

        setChartData([
            { label: 'Present', value: presentCount },
            { label: 'Absent', value: absentCount },
        ]);
    }, [attendanceStatus]);

    const chartOptions = {
        data: chartData,
        series: [
            {
                type: 'pie',
                angleKey: 'value',
                labelKey: 'label',
                fills: ['#4caf50', '#f44336'],
            },
        ],
    };

    return (
        <div className="flex flex-col p-6 bg-gray-100 min-h-screen">
            <div className="flex flex-row w-full max-w-8xl space-x-6">
                {/* Calendar */}
                <Calendar
                    localizer={localizer}
                    events={[]}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '700px', width: '100%' }}
                    selectable
                    onSelectSlot={handleSelectSlot}
                />

                <Box className="flex flex-col w-1/3 space-y-4">
                    {/* Student ID Input */}
                    <TextField
                        value={enrollment_or_employee_id}
                        onChange={handleenrollment_or_employee_idChange}
                        label="Student ID"
                        variant="outlined"
                        fullWidth
                    />
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Submit
                    </Button>

                    {/* Button to open the add attendance modal */}
                    <Button
                        onClick={handleOpenAddModal}
                        variant="contained"
                        color="success"
                        fullWidth
                        startIcon={<AddCircleIcon />}
                    >
                        Add Attendance
                    </Button>

                    {/* Pie Chart for Monthly Attendance */}
                    <Paper className="p-4 bg-white rounded shadow-md">
                        <Typography variant="h6" component="h3" className="font-bold mb-4">
                            Monthly Attendance
                        </Typography>
                        <AgCharts options={chartOptions} />
                    </Paper>

                    {/* Attendance Status Display */}
                    {attendanceStatus && (
                        <Paper className="p-4 bg-white rounded shadow-md cursor-pointer rounded flex items-center justify-between" onClick={handleOpenEditModal}>
                            <div>
                                <Typography variant="h6" component="h3" className="font-bold">
                                    Attendance Status
                                </Typography>
                                <Typography><strong>Date:</strong> {moment(selectedDate).format('YYYY-MM-DD')}</Typography>
                                <Typography><strong>Student ID:</strong> {enrollment_or_employee_id}</Typography>
                                <Typography><strong>Status:</strong> {attendanceStatus}</Typography>
                                <Typography><strong>Check-In Time:</strong> {check_in_time}</Typography>
                                <Typography><strong>Check-Out Time:</strong> {check_out_time}</Typography>
                                <Typography><strong>Attendance Type:</strong> {type}</Typography>
                            </div>
                            <IconButton onClick={handleOpenDeleteModal} color="error">
                                <DeleteIcon />
                            </IconButton>
                        </Paper>
                    )}
                </Box>
            </div>

            {/* Modal for Add Attendance */}
            <Dialog open={addModalOpen} onClose={handleCloseAddModal}>
                <DialogTitle>Add Attendance</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="enrollment_or_employee_id"
                        label="Student ID"
                        type="text"
                        fullWidth
                        value={enrollment_or_employee_id}
                        onChange={handleenrollment_or_employee_idChange}
                    />
                    <TextField
                        margin="dense"
                        id="attendanceStatus"
                        label="Attendance Status"
                        type="text"
                        fullWidth
                        value={attendanceStatus}
                        onChange={(e) => setAttendanceStatus(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="check_in_time"
                        label="Check-In Time"
                        type="time"
                        fullWidth
                        value={check_in_time}
                        onChange={(e) => setcheck_in_time(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="check_out_time"
                        label="Check-Out Time"
                        type="time"
                        fullWidth
                        value={check_out_time}
                        onChange={(e) => setcheck_out_time(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="type"
                        label="Attendance Type"
                        type="text"
                        fullWidth
                        value={type}
                        onChange={(e) => settype(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddAttendance} color="primary">
                        Add Attendance
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal for Edit Attendance */}
            <Dialog open={editModalOpen} onClose={handleCloseEditModal}>
                <DialogTitle>Edit Attendance</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="enrollment_or_employee_id"
                        label="Student ID"
                        type="text"
                        fullWidth
                        value={enrollment_or_employee_id}
                        disabled
                    />
                    <TextField
                        margin="dense"
                        id="attendanceStatus"
                        label="Attendance Status"
                        type="text"
                        fullWidth
                        value={attendanceStatus}
                        onChange={(e) => setAttendanceStatus(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="check_in_time"
                        label="Check-In Time"
                        type="time"
                        fullWidth
                        value={check_in_time}
                        onChange={(e) => setcheck_in_time(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="check_out_time"
                        label="Check-Out Time"
                        type="time"
                        fullWidth
                        value={check_out_time}
                        onChange={(e) => setcheck_out_time(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="type"
                        label="Attendance Type"
                        type="text"
                        fullWidth
                        value={type}
                        onChange={(e) => settype(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveChanges} color="primary">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal for Delete Confirmation */}
            <Dialog open={deleteModalOpen} onClose={handleCloseDeleteModal}>
                <DialogTitle>Delete Attendance</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete the attendance record?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteAttendance} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminAttendance;
