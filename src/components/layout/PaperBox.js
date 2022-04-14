import {Box, Paper, Typography} from "@mui/material";

const PaperBox = ({title = '', children}) => {

    return (
        <Paper sx={{padding: '1em', marginBottom: '1em'}}>
            {(!!title) && (
                <Typography variant='subtitle1' sx={{fontWeight: 'bold', fontSize: '1.2em'}}>
                    {title}
                </Typography>
            )}
            <Box>
                {children}
            </Box>
        </Paper>
    )
}

export default PaperBox;