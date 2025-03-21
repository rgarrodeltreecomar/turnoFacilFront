import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


export const useForm = <T extends object>(initialState: T) => {

    const [formValues, setFormValues] = useState(initialState);

    const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;

        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSelectChange = ({ target }: SelectChangeEvent) => {
        const { name, value } = target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleYearChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;

        if (/^\d*$/.test(value) && value.length <= 4) {
            setFormValues({
                ...formValues,
                [name]: value
            });
        }
    };

    const generateId = () => uuidv4();

    const handleCheckboxChange = ({ target }: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const { name } = target;
        setFormValues({
            ...formValues,
            [name]: checked
        });
    }

    const reset = () => {
        setFormValues(initialState);
    }

    const handleFormValueChange = (key: string, value: string) => {
        setFormValues({
            ...formValues,
            [key]: value
        })
    }

    return {
        formValues,
        handleInputChange,
        handleSelectChange,
        setFormValues,
        reset,
        handleYearChange,
        handleFormValueChange,
        handleCheckboxChange,
        generateId,
        ...formValues
    }
};