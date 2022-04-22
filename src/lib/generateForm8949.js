import {PDFDocument} from 'pdf-lib';
import moment from "moment";

const formatIfNegative = value => {
    if (Number.isNaN(Number(value))) return value;
    if (Number(value) < 0) {
        return '(' + String(value).replace('-', '') + ')';
    }
    return value
}

/***
 * Fill the pdf form with the provided data
 * @param form {PDFForm} form read from the pdf document
 * @param name {string} field to populate to the name field
 * @param ssn {string} ssn number to populate to the ssn field
 * @param shortTermCheckbox {'A'|'B'|'C'} checkbox of the first page to check
 * @param shortTermRows {row} data to populate in the rows of the first page
 * @param shortTermTotals {row} data to populate to the totals row of the first page
 * @param longTermCheckbox {'D'|'E'|'F'} checkbox of the second page to check
 * @param longTermRows {row} data to populate in the rows of the second page
 * @param longTermTotals {row} data to populate to the totals row of the second page
 * @returns {Promise<*>}
 */
export const  populateForm8949 = async ({
    form, name = '', ssn = '',
    shortTermCheckbox = '', shortTermRows = [], shortTermTotals = {},
    longTermCheckbox = '', longTermRows = [], longTermTotals = {}
}) => {
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const totals = ['d', 'e', 'f', 'g', 'h'];

    // populate the name and ssn on the first page
    form.getTextField('topmostSubform[0].Page1[0].f1_1[0]').setText(name);
    form.getTextField('topmostSubform[0].Page1[0].f1_2[0]').setText(ssn);

    // populate the checkbox on the first page
    (shortTermCheckbox === 'A') && form.getCheckBox('topmostSubform[0].Page1[0].c1_1[0]').check();
    (shortTermCheckbox === 'B') && form.getCheckBox('topmostSubform[0].Page1[0].c1_1[1]').check();
    (shortTermCheckbox === 'C') && form.getCheckBox('topmostSubform[0].Page1[0].c1_1[2]').check();

    // populate the rows on the first page
    shortTermRows.slice(0,14).forEach((row, rowIndex) => {
        const rowReference = 3 + (8 * rowIndex);
        const rowName = 'topmostSubform[0].Page1[0].Table_Line1[0].Row' + (rowIndex + 1);
        columns.forEach((key, keyIndex) => {
            if (typeof row[key] !== 'undefined') {
                const cellName = rowName +'[0].f1_' + (rowReference + keyIndex) + '[0]';
                form.getTextField(cellName).setText(formatIfNegative(row[key]));
            }
        });
    });

    // populate the totals on the first page
    totals.forEach((key, keyIndex) => {
        const cellNumber = 115 + keyIndex;
        if (typeof shortTermTotals[key] !== 'undefined') {
            form.getTextField('topmostSubform[0].Page1[0].f1_' + cellNumber + '[0]')
                .setText(formatIfNegative(shortTermTotals[key]));
        }
    });

    // populate the name and ssn on the second page
    form.getTextField('topmostSubform[0].Page2[0].f2_1[0]').setText(name);
    form.getTextField('topmostSubform[0].Page2[0].f2_2[0]').setText(ssn);

    // populate the checkbox on the second page
    (longTermCheckbox === 'D') && form.getCheckBox('topmostSubform[0].Page2[0].c2_1[0]').check();
    (longTermCheckbox === 'E') && form.getCheckBox('topmostSubform[0].Page2[0].c2_1[1]').check();
    (longTermCheckbox === 'F') && form.getCheckBox('topmostSubform[0].Page2[0].c2_1[2]').check();

    // populate the rows on the second page
    longTermRows.slice(0,14).forEach((row, rowIndex) => {
        const rowReference = 3 + (8 * rowIndex);
        const rowName = 'topmostSubform[0].Page2[0].Table_Line1[0].Row' + (rowIndex + 1);
        columns.forEach((key, keyIndex) => {
            if (typeof row[key] !== 'undefined') {
                const cellName = rowName +'[0].f2_' + (rowReference + keyIndex) + '[0]';
                form.getTextField(cellName).setText(formatIfNegative(row[key]));
            }
        });
    });

    // populate the totals on the second page
    totals.forEach((key, keyIndex) => {
        const cellNumber = 115 + keyIndex;
        if (typeof longTermTotals[key] !== 'undefined') {
            form.getTextField('topmostSubform[0].Page2[0].f2_' + cellNumber + '[0]')
                .setText(formatIfNegative(longTermTotals[key]));
        }
    });

    return form;
}

/**
 * generate a from 8949 with the provided data
 * @param name {string} field to populate to the name field
 * @param ssn {string} ssn number to populate to the ssn field
 * @param shortTermCheckbox {'A'|'B'|'C'} checkbox of the first page to check
 * @param shortTermRows {row} data to populate in the rows of the first page
 * @param shortTermTotals {row} data to populate to the totals row of the first page
 * @param longTermCheckbox {'D'|'E'|'F'} checkbox of the second page to check
 * @param longTermRows {row} data to populate in the rows of the second page
 * @param longTermTotals {row} data to populate to the totals row of the second page
 * @returns {Promise<void>}
 */
export const  generateForm8949 = async ({
    name = '', ssn = '', fileName = null,
    shortTermCheckbox = '', shortTermRows = [], shortTermTotals = {},
    longTermCheckbox = '', longTermRows = [], longTermTotals = {}
}) => {
    const formUrl = '/assets/f8949.pdf';
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(formPdfBytes);
    const form = pdfDoc.getForm()

    await populateForm8949({
        form, name, ssn,
        shortTermCheckbox, shortTermRows, shortTermTotals,
        longTermCheckbox, longTermRows, longTermTotals
    });

    const pdfBytes = await pdfDoc.save();
    downloadPdf(pdfBytes, fileName);
}

/**
 * cause the browser to download a blob as a pdf file
 * @param content {BlobPart} binary data of the pdf file
 */
export const downloadPdf = (content, fileName = null) => {
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const tag = document.createElement('a');
    tag.href = url;
    const exportFileName = fileName ? fileName : 'RevoExport_' + (moment().format('YYYY-MM-DD_HH-mm-ss')) + '.pdf'
    tag.setAttribute('download', exportFileName);
    tag.click();
}
