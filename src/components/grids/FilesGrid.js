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

    return (
        <div className="ag-theme-alpine" style={{height: 75 + (uploadsMeta.length * 40), width: '100%'}}>
            <AgGridReact
                rowData={uploadsMeta}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div>
    );
};

export default FilesGrid;