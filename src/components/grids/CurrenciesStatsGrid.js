import {useEffect, useState, useRef} from "react";
import { AgGridReact } from 'ag-grid-react';
import {resizeGrid} from "./gridHelper";


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

    useEffect(() => resizeGrid(gridRef), [currenciesStatus]);


    return (
        <>
            <button onClick={() => resizeGrid(gridRef)} style={{width: '100%'}}>Auto Resize</button>
            <div className="ag-theme-alpine" style={{height: 68 + (currenciesStatus.length * 41),}}>

                <AgGridReact
                    ref={gridRef}
                    rowData={currenciesStatus}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    skipHeaderOnAutoSize={true}
                    enableCellTextSelection={true}
                />
            </div>
        </>
    );
};

export default CurrenciesStatsGrid;