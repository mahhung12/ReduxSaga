import { Box, Button } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { InputField, SelectField } from 'components/FormFields';
import { RadioGroupField } from 'components/FormFields/RadioGroupField';
import { selectCityOption } from 'features/city/citySlice';
import { Student } from 'models';
import { useForm } from 'react-hook-form';

export interface StudentFormProps {
    initialValue?: Student;
    onSubmit?: (formValues: Student) => void;
}

export default function StudentForm({ initialValue, onSubmit }: StudentFormProps) {
    const cityOptions = useAppSelector(selectCityOption);

    const { control, handleSubmit } = useForm<Student>({
        defaultValues: initialValue,
    })

    const handleFormSubmit = (form: Student) => {
        console.log(form)
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

                <SelectField name="city" control={control} label="City" options={cityOptions} />

                <Box mt={2}>
                    <Button type="submit" variant="contained" color="primary">Save</Button>
                </Box>
            </form>
        </Box>
    );
}       
