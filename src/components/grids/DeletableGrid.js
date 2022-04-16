import {useEffect, useRef, useState} from "react";
import PaperBoxAlert from "../layout/PaperBoxAlert";
import {AgGridReact} from "ag-grid-react";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

const DeletableGrid = ({rows, columns, setRows, emptyMessage = 'Nothing yet'}) => {
    const [columnState, setColumnState] = useState([]);
    const gridRef = useRef();

    const deleteItem = item => e => {
        setRows(old => old.filter(oldItem => JSON.stringify(item) !== JSON.stringify(oldItem)));
    }

    useEffect(() => {
        setColumnState([
            ...columns.map(({field, headerName = undefined}) => ({field, headerName})),
            {
                headerName: 'Remove',
                cellRenderer: params => (<IconButton onClick={deleteItem(params.data)}><Delete /></IconButton>)
            }
        ]);
        gridRef?.current?.columnApi?.autoSizeAllColumns(false);
    }, [rows]);


    const [defaultColDef] = useState({
        resizable: true,
    });

    if ((!rows.length) || (!columns.length)) {
        return <PaperBoxAlert info={emptyMessage} />;
    }

    return (
        <PaperBoxAlert>
            <div className="ag-theme-alpine" style={{height: 68 + (rows.length * 41), width: '100%'}}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rows}
                    columnDefs={columnState}

                    enableCellTextSelection={true}
                    defaultColDef={defaultColDef}
                />
            </div>
        </PaperBoxAlert>
    )
}

export default DeletableGrid;