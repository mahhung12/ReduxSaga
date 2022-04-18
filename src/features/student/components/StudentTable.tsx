import * as React from 'react';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@material-ui/core'
import { Student } from 'models';
import { capitalizeString, getMarkColor } from 'utils';

const useStyles = makeStyles(theme => ({
    table: {},
    edit: {
        marginRight: theme.spacing(1)
    }
}))

export interface StudentTableProps {
    studentList: Student[];
    onEdit?: (student: Student) => void,
    onRemove?: (student: Student) => void,
}

export default function StudentTable({ studentList, onEdit, onRemove }: StudentTableProps) {
    const classes = useStyles();

    return (
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
                            <TableCell>{student.city}</TableCell>
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
                                    onClick={() => onRemove?.(student)}
                                >
                                    Remove
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
