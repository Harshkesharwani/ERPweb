import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import { url } from '../../Store/Config';

const AdminLeave = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaveRequests();
    }, []);

    const fetchLeaveRequests = async () => {
        const todayDate = new Date().toISOString().split('T')[0];
        console.log(todayDate);
        try {
            const response = await fetch(`${url}/admin_leaves_fetch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: todayDate,
                }),
            });
            const data = await response.json();
            setLeaveRequests(data.leaves || []);
        } catch (error) {
            console.error('Error fetching leave requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (status, leave) => {
        try {
            const response = await fetch(`${url}/admin_leaves_update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: leave.id,
                    from_date: leave.startDate,
                    to_date: leave.endDate,
                    status: status,
                }),
            });
            if (response.ok) {
                fetchLeaveRequests(); // Refresh the list after action
            } else {
                console.log(`Failed to ${status} leave`);
            }
        } catch (error) {
            console.error(`Error handling leave action (${status}):`, error);
        }
    };

    const handleApprove = (leave) => handleAction('Approved', leave);
    const handleDecline = (leave) => handleAction('Declined', leave);

    const columnDefs = [
        { headerName: "Employee Name", field: "employeeName", sortable: true, filter: true },
        { headerName: "Employee Id", field: "Id", sortable: true, filter: true },
        { headerName: "Leave Type", field: "type", sortable: true, filter: true },
        { headerName: "Start Date", field: "from_date", sortable: true, filter: true },
        { headerName: "End Date", field: "to_date", sortable: true, filter: true },
        { headerName: "Reason", field: "reason", sortable: true, filter: true },
        { headerName: "Status", field: "status", sortable: true, filter: true },
        {
            headerName: "Actions",
            cellRendererFramework: (params) => (
                <div className='flex justify-center items-center space-x-4'>
                    <CheckIcon
                        onClick={() => handleApprove(params.data)}
                        className="text-green-500 cursor-pointer"
                    />
                    <CloseIcon
                        onClick={() => handleDecline(params.data)}
                        className="text-red-500 cursor-pointer"
                    />
                </div>
            ),
        }
    ];

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row justify-between items-center p-4">
                <h2 className="text-2xl font-bold mb-4">Leaves</h2>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <CircularProgress />
                </div>
            ) : (
                <div className="ag-theme-alpine" style={{ height: 400, width: '75%' }}>
                    <AgGridReact
                        rowData={leaveRequests}
                        columnDefs={columnDefs}
                    />
                </div>
            )}
        </div>
    );
};

export default AdminLeave;
