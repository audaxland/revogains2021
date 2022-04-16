import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import FormGroupBox from "./FormGroupBox";

const OptionSetting = ({
    label = '',
    update,
    defaultValue = '',
    pattern = null,
    name,
    order= 10
}) => {
    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState(String(defaultValue));

    useEffect(() => {
        update(name, checked && value.length ? {name, value, order} : null);
    }, [checked, value]);

    const handleCheckChange = e => {
        setChecked(e.target.checked);
    }

    const handelValueChange = e => {
        if (!checked) return;
        const newValue = e.target.value;

        if (newValue.length && pattern && (!(new RegExp('^' + pattern + '$')).test(newValue))) {
            return false;
        }
        setValue(newValue);
    }

    return (
        <FormGroupBox>
            <FormControlLabel control={<Checkbox checked={checked} onChange={handleCheckChange}/>} label={label} />
            <TextField value={value} onChange={handelValueChange} disabled={!checked} />
        </FormGroupBox>
    )
}

export default OptionSetting;