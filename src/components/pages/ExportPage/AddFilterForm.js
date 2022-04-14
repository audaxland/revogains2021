import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import FieldsSelect from "./FieldsSelect";
import {useState} from "react";

const AddFilterForm = ({fieldsDetails, setFilters}) => {
    const [field, setField] = useState('');
    const [operator, setOperator] = useState('');
    const [value, setValue] = useState('');

    const rulesAvailable = ['=', '<', '<=', '>', '>=', '!=', 'contains', 'start with', 'ends with'];

    const canSubmit = field.length && operator.length && value.length;

    const onSubmit = e => {
        if (canSubmit) {
            setFilters(old => [...old, {field, operator, value}]);
        }
        setField('');
        setOperator('');
        setValue('');
    }

    return (
        <Box sx={{display: 'flex', alignItems: 'center', '& > *': {display: 'flex', marginRight: '1em'}}}>
            <FieldsSelect fieldsDetails={fieldsDetails} value={field} onChange={e => setField(e.target.value)} label='Choose a field' />
            <FormControl sx={{minWidth: '10em', marginRight: '1em'}} >
                <InputLabel
                    id="select-rule"
                    sx={{background: 'white', padding: '0 0.5em'}}
                >
                    Choose a rule
                </InputLabel>
                <Select
                    labelId="select-rule"
                    onChange={e => setOperator(e.target.value)}
                    value={operator}
                    sx={{flex: 1}}
                >
                    {rulesAvailable.map(comparator => (
                        <MenuItem value={comparator} key={comparator}>
                            {comparator}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl>
                <TextField labelId="select-rule" label='Value' value={value} onChange={e => setValue(e.target.value)}/>
            </FormControl>
            <Button variant='contained' disabled={!canSubmit} onClick={onSubmit}>Add Filter</Button>
        </Box>
    );
};

export default AddFilterForm;