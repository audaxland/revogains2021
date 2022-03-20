import {Alert, Box, Paper, Typography} from "@mui/material";

const StatsPage = ({files}) => {
    const {  statistics } = files;
    return (
        <Paper sx={{padding: '1em', marginBottom: '1em'}}>
            {(!statistics.length) && <Alert severity='info'>No files yet!</Alert>}
            {(!!statistics.length) && statistics.map(fileStats => (
                <Paper key={fileStats.file} sx={{padding: '1em', marginBottom: '1em'}}>
                    <Typography variant='subtitle1'>{fileStats.file} ({fileStats.rows} rows)</Typography>
                    <Paper sx={{padding: '0.5em'}}>
                        {Object.keys(fileStats)
                            .filter(key => ['file', 'rows'].indexOf(key) === -1)
                            .map(key => (
                                <Box key={key} sx={{display: 'flex', marginBottom: '0.5em', borderTop: '1px solid silver'}}>
                                    <Box sx={{flex: 1}}>{key}</Box>
                                    <ul style={{margin: 0, flex: 3}}>
                                        {Object.keys(fileStats[key]).map(value => (
                                            <li key={value}>
                                                {value}: {fileStats[key][value]}
                                            </li>
                                        ))}
                                    </ul>

                                </Box>
                            ))
                        }
                    </Paper>

                </Paper>
            ))}
        </Paper>
    );
};

export default StatsPage;