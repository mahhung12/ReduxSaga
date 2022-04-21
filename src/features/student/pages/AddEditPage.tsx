import { Box, makeStyles, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StudentForm from '../components/StudentForm';

const useStyles = makeStyles(theme => ({
  root: {},

  backButton: {
    display: 'flex',
    alignItems: 'center',

    "&:hover": {
      opacity: '0.8',
    },
  }
}))

export default function AddEditPage() {
  const classes = useStyles();

  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    if (!studentId) return;

    // IFFE
    (async () => {
      try {
        const data: Student = await studentApi.getById(studentId);
        setStudent(data)
      } catch (error) {
        console.log('Failed to fetch student details', error);
      }
    })()
  }, [studentId])

  const handleStudentFormSubmit = (formValues: Student) => {
    // Handle Submit
  }

  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;


  return (
    <Box>
      <Link to="/admin/students">
        <Typography variant="caption" className={classes.backButton}>
          <ChevronLeft />  Back to Student Lists
        </Typography>
      </Link>

      <Box mt={2}>
        <Typography variant="h4">
          {isEdit ? 'Edit student information' : 'Add new Student'}
        </Typography>
      </Box>

      {(!isEdit || Boolean(student)) && (
        <Box mt={1}>
          <StudentForm
            initialValue={initialValues}
            onSubmit={handleStudentFormSubmit}
          />
        </Box>
      )}
    </Box>
  );
}
