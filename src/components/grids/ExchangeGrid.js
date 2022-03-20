import {useState} from "react";
import { AgGridReact } from 'ag-grid-react';


const ExchangeGrid = ({exchanges}) => {
    const [columnDefs] = useState([
        { field: 'file'},
        { field: 'Amount'},
        { field: 'Completed Date'},
        { field: 'Currency'},
        { field: 'Description'},
        { field: 'Fee'},
        { field: 'State'},
        { field: 'Started Date'},
        { field: 'Product'},
        { field: 'Type'},
        { field: 'Balance'}
    ]);

    const [defaultColDef] = useState({
        filter: 'agTextColumnFilter',
        sortable: true,
        resizable: true,
    });

    return (
        <div className="ag-theme-alpine" style={{height: '75vh'}}>
            <AgGridReact
                rowData={exchanges}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}


            />

        </div>
    );
};

export default ExchangeGrid;