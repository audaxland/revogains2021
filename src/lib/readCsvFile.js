import Papa from 'papaparse';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const readFile = async file => {
    const reader = new FileReader();
    let fileContent = null;
    reader.onload = e => {fileContent = e.target.result}
    reader.readAsText(file);
    let k = 0;
    while ((fileContent === null)) {
        await sleep(1);
        if (k++ > 10000) throw new Error('File reading timeout');
    }
    return fileContent;

}

export const readCsvFile = async file => {
    const fileString = await readFile(file);
    return Papa.parse(fileString, {header: true, skipEmptyLines: false}).data.filter(row => Object.keys(row).length > 1);
}

export default readCsvFile;