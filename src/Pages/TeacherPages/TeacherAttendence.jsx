import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Paper, Typography } from '@mui/material';
import { AgCharts } from 'ag-charts-react';
import { url } from '../../Store/Config';

const localizer = momentLocalizer(moment);

const TeacherAttendence = () => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [attendanceData, setAttendanceData] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState('');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    if (studentId) {
      handleDayPress(selectedDate);
    }
  }, [studentId]);

  const getUserProfile = async () => {
    try {
      const userProfile = await localStorage.getItem('userProfile');
      if (userProfile) {
        const parsedProfile = JSON.parse(userProfile);
        setStudentId(parsedProfile["enrollment_or_employee_id"]);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleDayPress = async (date) => {
    try {
      const response = await fetch(`${url}/attendance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: date,
          student_id: studentId,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.Error) {
          alert("No data found");
        } else {
          setAttendanceData(data.attendance);
          setSelectedDate(date);
          updateChartData(data.attendance);
          setAttendanceStatus(data.attendance.status); // Update the attendance status for the selected date
        }
      } else {
        alert('No data found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateChartData = (attendance) => {
    const presentCount = attendance.filter(item => item.status === 'Present').length;
    const absentCount = attendance.filter(item => item.status === 'Absent').length;

    setChartData([
      { label: 'Present', value: presentCount },
      { label: 'Absent', value: absentCount },
    ]);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
      <h1 className="text-3xl font-bold mb-6">Attendance</h1>
      <div className="flex flex-row w-full max-w-8xl space-x-6">
        {/* Calendar */}
        <Calendar
          localizer={localizer}
          events={[]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '700px', width: '100%' }}
          selectable
          onSelectSlot={(slotInfo) => handleDayPress(slotInfo.start)}
        />

        <Box className="flex flex-col w-1/3 space-y-4">
          {/* Pie Chart for Monthly Attendance */}
          <Paper className="p-4 bg-white rounded shadow-md">
            <Typography variant="h6" component="h3" className="font-bold mb-4">
              Monthly Attendance
            </Typography>
            <AgCharts options={chartOptions} />
          </Paper>

          {/* Attendance Status Display */}
          {attendanceData && (
            <Paper className="p-4 bg-white rounded shadow-md cursor-pointer" onClick={handleOpenModal}>
              <Typography variant="h6" component="h3" className="font-bold">
                Attendance Status
              </Typography>
              <Typography><strong>Date:</strong> {moment(selectedDate).format('YYYY-MM-DD')}</Typography>
              <Typography><strong>Status:</strong> {attendanceStatus}</Typography>
            </Paper>
          )}
        </Box>
      </div>

      {/* Modal for Viewing Attendance */}
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Attendance Details</DialogTitle>
        <DialogContent>
          <Typography><strong>Date:</strong> {moment(selectedDate).format('YYYY-MM-DD')}</Typography>
          <Typography><strong>Status:</strong> {attendanceStatus}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TeacherAttendence;
