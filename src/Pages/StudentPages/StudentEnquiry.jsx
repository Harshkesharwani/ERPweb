import React, { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import { url } from '../../Store/Config';

const StudentEnquiry = () => {
    const [name, setName] = useState('');
    const [classes, setClasses] = useState('');
    const [section, setSection] = useState('');
    const [parentName, setParentName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [enquiries, setEnquiries] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newEnquiry, setNewEnquiry] = useState('');

    const fetchEnquiries = async (studid) => {
        try {
            const response = await fetch(`${url}/admin_enquiry_fetch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    enrollment_or_employee_id: studid,
                }),
            });
            const data = await response.json();
            const formattedEnquiries = data.data.map((enquiry, index) => ({
                id: `${index + 1}`,
                enquiry: `Enquiry: ${enquiry.Message}`,
                response: enquiry.message_replied ? `Response: ${enquiry.message_replied}` : 'No response yet',
            }));
            setEnquiries(formattedEnquiries);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    const fetchUserProfile = async () => {
        const userProfile = localStorage.getItem('userProfile');
        if (userProfile) {
            const parsedProfile = JSON.parse(userProfile);
            fetchEnquiries(parsedProfile["enrollment_or_employee_id"]);
            setClasses(parsedProfile.Class);
            setSection(parsedProfile.section_or_department);
            setName(parsedProfile.Name);
            setParentName(parsedProfile.father_name);
            setPhoneNumber(parsedProfile.phone);
        }
    };

    const sendMessage = async () => {
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        const userProfile = localStorage.getItem('userProfile');
        if (userProfile) {
            const parsedProfile = JSON.parse(userProfile);
            const studid = parsedProfile["enrollment_or_employee_id"];

            try {
                const response = await fetch(`${url}/enquiry`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        date: currentDate,
                        student_id: studid,
                        student_name: name,
                        class: classes,
                        section: section,
                        parent_name: parentName,
                        contact_number: phoneNumber,
                        message: newEnquiry,
                    }),
                });

                if (response.ok) {
                    alert("Success! Enquiry sent successfully!");
                    setModalVisible(false); // Close the modal on success
                    fetchEnquiries(studid); // Refresh the enquiries list
                } else {
                    alert("Failed to send enquiry. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred. Please try again.");
            }
        }
    };

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setNewEnquiry(''); // Reset the enquiry input field
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <Box className="p-4 mt-4">
            <div className='flex flex-row justify-between align-center'>
                <h1 className="text-3xl font-bold mb-6">Enquires</h1>
                <Button color="primary" onClick={handleOpenModal}>+ Add Enquiry</Button>
            </div>
            <Paper elevation={3} className="p-4 mb-4 mt-4">
                <List>
                    {enquiries.map(({ id, enquiry, response }) => (
                        <ListItem key={id} divider>
                            <ListItemText
                                primary={enquiry}
                                secondary={response}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>

            <Dialog open={modalVisible} onClose={handleCloseModal}>
                <DialogTitle>Add Enquiry</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="enquiry"
                        label="Your Enquiry"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={newEnquiry}
                        onChange={(e) => setNewEnquiry(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="secondary">Cancel</Button>
                    <Button onClick={sendMessage} color="primary">Send</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default StudentEnquiry;
