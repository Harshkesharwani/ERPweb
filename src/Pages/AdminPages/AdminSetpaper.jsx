import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { CloudUpload as CloudUploadIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const initialData = {
    'Math-101': { name: 'Paper101.pdf', file: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
    'Science-102': { name: 'Paper102.pdf', file: null },
    'History-103': { name: 'Paper103.pdf', file: null },
};

const AdminSetpaper = () => {
    const [classId, setClassId] = useState('');
    const [subject, setSubject] = useState('');
    const [papers, setPapers] = useState(initialData);
    const [file, setFile] = useState(null);
    const [open, setOpen] = useState(false);

    const generatePaperKey = () => `${subject}-${classId}`;

    const handleFetchPaper = () => {
        const paperKey = generatePaperKey();
        if (papers[paperKey]) {
            alert('Paper fetched successfully');
        } else {
            alert('No paper found for this class and subject');
        }
    };

    const handleAddPaper = () => {
        if (file) {
            const paperKey = generatePaperKey();
            const newPapers = { ...papers, [paperKey]: { name: file.name, file: URL.createObjectURL(file) } };
            setPapers(newPapers);
            setFile(null);
            setOpen(false);
            alert('Paper added successfully');
        }
    };

    const handleReplacePaper = () => {
        if (file) {
            const paperKey = generatePaperKey();
            const newPapers = { ...papers, [paperKey]: { name: file.name, file: URL.createObjectURL(file) } };
            setPapers(newPapers);
            setFile(null);
            setOpen(false);
            alert('Paper replaced successfully');
        }
    };

    const handleDeletePaper = () => {
        const paperKey = generatePaperKey();
        const newPapers = { ...papers };
        delete newPapers[paperKey];
        setPapers(newPapers);
        alert('Paper deleted successfully');
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Set Paper</h2>
            <div className="flex mb-4">
                {/* Left side content */}
                <div className="flex-1 pr-4 space-y-4">
                    <TextField
                        label="Class"
                        value={classId}
                        onChange={(e) => setClassId(e.target.value)}
                        className="mb-4 w-full"
                    />
                    <TextField
                        label="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="mb-4 w-full"
                    />
                    <div className='flex space-x-10'>
                        <Button variant="contained" color="primary" onClick={handleFetchPaper} className="mb-4">
                            Search
                        </Button>
                        <Button variant="contained" color="primary" startIcon={<CloudUploadIcon />} onClick={() => setOpen(true)}>
                            Add Paper
                        </Button>
                    </div>

                    {papers[generatePaperKey()] && (
                        <div className='flex flex-col'>
                            <h3 className="text-xl font-semibold mb-2">Paper Actions</h3>
                            <div className="flex flex-row space-x-2 mb-4">
                                <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={handleDeletePaper}>
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
                    {papers[generatePaperKey()] && papers[generatePaperKey()].file && (
                        <div className="flex justify-center">
                            <object
                                data={papers[generatePaperKey()].file}
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

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{papers[generatePaperKey()] ? 'Replace' : 'Add'} Paper</DialogTitle>
                <DialogContent>
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
                    <Button onClick={papers[generatePaperKey()] ? handleReplacePaper : handleAddPaper} color="primary">
                        {papers[generatePaperKey()] ? 'Replace' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminSetpaper;
