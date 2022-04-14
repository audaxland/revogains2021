export const resizeGrid = gridRef => {
    setTimeout(() => {
        if (!gridRef?.current?.columnApi) {
            return;
        }
        const allColumnIds = [];
        gridRef.current.columnApi.getAllColumns().forEach((column) => {
            allColumnIds.push(column.getId());
        });
        gridRef.current.columnApi.autoSizeColumns(allColumnIds, true);
    }, 10);
}