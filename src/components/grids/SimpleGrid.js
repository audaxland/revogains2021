import {useEffect, useRef, useState} from "react";
import PaperBoxAlert from "../layout/PaperBoxAlert";
import {AgGridReact} from "ag-grid-react";

const SimpleGrid = ({rows, columns, emptyMessage = 'Nothing yet'}) => {
    const gridRef = useRef();

    useEffect(() => {
        setTimeout(() => gridRef?.current?.columnApi?.autoSizeAllColumns(false), 1);
    }, [rows, columns]);


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
                    columnDefs={columns}

                    enableCellTextSelection={true}
                    defaultColDef={defaultColDef}
                />
            </div>
        </PaperBoxAlert>
    )
}

export default SimpleGrid;