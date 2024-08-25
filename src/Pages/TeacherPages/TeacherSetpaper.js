import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, List, ListItem, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const demoPapers = [
    { id: 'P001', className: 'Class 1', examType: 'Final', fileName: 'Math_Final_Exam.pdf' },
    { id: 'P002', className: 'Class 2', examType: 'Half Year', fileName: 'English_HalfYear_Exam.pdf' },
    { id: 'P003', className: 'Class 3', examType: 'Quarterly', fileName: 'Science_Quarterly_Exam.pdf' }
];

const TeacherSetPaper = () => {
    const [papers, setPapers] = useState(demoPapers);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedExamType, setSelectedExamType] = useState('');
    const [uploadFile, setUploadFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [selectedPaper, setSelectedPaper] = useState(null);

    const handleUpload = () => {
        if (uploadFile && selectedClass && selectedExamType) {
            const newPaper = {
                id: `P${papers.length + 1}`,
                className: selectedClass,
                examType: selectedExamType,
                fileName: uploadFile.name
            };
            setPapers([...papers, newPaper]);
            setUploadDialogOpen(false);
            setUploadFile(null);
            setFileName('');
            setSelectedClass('');
            setSelectedExamType('');
        }
    };

    const handleViewClick = (paper) => {
        setSelectedPaper(paper);
        setViewDialogOpen(true);
    };

    const handleDeleteClick = (id) => {
        setPapers(papers.filter(paper => paper.id !== id));
    };

    return (
        <div className="p-4">
            <Typography variant="h4" gutterBottom>
                Teacher Set Papers Management
            </Typography>

            {/* Upload Paper Button */}
            <Button
                onClick={() => setUploadDialogOpen(true)}
                color="primary"
                variant="contained"
                className="mb-4"
                startIcon={<CloudUploadIcon />}
            >
                Upload Paper
            </Button>

            {/* List of Papers */}
            <Typography variant="h6" gutterBottom>
                Uploaded Papers
            </Typography>
            <List>
                {papers.map((paper) => (
                    <ListItem key={paper.id} className="mb-2">
                        <Card variant="outlined" className="w-full">
                            <CardContent>
                                <Typography variant="h6">Class: {paper.className}</Typography>
                                <Typography variant="body1">Exam Type: {paper.examType}</Typography>
                                <Typography variant="body1">File: {paper.fileName}</Typography>
                                <IconButton onClick={() => handleViewClick(paper)} color="primary" className="ml-2">
                                    <VisibilityIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteClick(paper.id)} color="secondary" className="ml-2">
                                    <DeleteIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                    </ListItem>
                ))}
            </List>

            {/* Upload Paper Dialog */}
            <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)}>
                <DialogTitle>Upload Exam Paper</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth variant="outlined" className="mt-2">
                        <InputLabel>Class</InputLabel>
                        <Select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            label="Class"
                        >
                            <MenuItem value="Class 1">Class 1</MenuItem>
                            <MenuItem value="Class 2">Class 2</MenuItem>
                            <MenuItem value="Class 3">Class 3</MenuItem>
                            {/* Add more classes as needed */}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth variant="outlined" className="mt-2">
                        <InputLabel>Exam Type</InputLabel>
                        <Select
                            value={selectedExamType}
                            onChange={(e) => setSelectedExamType(e.target.value)}
                            label="Exam Type"
                        >
                            <MenuItem value="Final">Final</MenuItem>
                            <MenuItem value="Half Year">Half Year</MenuItem>
                            <MenuItem value="Quarterly">Quarterly</MenuItem>
                            {/* Add more exam types as needed */}
                        </Select>
                    </FormControl>

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

            {/* View Paper Dialog */}
            <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)}>
                <DialogTitle>View Exam Paper</DialogTitle>
                <DialogContent>
                    <Typography variant="h6">Class: {selectedPaper?.className}</Typography>
                    <Typography variant="body1">Exam Type: {selectedPaper?.examType}</Typography>
                    <Typography variant="body1">File: {selectedPaper?.fileName}</Typography>
                    {/* You can provide a way to view or download the document here */}
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

export default TeacherSetPaper;
