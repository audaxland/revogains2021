import Papa from 'papaparse';

const makeExportData = ({dataSource, fields, filters}) => {
    const dataFiltered = dataSource.filter(row => {
        for (const {field, operator, value} of filters) {
            if ((operator === '=') && (row[field] != value)) return false;
            if ((operator === '>') && (row[field] <= value)) return false;
            if ((operator === '>=') && (row[field] < value)) return false;
            if ((operator === '<') && (row[field] >= value)) return false;
            if ((operator === '<=') && (row[field] > value)) return false;
            if ((operator === '!=') && (row[field] == value)) return false;
            if ((operator === 'contains') && (!row[field].contains(value))) return false;
            if ((operator === 'start with') && (!(new RegExp('^' + value, 'i')).test(row[field]))) return false;
            if ((operator === 'ends with') && (!(new RegExp(value + '$', 'i')).test(row[field]))) return false;
        }
        return true;
    });

    return dataFiltered.map(row => fields.reduce((prev, {field, name}) => {
        prev[name] = row[field];
        return prev;
    }, {}))
}

const generateExportCsv = ({dataSource, fields, filters}) => {
    const exportData = makeExportData({dataSource, fields, filters});
    const blob = new Blob([Papa.unparse(exportData)], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const tag = document.createElement('a');
    tag.href = url;
    tag.setAttribute('download', 'testfile.txt');
    tag.click();


}

export default generateExportCsv;