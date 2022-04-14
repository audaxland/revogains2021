import {useState} from "react";
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import FieldsSelect from "./FieldsSelect";

const AddFieldForm = ({ setFieldsList, fieldsDetails}) => {
    const [currentField, setCurrentField] = useState('');
    const [currentAs, setCurrentAs] = useState('');

    const onChange = e => {
        const newValue = e.target.value;
        setCurrentField(newValue);
        setCurrentAs(newValue);
    }

    const onAdd = e => {
        setFieldsList(old => [...old, {field: currentField, name: currentAs}]);
        setCurrentField('');
        setCurrentAs('');
    }

    return (
        <Box sx={{display: 'flex', alignItems: 'center', padding: '1em', '& > *': {display: 'flex', marginRight: '1em'}}}>
            <FieldsSelect fieldsDetails={fieldsDetails} onChange={onChange} value={currentField} />
            <Typography sx={{display: 'block'}}>
                as
            </Typography>
            <TextField
                variant="outlined"
                label="Choose export Name"
                value={currentAs}
                onChange={e => setCurrentAs(e.target.value)}
            />
            <Button
                variant='contained'
                onClick={onAdd}
                disabled={(!currentField) || (!currentAs)}
            >
                Add Field
            </Button>
        </Box>
    )
}

export default AddFieldForm;