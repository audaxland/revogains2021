import {useEffect, useState, useRef} from "react";
import { AgGridReact } from 'ag-grid-react';
import {resizeGrid} from "./gridHelper";


const ExchangeGrid = ({exchanges, extra = []}) => {
    const gridRef = useRef();
    const initialColumns = [
        { field: 'Currency'},
        { field: 'Amount'},
        { field: 'Fee'},
        { field: 'Balance'},
        { field: 'file'},
        { field: 'Completed Date'},
        { field: 'Description'},
        { field: 'State'},
        { field: 'Started Date'},
        { field: 'Product'},
        { field: 'Type'},

        { field: 'Rate'}
    ];

    const [columnDefs, setColumnDefs] = useState(initialColumns);

    useEffect(() => {
        setColumnDefs([...extra, ...initialColumns]);
    }, []);

    const [defaultColDef] = useState({
        filter: 'agTextColumnFilter',
        sortable: true,
        resizable: true,
    });

    useEffect(() => resizeGrid(gridRef), [exchanges]);

    return (
        <>
            <button onClick={() => resizeGrid(gridRef)} style={{width: '100%'}}>Auto Resize</button>
            <div className="ag-theme-alpine" style={{height: '75vh'}}>

                <AgGridReact
                    ref={gridRef}
                    rowData={exchanges}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    skipHeaderOnAutoSize={true}
                    enableCellTextSelection={true}
                />
            </div>
        </>
    );
};

export default ExchangeGrid;