import {useState, useRef, useCallback} from "react";
import { AgGridReact } from 'ag-grid-react';


const SalesGrid = ({salesDetails}) => {
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

    const onGridReady = useCallback((params) => {

    }, []);

    const resize = () => {
        const allColumnIds = [];
        gridRef.current.columnApi.getAllColumns().forEach((column) => {
            allColumnIds.push(column.getId());
        });
        gridRef.current.columnApi.autoSizeColumns(allColumnIds, true);
    }

    return (
        <>
            <button onClick={resize} style={{width: '100%'}}>Auto Resize</button>
            <div className="ag-theme-alpine" style={{height: '75vh'}}>

                <AgGridReact
                    ref={gridRef}
                    rowData={salesDetails}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    skipHeaderOnAutoSize={true}
                    enableCellTextSelection={true}
                />
            </div>
        </>
    );
};

export default SalesGrid;