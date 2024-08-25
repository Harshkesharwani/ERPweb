import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Modal, Box, Typography, IconButton } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Close as CloseIcon } from '@mui/icons-material';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';

const initialBuses = [
    { id: 1, route: ['Route 1'], driver: 'John Doe' },
    { id: 2, route: ['Route 2'], driver: 'Jane Smith' },
];

const initialApprovedStudents = [
    { id: 1, name: 'Alice Johnson', route: 'Route 1' },
    { id: 2, name: 'Bob Brown', route: 'Route 2' },
];

const initialApprovedRequests = [
    { id: 1, studentName: 'Charlie Davis', route: 'Route 1' },
    { id: 2, studentName: 'Dana White', route: 'Route 2' },
];

const initialPendingRequests = [
    { id: 3, studentName: 'Eve Black', route: 'Route 3' },
    { id: 4, studentName: 'Frank Green', route: 'Route 4' },
];

const AdminBusPage = () => {
    const [buses, setBuses] = useState(initialBuses);
    const [approvedRequests, setApprovedRequests] = useState(initialApprovedRequests);
    const [pendingRequests, setPendingRequests] = useState(initialPendingRequests);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

    const [busDetails, setBusDetails] = useState({ id: null, route: [''], driver: '' });
    const [editMode, setEditMode] = useState(false);

    const handleOpen = () => setOpen1(true);
    const handleClose = () => setOpen1(false);

    const handleOpenDialog = (bus) => {
        if (bus) {
            setBusDetails(bus);
            setEditMode(true);
        } else {
            setBusDetails({ id: null, route: [''], driver: '' });
            setEditMode(false);
        }
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setBusDetails({ id: null, route: [''], driver: '' });
    };

    const handleSaveBus = () => {
        if (editMode) {
            setBuses(buses.map(bus => bus.id === busDetails.id ? busDetails : bus));
        } else {
            setBuses([...buses, { ...busDetails, id: Date.now() }]);
        }
        handleCloseDialog();
    };

    const handleDeleteBus = (id) => {
        setBuses(buses.filter(bus => bus.id !== id));
    };

    const handleApproveStudent = (id) => {
        const request = pendingRequests.find(req => req.id === id);
        setApprovedRequests([...approvedRequests, request]);
        setPendingRequests(pendingRequests.filter(req => req.id !== id));
    };

    const handleDeclineRequest = (id) => {
        setPendingRequests(pendingRequests.filter(req => req.id !== id));
    };

    const handleAddRoute = () => {
        setBusDetails({ ...busDetails, route: [...busDetails.route, ''] });
    };

    const handleRemoveRoute = (index) => {
        const newRoutes = busDetails.route.filter((_, i) => i !== index);
        setBusDetails({ ...busDetails, route: newRoutes });
    };

    const handleRouteChange = (index, value) => {
        const newRoutes = busDetails.route.map((route, i) => i === index ? value : route);
        setBusDetails({ ...busDetails, route: newRoutes });
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className='flex flex-row p-4 justify-between'>
                <h2 className="text-2xl font-bold mb-4">Bus Management</h2>
                <div className='space-x-10'>
                    <Button color="primary" startIcon={<AddIcon />} onClick={() => handleOpenDialog(null)}>
                        Add Bus
                    </Button>
                    <Button color="primary" startIcon={<MoreHorizTwoToneIcon />} onClick={() => handleOpen()}>
                        Pending Requests
                    </Button>
                </div>
                <Modal open={open1} onClose={handleClose}>
                    <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-1/2">
                        <div className="flex justify-between items-center mb-4">
                            <Typography variant="h6">Pending Bus Requests</Typography>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        {pendingRequests.length > 0 ? (
                            <table className="min-w-full border border-gray-300 mx-auto">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b">Student Name</th>
                                        <th className="py-2 px-4 border-b">Route</th>
                                        <th className="py-2 px-4 border-b">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingRequests.map((request, index) => (
                                        <tr key={index}>
                                            <td className="py-2 px-4 border-b">{request.studentName}</td>
                                            <td className="py-2 px-4 border-b">{request.route}</td>
                                            <td className="py-2 px-4 border-b flex flex-row space-x-10">
                                                <Button color="primary" onClick={() => handleApproveStudent(request.id)}>Approve</Button>
                                                <Button color="secondary" onClick={() => handleDeclineRequest(request.id)}>Decline</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <Typography>No pending requests.</Typography>
                        )}

                    </Box>
                </Modal>
            </div>
            <div className="flex flex-col space-y-4 mb-6">
                <div>
                    <h3 className="text-xl font-semibold mb-2">Bus Routes</h3>
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Route</th>
                                <th className="py-2 px-4 border-b">Driver</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {buses.map(bus => (
                                <tr key={bus.id}>
                                    <td className="py-2 px-4 border-b item-center">
                                        {bus.route.join(', ')}
                                    </td>
                                    <td className="py-2 px-4 border-b content-center">{bus.driver}</td>
                                    <td className="py-2 px-4 border-b flex flex-row space-x-10">
                                        <Button color="primary" startIcon={<EditIcon />} onClick={() => handleOpenDialog(bus)} className="mr-2">
                                            Edit
                                        </Button>
                                        <Button color="secondary" startIcon={<DeleteIcon />} onClick={() => handleDeleteBus(bus.id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-2">Student List</h3>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Student Name</th>
                            <th className="py-2 px-4 border-b">Route</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvedRequests.map(request => (
                            <tr key={request.id}>
                                <td className="py-2 px-4 border-b">{request.studentName}</td>
                                <td className="py-2 px-4 border-b">{request.route}</td>
                                <td className="py-2 px-4 border-b flex flex-row space-x-10">
                                    <Button color="secondary" startIcon={<CloseIcon />} onClick={() => handleDeclineRequest(request.id)}>
                                        Decline
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Dialog open={open} onClose={handleCloseDialog}>
                <div className='flex flex-row p-4 justify-between'>
                    <DialogTitle>{editMode ? 'Edit Bus' : 'Add Bus'}</DialogTitle>
                </div>
                <DialogContent>
                    {busDetails.route.map((route, index) => (
                        <div key={index} className="flex items-center mt-4">
                            <TextField
                                label={`Route ${index + 1}`}
                                value={route}
                                onChange={(e) => handleRouteChange(index, e.target.value)}
                                className="w-full"
                            />
                            {busDetails.route.length > 1 && (
                                <IconButton onClick={() => handleRemoveRoute(index)}>
                                    <CloseIcon />
                                </IconButton>
                            )}
                        </div>
                    ))}
                    <Button color="primary" startIcon={<AddIcon />} onClick={handleAddRoute} className="mt-4">
                        Add Route
                    </Button>
                    <TextField
                        label="Driver"
                        value={busDetails.driver}
                        onChange={(e) => setBusDetails({ ...busDetails, driver: e.target.value })}
                        className="mt-4 w-full"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveBus} color="primary">
                        {editMode ? 'Save Changes' : 'Add Bus'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminBusPage;
