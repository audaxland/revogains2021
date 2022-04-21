import FormGroupBox from "./FormGroupBox";
import FieldsSelect from "./FieldsSelect";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";
import {SORT_ASC, SORT_DESC} from "../../../lib/constants";

const AddOrderByForm = ({fieldsDetails, setOderBy}) => {
    const [field, setField] = useState('');
    const [direction, setDirection] = useState(SORT_ASC);

    const onSubmit = e => {
        if (!field) return;
        setOderBy(old => [...old, {field, direction, priority: old.length + 1}]);
        setField('');
        setDirection(SORT_ASC);
    }

    return (
        <FormGroupBox>
            <FieldsSelect
                fieldsDetails={fieldsDetails}
                value={field}
                onChange={e => setField(e.target.value)}
                label='Choose a field'
                sx={{marginRight: '1em'}}
            />
            <FormControl sx={{minWidth: '10em', marginRight: '1em'}} >
                <InputLabel
                    id="select-order-by"
                    sx={{background: 'white', padding: '0 0.5em'}}
                >
                    Sort Direction
                </InputLabel>
                <Select
                    labelId="select-order-by"
                    onChange={e => setDirection(e.target.value)}
                    value={direction}
                    sx={{flex: 1}}
                >
                    {[SORT_ASC, SORT_DESC].map(comparator => (
                        <MenuItem value={comparator} key={comparator}>
                            {comparator}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant='contained' disabled={!field} onClick={onSubmit}>Add Order By</Button>
        </FormGroupBox>
    )
};

export default AddOrderByForm;