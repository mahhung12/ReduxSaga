import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useAppSelector } from 'app/hooks';
import { InputField, SelectField } from 'components/FormFields';
import { RadioGroupField } from 'components/FormFields/RadioGroupField';
import { selectCityOption } from 'features/city/citySlice';
import { Student } from 'models';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

export interface StudentFormProps {
    initialValue?: Student;
    onSubmit?: (formValues: Student) => void;
    isEdit: boolean;
}

const schema = yup.object().shape({
    name: yup.string().required("Please enter name")
        .test('two-words', "Please enter at least 2 words", (value) => {
            if (!value) return true;
            const parts = value?.split(' ') || [];
            return parts.filter((x) => !!x)?.length >= 2;
        }),
    age: yup
        .number()
        .positive("Please enter a positive number")
        .integer("Please enter an integer")
        .min(18, "Min is 18")
        .max(60, "Max is 60")
        .required("Please enter age.")
        .typeError("Please enter a valid number"),
    mark: yup
        .number()
        .min(0, 'Min is 0')
        .max(10, 'Max is 10')
        .required("Please enter mark.")
        .typeError("Please enter a valid number"),
    gender: yup.string().oneOf(['male', 'female'], "Please select either male or female").required(),
    city: yup.string().required("Please select City"),
});

export default function StudentForm({ initialValue, onSubmit, isEdit }: StudentFormProps) {
    const cityOptions = useAppSelector(selectCityOption);
    const [error, setError] = useState<string>('');

    const { control, handleSubmit, formState: { isSubmitting } } = useForm<Student>({
        defaultValues: initialValue,
        resolver: yupResolver(schema)
    })

    const handleFormSubmit = async (formValues: Student) => {
        try {
            setError('');
            await onSubmit?.(formValues);
        } catch (e) {
            setError((e as Error).message);
            // console.log('Failed to add/update Student: ', error);
        }
    }

    return (
        <Box maxWidth={500}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                {/* FORM FIELD */}
                <InputField name="name" control={control} label="Full Name" />

                <RadioGroupField name="gender" control={control} label="Gender"
                    options={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                    ]}
                />

                <InputField name="age" control={control} label="Age" type="number" />

                <InputField name="mark" control={control} label="Mark" type="number" />


                {Array.isArray(cityOptions) && cityOptions.length > 0 && (
                    <SelectField name="city" control={control} label="City" options={cityOptions} />
                )}

                {error &&
                    <Alert severity="error">{error}</Alert>
                }

                <Box mt={2}>
                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                        {isSubmitting && <CircularProgress size={16} color="primary" />} &nbsp;
                        {isEdit ? 'Edit a Student' : 'Add new Student'}
                    </Button>
                </Box>
            </form>
        </Box>
    );
}       
