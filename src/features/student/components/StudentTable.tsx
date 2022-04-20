import React, { useState } from 'react';
import {
    makeStyles, Table, TableBody,
    TableCell, TableContainer, TableHead,
    TableRow, Paper, Button, Box,
    Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle
} from '@material-ui/core';
import { City, Student } from 'models';
import { capitalizeString, getMarkColor } from 'utils';

const useStyles = makeStyles(theme => ({
    table: {},
    edit: {
        marginRight: theme.spacing(1)
    }
}))

export interface StudentTableProps {
    studentList: Student[];
    cityMap: {
        [key: string]: City,
    },
    onEdit?: (student: Student) => void,
    onRemove?: (student: Student) => void,
}

export default function StudentTable({ studentList, cityMap, onEdit, onRemove }: StudentTableProps) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student>();

    const handleClose = () => {
        setOpen(false);
    };

    const handleRemoveClick = (student: Student) => {
        // Set Selected student
        // Show confirm dialog
        setSelectedStudent(student)
        setOpen(true);
    }

    const handleRemoveConfirm = (student: Student) => {
        // Call onRemove
        // Hide dialog
        onRemove?.(student);
        setOpen(false);
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Mark</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {studentList.map((student, idx) => (
                            <TableRow key={student.id}>
                                <TableCell>{idx + 1}</TableCell>
                                <TableCell width={310}>{student.id}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{capitalizeString(student.gender)}</TableCell>
                                <TableCell>
                                    <Box color={getMarkColor(student.mark)} fontWeight="bold">
                                        {student.mark}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    {cityMap[student.city]?.name}
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        size="small"
                                        className={classes.edit}
                                        color="primary"
                                        onClick={() => onEdit?.(student)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="small"
                                        color="secondary"
                                        onClick={() => handleRemoveClick?.(student)}
                                    >
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Remove Dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Remove a Student?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to remove Student named "{selectedStudent?.name}". <br />
                        This action can&apos;t be undo.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="default"
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => handleRemoveConfirm(selectedStudent as Student)}
                        color="secondary"
                        variant="contained"
                        autoFocus
                    >
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
