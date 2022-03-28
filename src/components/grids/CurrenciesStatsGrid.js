import {useEffect, useState, useRef, useCallback} from "react";
import { AgGridReact } from 'ag-grid-react';


const CurrenciesStatsGrid = ({currenciesStatus}) => {
    const gridRef = useRef();
    const initialColumns = [
        { field: 'currency' },
        { field: 'gains' },
        { field: 'balance' },
        { field: 'purchased' },
        { field: 'fees' },
        { field: 'sold' },
        { field: 'purchaseCount' },
        { field: 'salesCount' },
    ];

    const [columnDefs, setColumnDefs] = useState(initialColumns);

    useEffect(() => {
        setColumnDefs(initialColumns);
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
            <div className="ag-theme-alpine" style={{height: 68 + (currenciesStatus.length * 41),}}>

                <AgGridReact
                    ref={gridRef}
                    rowData={currenciesStatus}
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

export default CurrenciesStatsGrid;