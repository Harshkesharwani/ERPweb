import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, List, ListItem, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, InputLabel } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const demoResults = [
    { id: 'S001', fileName: 'Math_Final_Grade.pdf' },
    { id: 'S002', fileName: 'English_HalfYear_Results.pdf' },
    { id: 'S003', fileName: 'Science_Quarterly_Results.pdf' }
];

const TeacherResult = () => {
    const [results, setResults] = useState(demoResults);
    const [studentId, setStudentId] = useState('');
    const [selectedResult, setSelectedResult] = useState(null);
    const [uploadFile, setUploadFile] = useState(null);
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);

    const handleUpload = () => {
        if (uploadFile && studentId) {
            const newResult = {
                id: studentId,
                fileName: uploadFile.name
            };
            setResults([...results, newResult]);
            setUploadDialogOpen(false);
            setUploadFile(null);
            setStudentId('');
        }
    };

    const handleViewClick = (result) => {
        setSelectedResult(result);
        setViewDialogOpen(true);
    };

    const handleDeleteClick = (id) => {
        setResults(results.filter(item => item.id !== id));
    };

    return (
        <div className="p-4">
            <Typography variant="h4" gutterBottom>
                Teacher Result Management
            </Typography>

            {/* Upload Result Button */}
            <Button
                onClick={() => setUploadDialogOpen(true)}
                color="primary"
                className="mb-4"
                startIcon={<CloudUploadIcon />}
            >
                Upload Result
            </Button>

            {/* Search by Student ID */}
            <TextField
                fullWidth
                label="Search by Student ID"
                variant="outlined"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="mb-4"
            />

            {/* Results List */}
            <Typography variant="h6" gutterBottom>
                Uploaded Results
            </Typography>
            <List>
                {results
                    .filter(result => result.id.includes(studentId)) // Filter results by student ID
                    .map((result) => (
                        <ListItem key={result.id} className="mb-2">
                            <Card variant="outlined" className="w-full">
                                <CardContent>
                                    <Typography variant="h6">Student ID: {result.id}</Typography>
                                    <Typography variant="body1">File: {result.fileName}</Typography>
                                    <IconButton onClick={() => handleViewClick(result)} color="primary" className="ml-2">
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteClick(result.id)} color="secondary" className="ml-2">
                                        <DeleteIcon />
                                    </IconButton>
                                </CardContent>
                            </Card>
                        </ListItem>
                    ))}
            </List>

            {/* Upload Result Dialog */}
            <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)}>
                <DialogTitle>Upload Student Result</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Student ID"
                        variant="outlined"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="mt-2"
                    />
                    <InputLabel className="mt-2">Upload File</InputLabel>
                    <input
                        type="file"
                        onChange={(e) => setUploadFile(e.target.files[0])}
                        className="mt-2"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setUploadDialogOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpload} color="primary">
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>

            {/* View Result Dialog */}
            <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)}>
                <DialogTitle>View Result</DialogTitle>
                <DialogContent>
                    <Typography variant="h6">Student ID: {selectedResult?.id}</Typography>
                    <Typography variant="body1">File: {selectedResult?.fileName}</Typography>
                    {/* Assuming you would provide a way to view the document, such as an iframe or download link */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewDialogOpen(false)} color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TeacherResult;
