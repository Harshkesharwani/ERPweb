import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, Typography, IconButton } from '@mui/material';
import { Close as CloseIcon, MoreHorizTwoTone as MoreHorizTwoToneIcon } from '@mui/icons-material';
import { url } from '../../Store/Config';

const AdminHostelPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openPendingRequests, setOpenPendingRequests] = useState(false);

    useEffect(() => {
        fetchHostelRequests();
    }, []);

    const fetchHostelRequests = async () => {
        try {
            const response = await fetch(`${url}/admin_hostel_applied_fetch`);
            const data = await response.json();
            setRequests(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching hostel requests:', error);
            setLoading(false);
        }
    };

    const handleDecision = async (status, request) => {
        try {
            const response = await fetch(`${url}/hostel_decision_update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status,
                    enrollment_or_employee_id: request.enrollment_or_employee_id,
                    building_name: request.building_name,
                    date_applied: request.date_applied,
                }),
            });

            if (response.ok) {
                const updatedRequests = requests.map((req) =>
                    req.enrollment_or_employee_id === request.enrollment_or_employee_id
                        ? { ...req, status }
                        : req
                );
                setRequests(updatedRequests);
            }
        } catch (error) {
            console.error('Error updating request status:', error);
        }
    };

    const handleOpenPendingRequests = () => setOpenPendingRequests(true);
    const handleClosePendingRequests = () => setOpenPendingRequests(false);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-row p-4 justify-between">
                <h2 className="text-2xl font-bold mb-4">Hostel Management</h2>
                <Button color="primary" startIcon={<MoreHorizTwoToneIcon />} onClick={handleOpenPendingRequests}>
                    Pending Requests
                </Button>
            </div>

            <Modal open={openPendingRequests} onClose={handleClosePendingRequests}>
                <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-1/2">
                    <div className="flex justify-between items-center mb-4">
                        <Typography variant="h6">Pending Hostel Requests</Typography>
                        <IconButton onClick={handleClosePendingRequests}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    {requests.status == 'Pending' ? (
                        <table className="min-w-full border border-gray-300 mx-auto">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Student Name</th>
                                    <th className="py-2 px-4 border-b">Parent Name</th>
                                    <th className="py-2 px-4 border-b">Phone Number</th>
                                    <th className="py-2 px-4 border-b">Building</th>
                                    <th className="py-2 px-4 border-b">Date Applied</th>
                                    <th className="py-2 px-4 border-b">Status</th>
                                    <th className="py-2 px-4 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((request, index) => (
                                    <tr key={index}>
                                        <td className="py-2 px-4 border-b">{request.name}</td>
                                        <td className="py-2 px-4 border-b">{request.parent_name}</td>
                                        <td className="py-2 px-4 border-b">{request.phone_number}</td>
                                        <td className="py-2 px-4 border-b">{request.building_name}</td>
                                        <td className="py-2 px-4 border-b">{request.date_applied}</td>
                                        <td className="py-2 px-4 border-b">{request.status}</td>
                                        <td className="py-2 px-4 border-b flex flex-row space-x-10">
                                            <Button color="primary" onClick={() => handleDecision('Approved', request)}>
                                                Approve
                                            </Button>
                                            <Button color="secondary" onClick={() => handleDecision('Declined', request)}>
                                                Decline
                                            </Button>
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
    );
};

export default AdminHostelPage;
