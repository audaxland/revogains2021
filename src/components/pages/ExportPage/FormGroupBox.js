import {Box} from "@mui/material";

const FormGroupBox = ({children, sx = {}}) => (
    <Box sx={{display: 'flex', alignItems: 'center', padding: '0.5em 1em 0.1em', '& > *': {display: 'flex', marginRight: '1em'}, ...sx}}>
        {children}
    </Box>
)

export default FormGroupBox;

