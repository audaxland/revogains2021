import {useEffect, useState} from "react";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import SimpleGrid from "./SimpleGrid";

const DeletableGrid = ({rows, columns, setRows, emptyMessage = 'Nothing yet'}) => {
    const [columnsState, setColumnsState] = useState([]);


    const deleteItem = item => e => {
        setRows(old => old.filter(oldItem => JSON.stringify(item) !== JSON.stringify(oldItem)));
    }

    useEffect(() => {
        setColumnsState([
            ...columns,
            {
                headerName: 'Remove',
                cellRenderer: params => (<IconButton onClick={deleteItem(params.data)}><Delete /></IconButton>)
            }
        ]);
    }, [rows, setRows]);


    return (
        <SimpleGrid {...{rows, emptyMessage}} columns={columnsState} />
    )
}

export default DeletableGrid;