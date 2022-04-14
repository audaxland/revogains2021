import {useState, useRef, useCallback, useEffect} from "react";
import { AgGridReact } from 'ag-grid-react';
import {resizeGrid} from "./gridHelper";


const SalesGrid = ({salesList}) => {
    const gridRef = useRef();
    const initialColumns = [
        { field: 'currency'},
        { field: 'sold'},
        { field: 'soldAt'},
        { field: 'cost'},
        { field: 'gain'},
        { field: 'soldYTD'},
        { field: 'gainYTD'},
        {
            field: 'purchaseDates',
            cellRenderer: props => props.value.join(', '),
        },
        { field: 'saleDate'},
        { field: 'gainsToDate'},
        { field: 'soldToDate'},
    ];

    const [columnDefs] = useState(initialColumns);


    const [defaultColDef] = useState({
        filter: 'agTextColumnFilter',
        sortable: true,
        resizable: true,
    });

    useEffect(() => resizeGrid(gridRef), [salesList]);

    return (
        <>
            <button onClick={e => resizeGrid(gridRef)} style={{width: '100%'}}>Auto Resize</button>
            <div className="ag-theme-alpine" style={{height: '75vh'}}>

                <AgGridReact
                    ref={gridRef}
                    rowData={salesList}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    skipHeaderOnAutoSize={true}
                    enableCellTextSelection={true}
                />
            </div>
        </>
    );
};

export default SalesGrid;