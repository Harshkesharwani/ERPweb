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
import moment from 'moment';
import { url } from '../../Store/Config';

const AdminHoliday = () => {
  const [holidays, setHolidays] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState({ id: null, name: '', date: '', day: '' });

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await fetch(`${url}/holidays`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ month: 'january' }),
      });
      const data = await response.json();
      console.log(data);
      setHolidays(data.holidays || []);
    } catch (error) {
      console.error('Error fetching holidays:', error);
    }
  };

  const handleOpenDialog = (holiday) => {
    setSelectedHoliday(holiday);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedHoliday({ id: null, name: '', date: '', day: '' });
    setDialogOpen(false);
  };

  const handleEditChange = (field, value) => {
    setSelectedHoliday({ ...selectedHoliday, [field]: value });
  };

  const handleSave = async () => {
    const { id, name, date, day } = selectedHoliday;

    if (name && date) {
      try {
        const method = selectedHoliday ? 'POST' : 'POST';
        const endpoint = id ? `${url}/admin_holidays_update` : `${url}/admin_holidays_create`;
        const response = await fetch(endpoint, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, date, day }),
        });
        if (response.ok) {
          fetchHolidays();
          handleCloseDialog();
        }
      } catch (error) {
        console.error('Error saving holiday:', error);
      }
    }
  };

  const handleDelete = async (data) => {
    if (window.confirm('Are you sure you want to delete this holiday?')) {
      try {
        const response = await fetch(`${url}/admin_holidays_delete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          fetchHolidays();
        }
      } catch (error) {
        console.error('Error deleting holiday:', error);
      }
    }
  };

  const columnDefs = [
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Date", field: "date", sortable: true, filter: true },
    { headerName: "Description", field: "dayOfWeek", sortable: true, filter: true },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <div className='m-2 flex justify-center items-center space-x-6'>
          <EditIcon
            onClick={() => handleOpenDialog(params.data)}
            className="text-yellow-500 cursor-pointer"
          />
          <DeleteIcon
            onClick={() => handleDelete(params.data)}
            className="text-red-500 cursor-pointer"
          />
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col items-center">
      <div className='flex flex-row space-x-6 m-4'>
        <h2 className="text-2xl font-bold mb-4">Admin Holiday</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog({ id: null, name: '', date: '', day: '' })}
          className="mb-4 text-2xl"
        >
          +
        </Button>
      </div>

      <div className="ag-theme-alpine" style={{ height: 400, width: '75%' }}>
        <AgGridReact
          rowData={holidays}
          columnDefs={columnDefs}
        />
      </div>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{selectedHoliday.id ? "Edit Holiday" : "Add Holiday"}</DialogTitle>
        <DialogContent>
          <div className="flex flex-col space-y-4 max-w-3xl mx-auto">
            <TextField
              label="Name"
              value={selectedHoliday.name}
              onChange={(e) => handleEditChange('name', e.target.value)}
              fullWidth
            />
            <TextField
              label="Date"
              type="date"
              value={selectedHoliday.date}
              onChange={(e) => handleEditChange('date', e.target.value)}
              fullWidth
            />
            <TextField
              label="Description"
              value={selectedHoliday.day}
              onChange={(e) => handleEditChange('day', e.target.value)}
              fullWidth
            />
          </div>
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

export default AdminHoliday;
