import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Paper, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const StudentResult = () => {
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [studentClass, setStudentClass] = useState('');

    useEffect(() => {
        // Fetch results data from an API or use static data for demonstration
        const fetchResults = async () => {
            // Example static data
            const data = [
                { id: 1, class: '10', name: 'Math Results', url: '/results/math_results.pdf' },
                { id: 2, class: '10', name: 'Science Results', url: '/results/science_results.pdf' },
                { id: 3, class: '12', name: 'History Results', url: '/results/history_results.pdf' },
                // Add more results as needed
            ];
            setResults(data);
        };

        fetchResults();
    }, []);

    const handleClassChange = (e) => {
        setStudentClass(e.target.value);
    };

    const handleFilter = () => {
        if (studentClass.trim()) {
            const filtered = results.filter(result => result.class === studentClass.trim());
            setFilteredResults(filtered);
        } else {
            alert('Please enter a class.');
        }
    };

    const handlePreview = (url) => {
        window.open(url, '_blank');
    };

    return (
        <Box className="p-4">
            <Typography variant="h4" gutterBottom>Student Results</Typography>
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
                    className="mt-4"
                >
                    Filter Results
                </Button>
            </Paper>
            <Paper elevation={3} className="p-4">
                <List>
                    {filteredResults.length > 0 ? filteredResults.map(({ id, name, url }) => (
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
                    )) : <Typography>No results available for this class.</Typography>}
                </List>
            </Paper>
        </Box>
    );
};

export default StudentResult;
