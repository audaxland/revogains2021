import {FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";

const FieldsSelect = ({fieldsDetails, value, onChange, label= 'Choose a field', sx = {}}) => {

    return (
        <FormControl sx={{minWidth: '15em', ...sx}} >
            <InputLabel
                id="select-field"
                sx={{background: 'white', padding: '0 0.5em'}}
            >{label}</InputLabel>
            <Select
                labelId="select-field"
                onChange={onChange}
                value={value}
                sx={{'& > div > p' : {display: 'none'}}}
            >
                {fieldsDetails.map(({field, sample}) => (
                    <MenuItem value={field} key={field}>
                        {field}
                        <Typography sx={{fontSize: '0.7em', color: 'gray', marginLeft: '1em'}}>
                            ({sample})
                        </Typography>

                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
};

export default FieldsSelect;