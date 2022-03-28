import {useEffect, useState, useRef, useCallback} from "react";
import { AgGridReact } from 'ag-grid-react';


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
                    rowData={exchanges}
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

export default ExchangeGrid;