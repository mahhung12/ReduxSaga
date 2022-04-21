import { Box, Button } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { InputField, SelectField } from 'components/FormFields';
import { RadioGroupField } from 'components/FormFields/RadioGroupField';
import { selectCityOption } from 'features/city/citySlice';
import { Student } from 'models';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

export interface StudentFormProps {
    initialValue?: Student;
    onSubmit?: (formValues: Student) => void;
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

export default function StudentForm({ initialValue, onSubmit }: StudentFormProps) {
    const cityOptions = useAppSelector(selectCityOption);

    const { control, handleSubmit } = useForm<Student>({
        defaultValues: initialValue,
        resolver: yupResolver(schema)
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
