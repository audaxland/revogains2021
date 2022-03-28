import {useState} from "react";
import { AgGridReact } from 'ag-grid-react';
import moment from "moment";

const FilesGrid = ({uploadsMeta}) => {
    const [columnDefs] = useState([
        { field: 'name', flex: 2 },
        { field: 'size', flex: 1 },
        { field: 'lastModified', valueFormatter: ({data}) => moment(data.lastModified).format('DD/MM/YYYY'), flex: 1 },
        { field: 'type', flex: 1 }
    ]);

    const [defaultColDef] = useState({
        filter: 'agTextColumnFilter',
        sortable: true,
        resizable: true,
    });

    return (
        <div className="ag-theme-alpine" style={{height: 68 + (uploadsMeta.length * 41), width: '100%'}}>
            <AgGridReact
                rowData={uploadsMeta}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
            />
        </div>
    );
};

export default FilesGrid;