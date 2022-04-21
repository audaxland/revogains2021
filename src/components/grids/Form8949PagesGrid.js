import SimpleGrid from "./SimpleGrid";
import {IconButton} from "@mui/material";
import {Download} from "@mui/icons-material";
import {useEffect, useState} from "react";

const Form8949PagesGrid = ({rows, downloadPage}) => {
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        setColumns([
            {
                headerName: 'Download',
                cellRenderer: params => (<IconButton onClick={downloadPage(params.data)}><Download /></IconButton>)
            },
            {field: 'pageNo'},
            {field: 'rowStart'},
            {field: 'rowEnd'},
            {field: 'startDate'},
            {field: 'endDate'},
        ]);
    }, [downloadPage])

    return (
        <SimpleGrid rows={rows} columns={columns}/>
    )
}

export default Form8949PagesGrid;