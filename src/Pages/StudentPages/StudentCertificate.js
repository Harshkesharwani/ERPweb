import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Paper, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const StudentCertificate = () => {
    const [certificates, setCertificates] = useState([]);
    const [filteredCertificates, setFilteredCertificates] = useState([]);
    const [studentClass, setStudentClass] = useState('');

    useEffect(() => {
        // Fetch certificates data from an API or use static data for demonstration
        const fetchCertificates = async () => {
            // Example static data
            const data = [
                { id: 1, class: '10', name: 'Math Certificate', url: '/certificates/math_cert.pdf' },
                { id: 2, class: '10', name: 'Science Certificate', url: '/certificates/science_cert.pdf' },
                { id: 3, class: '12', name: 'History Certificate', url: '/certificates/history_cert.pdf' },
                // Add more certificates as needed
            ];
            setCertificates(data);
        };

        fetchCertificates();
    }, []);

    const handleClassChange = (e) => {
        setStudentClass(e.target.value);
    };

    const handleFilter = () => {
        if (studentClass.trim()) {
            const filtered = certificates.filter(cert => cert.class === studentClass.trim());
            setFilteredCertificates(filtered);
        } else {
            alert('Please enter a class.');
        }
    };

    const handlePreview = (url) => {
        window.open(url, '_blank');
    };

    return (
        <Box className="p-4">
            <Typography variant="h4" gutterBottom>Student Certificates</Typography>
            <Paper elevation={3} className="p-4 mb-4 flex flex-row">
                <TextField
                    value={studentClass}
                    onChange={handleClassChange}
                    label="Enter Class"
                    variant="outlined"
                    fullWidth
                />
                <Button
                    onClick={handleFilter}
                    color="primary"
                    className="mt-4 "
                >
                    Filter Certificates
                </Button>
            </Paper>
            <Paper elevation={3} className="p-4">
                <List>
                    {filteredCertificates.length > 0 ? filteredCertificates.map(({ id, name, url }) => (
                        <ListItem key={id} divider>
                            <ListItemText
                                primary={name}
                                onClick={() => handlePreview(url)}
                                style={{ cursor: 'pointer' }}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="download" href={url} download>
                                    <DownloadIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )) : <Typography>No certificates available for this class.</Typography>}
                </List>
            </Paper>
        </Box>
    );
};

export default StudentCertificate;
