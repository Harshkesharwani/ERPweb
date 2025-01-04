import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { CloudUpload as CloudUploadIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const initialData = {
    '123': { name: 'Certificate123.pdf', file: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf', examType: 'Final', class: '10' },
    '456': { name: 'Certificate456.pdf', file: null, examType: 'Half Year', class: '12' },
    '789': { name: 'Certificate789.pdf', file: null, examType: 'Quarterly', class: '11' },
};

const examTypes = ['Final', 'Half Year', 'Quarterly'];
const classes = ['10', '11', '12'];

const AdminCertificate = () => {
    const [studentId, setStudentId] = useState('');
    const [certificates, setCertificates] = useState(initialData);
    const [file, setFile] = useState(null);
    const [examType, setExamType] = useState('Final');
    const [classValue, setClassValue] = useState('10');
    const [open, setOpen] = useState(false);

    const handleFetchCertificate = () => {
        if (certificates[studentId]) {
            alert('Certificate fetched successfully');
        } else {
            alert('No certificate found for this student ID');
        }
    };

    const handleAddCertificate = () => {
        if (file) {
            const newCertificates = { ...certificates, [studentId]: { name: file.name, file: URL.createObjectURL(file), examType, class: classValue } };
            setCertificates(newCertificates);
            setFile(null);
            setOpen(false);
            alert('Certificate added successfully');
        }
    };

    const handleReplaceCertificate = () => {
        if (file) {
            const newCertificates = { ...certificates, [studentId]: { name: file.name, file: URL.createObjectURL(file), examType, class: classValue } };
            setCertificates(newCertificates);
            setFile(null);
            setOpen(false);
            alert('Certificate replaced successfully');
        }
    };

    const handleDeleteCertificate = () => {
        const newCertificates = { ...certificates };
        delete newCertificates[studentId];
        setCertificates(newCertificates);
        alert('Certificate deleted successfully');
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Certificates</h2>
            <div className="flex mb-4">
                {/* Left side content */}
                <div className="flex-1 pr-4 space-y-4">
                    <TextField
                        label="Student ID"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="mb-4 w-full"
                    />
                    <FormControl fullWidth className="mb-4">
                        <InputLabel>Exam Type</InputLabel>
                        <Select
                            value={examType}
                            onChange={(e) => setExamType(e.target.value)}
                            label="Exam Type"
                        >
                            {examTypes.map((type) => (
                                <MenuItem key={type} value={type}>{type}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth className="mb-4">
                        <InputLabel>Class</InputLabel>
                        <Select
                            value={classValue}
                            onChange={(e) => setClassValue(e.target.value)}
                            label="Class"
                        >
                            {classes.map((cls) => (
                                <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className='flex space-x-4'>
                        <Button variant="contained" color="primary" onClick={handleFetchCertificate} className="mb-4">
                            Fetch Certificate
                        </Button>
                        <Button variant="contained" color="primary" startIcon={<CloudUploadIcon />} onClick={() => setOpen(true)}>
                            Add Certificate
                        </Button>
                    </div>

                    {certificates[studentId] && (
                        <div className='flex flex-col'>
                            <h3 className="text-xl font-semibold mb-2">Certificate Actions</h3>
                            <div className="flex space-x-2 mb-4">
                                <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={handleDeleteCertificate}>
                                    Delete
                                </Button>
                                <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={() => setOpen(true)}>
                                    Replace
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right side PDF viewer */}
                <div className="flex-1">
                    {certificates[studentId] && certificates[studentId].file && (
                        <div className="flex justify-center">
                            <object
                                data={certificates[studentId].file}
                                type="application/pdf"
                                width="800"
                                height="600"
                            >
                                <p>PDF preview is not available.</p>
                            </object>
                        </div>
                    )}
                </div>
            </div>

            <Dialog open={open} onClose={() => setOpen(false)} >
                <DialogTitle>{certificates[studentId] ? 'Replace' : 'Add'} Certificate</DialogTitle>
                <DialogContent className="p-5 flex flex-col space-y-6">
                    <FormControl fullWidth className="mb-4">
                        <TextField
                            label="Student ID"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            className="w-full"
                        />
                    </FormControl>
                    <FormControl fullWidth className="mb-4">
                        <InputLabel>Exam Type</InputLabel>
                        <Select
                            value={examType}
                            onChange={(e) => setExamType(e.target.value)}
                            label="Exam Type"
                        >
                            {examTypes.map((type) => (
                                <MenuItem key={type} value={type}>{type}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth className="mb-4">
                        <InputLabel>Class</InputLabel>
                        <Select
                            value={classValue}
                            onChange={(e) => setClassValue(e.target.value)}
                            label="Class"
                        >
                            {classes.map((cls) => (
                                <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="mt-4 w-full"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={certificates[studentId] ? handleReplaceCertificate : handleAddCertificate} color="primary">
                        {certificates[studentId] ? 'Replace' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminCertificate;
