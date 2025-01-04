import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, List, ListItem, InputLabel } from '@mui/material';

// Demo data
const demoCertificates = [
    { id: 1, studentId: 'S001', certificateName: 'Math Olympiad Certificate', file: '/path/to/certificate1.pdf' },
    { id: 2, studentId: 'S002', certificateName: 'Science Fair Certificate', file: '/path/to/certificate2.pdf' },
    { id: 3, studentId: 'S003', certificateName: 'History Quiz Certificate', file: '/path/to/certificate3.pdf' },
];

const TeacherCertificate = () => {
    const [certificates, setCertificates] = useState(demoCertificates);
    const [studentId, setStudentId] = useState('');
    const [certificateName, setCertificateName] = useState('');
    const [searchId, setSearchId] = useState('');

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // For demonstration, just log the file
            console.log('Uploaded file:', file);
            // Implement file upload logic here
        }
    };

    const handleSearchChange = (event) => {
        setSearchId(event.target.value);
    };

    const handleSearchSubmit = () => {
        const foundCertificate = certificates.find(certificate => certificate.studentId === searchId);
        // Additional logic if needed
    };

    const handleUploadSubmit = () => {
        const newCertificate = {
            id: certificates.length + 1,
            studentId,
            certificateName,
            file: 'uploaded_certificate.pdf' // Placeholder for the uploaded file
        };
        setCertificates([...certificates, newCertificate]);
        // Clear the form
        setStudentId('');
        setCertificateName('');
    };

    const handleViewDocument = (filePath) => {
        window.open(filePath, '_blank'); // Opens the PDF in a new tab
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Certificate</h1>
            {/* Upload Form */}
            <Card variant="outlined" className="mb-4">
                <CardContent>
                    <Typography variant="h6">Upload Certificate</Typography>
                    <TextField
                        fullWidth
                        label="Student ID"
                        variant="outlined"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="mt-2"
                    />
                    <TextField
                        fullWidth
                        label="Certificate Name"
                        variant="outlined"
                        value={certificateName}
                        onChange={(e) => setCertificateName(e.target.value)}
                        className="mt-2"
                    />
                    <InputLabel className="mt-2">Upload File</InputLabel>
                    <input type="file" onChange={handleFileUpload} />
                    <Button
                        onClick={handleUploadSubmit}
                        color="primary"
                        className="mt-2"
                    >
                        Upload Certificate
                    </Button>
                </CardContent>
            </Card>

            {/* Search Form */}
            <Card variant="outlined" className="mb-4">
                <CardContent>
                    <Typography variant="h6">Search Certificate by Student ID</Typography>
                    <TextField
                        fullWidth
                        label="Student ID"
                        variant="outlined"
                        value={searchId}
                        onChange={handleSearchChange}
                    />
                    <Button
                        onClick={handleSearchSubmit}
                        color="primary"
                        className="mt-2"
                    >
                        Search
                    </Button>
                </CardContent>
            </Card>

            {/* Certificate List */}
            <Typography variant="h6" gutterBottom>
                Certificate List
            </Typography>
            <List>
                {certificates.map((certificate) => (
                    <ListItem key={certificate.id} button onClick={() => handleViewDocument(certificate.file)}>
                        <Card variant="outlined" className="w-full">
                            <CardContent>
                                <Typography variant="h6">Student ID: {certificate.studentId}</Typography>
                                <Typography variant="body1">Certificate Name: {certificate.certificateName}</Typography>
                                <Typography variant="body1">File: {certificate.file}</Typography>
                            </CardContent>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default TeacherCertificate;
