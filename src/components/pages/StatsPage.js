import { Box } from "@mui/material";
import PaperBoxAlert from "../layout/PaperBoxAlert";

const StatsPage = ({files}) => {
    const {  statistics } = files;
    return (
        <PaperBoxAlert
            info={statistics.length ? '' : 'No files yet!'}
        >
            {(!!statistics.length) && statistics.map(fileStats => (
                <PaperBoxAlert
                    title={fileStats.file + ' (' + fileStats.rows + ' rows)'}
                    key={fileStats.file}
                >
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
                </PaperBoxAlert>
            ))}
        </PaperBoxAlert>
    );
};

export default StatsPage;