import PaperBox from "./PaperBox";
import {Alert} from "@mui/material";

const PaperBoxAlert = ({title = '', info = '', error = '', children}) => {
    return (
        <PaperBox title={title}>
            {(!!info) && (
                <Alert severity='info' sx={{marginBottom: '1em'}}>{info}</Alert>
            )}
            {(!!error) && (
                <Alert severity='info' sx={{marginBottom: '1em'}}>{error}</Alert>
            )}
            {children}
        </PaperBox>
    );
};

export default PaperBoxAlert;