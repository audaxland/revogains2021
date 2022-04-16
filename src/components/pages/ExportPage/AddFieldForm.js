import {useEffect, useState} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import FieldsSelect from "./FieldsSelect";
import OptionSetting from "./OptionSetting";
import FormGroupBox from "./FormGroupBox";
import {FORMAT_ROUND, FORMAT_MULTIPLY} from "../../../constants";


const AddFieldForm = ({ setFieldsList, fieldsDetails}) => {
    const [currentField, setCurrentField] = useState('');
    const [detail, setDetail] = useState({});
    const [currentAs, setCurrentAs] = useState('');
    const [formatOptions, setFormatOptions] = useState([])

    useEffect(() => {
        setDetail(fieldsDetails.find(item => item.field === currentField) ?? {});
    }, [currentField, fieldsDetails]);

    const onChange = e => {
        const newValue = e.target.value;
        setCurrentField(newValue);
        setCurrentAs(newValue);
        setFormatOptions([]);
    }

    const onAdd = e => {
        setFieldsList(old => [...old, {field: currentField, name: currentAs, formatOptions}]);
        setCurrentField('');
        setCurrentAs('');
    }

    const updateOption = (option, value) => {
        if (value) {
            setFormatOptions(old => [
                ...old.filter(({name,order}) => ((order <= value.order) && (name !== option))),
                value,
                ...old.filter(({name,order}) => ((order > value.order) && (name !== option))),
            ]);
        } else {
            setFormatOptions(old => old.filter(({name}) => (name !== option)));
        }
    }

    return (
        <Box>
            <FormGroupBox>
                <FieldsSelect fieldsDetails={fieldsDetails} onChange={onChange} value={currentField} sx={{marginRight: '1em'}} />
                <Typography sx={{display: 'block'}}>
                    as
                </Typography>
                <TextField
                    variant="outlined"
                    label="Choose export Name"
                    value={currentAs}
                    onChange={e => setCurrentAs(e.target.value)}
                />
            </FormGroupBox>
            {(detail.type === 'numeric') && (
                <Box>
                    <OptionSetting
                        label='round decimals'
                        pattern='\d\d?'
                        defaultValue={2}
                        name={FORMAT_ROUND}
                        order={2}
                        update={updateOption}
                    />
                    <OptionSetting
                        label='multiplier'
                        pattern='-?\d*\.?\d*'
                        defaultValue={1}
                        name={FORMAT_MULTIPLY}
                        order={1}
                        update={updateOption}
                    />
                </Box>
            )}

            <FormGroupBox>
                <Button
                    variant='contained'
                    onClick={onAdd}
                    disabled={(!currentField) || (!currentAs)}
                >
                    Add Field
                </Button>
            </FormGroupBox>
        </Box>
    )
}

export default AddFieldForm;