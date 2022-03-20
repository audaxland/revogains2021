import {Alert, Paper, Typography, Box} from "@mui/material";
import {useState} from "react";
import FilesGrid from "../grids/FilesGrid";




const FilesPage = ({files}) => {
    const [error, setError] = useState();
    const { addUpload, uploadsMeta, statistics } = files;
    const newFile = async e => {
        setError('');
        if (!e.target.files[0]) return;
        const result = await addUpload(e.target.files[0]);
        if (result !== true) setError(result);
    }
    return (
        <>
            <Paper sx={{padding: '1em', marginBottom: '1em'}}>
                <Typography variant='subtitle1'>
                    Add a New File
                </Typography>
                {(!!error) && <Alert severity='error'>{error}</Alert>}
                <Box sx={{padding: '1em'}}>
                    <input type="file" onChange={newFile}/>
                </Box>
            </Paper>

            <Paper sx={{padding: '1em', marginBottom: '1em'}}>
                <Typography variant='subtitle1'>
                    Current Files
                </Typography>
                <Box>
                    {(!uploadsMeta.length) && <Alert severity='info'>No files yet!</Alert>}
                    {(!!uploadsMeta.length) && <FilesGrid uploadsMeta={uploadsMeta} />}
                </Box>
            </Paper>


        </>
    );
};

export default FilesPage;