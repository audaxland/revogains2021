import Papa from 'papaparse';
import {
    FORMAT_DATE,
    FORMAT_DATE_MULTI_FIRST,
    FORMAT_DATE_MULTI_LAST,
    FORMAT_DATE_MULTI_TEXT,
    FORMAT_MULTIPLY,
    FORMAT_ROUND
} from "./constants";
import moment from "moment";

const formatField = (fieldValue, formatOptions) => {
    if (!formatOptions) return fieldValue;
    return formatOptions.reduce((prev, curr) => {
        switch (curr.name) {
            case FORMAT_MULTIPLY:
                return Number(prev) * Number(curr.value);
            case FORMAT_ROUND:
                return parseFloat(prev).toFixed(curr.value);
            case FORMAT_DATE:
                return prev.split(',').map(item => moment(item).isValid() ? moment(item).format(curr.value) : prev).join(',');
            case FORMAT_DATE_MULTI_FIRST:
                return prev.split(',')[0];
            case FORMAT_DATE_MULTI_LAST:
                return prev.split(',').pop();
            case FORMAT_DATE_MULTI_TEXT:
                return prev.split(',').length > 1 ? curr.value : prev;
            default:
                return prev;
        }
    }, Array.isArray(fieldValue) ? fieldValue.join(',') : fieldValue);

}

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

    return dataFiltered.map(row => fields.reduce((prev, {field, name, formatOptions}) => {
        prev[name] = formatField(row[field], formatOptions);
        return prev;
    }, {}))
}

const generateExportCsv = ({dataSource, fields, filters}) => {
    const exportData = makeExportData({dataSource, fields, filters});
    const blob = new Blob([Papa.unparse(exportData)], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const tag = document.createElement('a');
    tag.href = url;
    tag.setAttribute('download', 'RevoGainExport_' + (moment().format('YYYY-MM-DD_HH-mm-ss')) + '.csv');
    tag.click();


}

export default generateExportCsv;