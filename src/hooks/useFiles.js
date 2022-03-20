import {useEffect, useState} from "react";
import readCsvFile from "../lib/readCsvFile";
import getFileStatistics from '../lib/getFileStatistics';

const useFiles = () => {
    const [uploads, setUploads] = useState([]);
    const [uploadsMeta, setUploadsMeta] = useState([]);
    const [statistics, setStatistics] = useState([]);
    const [exchanges, setExchanges] = useState([]);

    useEffect(() => {
        setUploadsMeta(uploads.map(({lastModified, name, size, type}) => ({...{lastModified, name, size, type}})))
    }, [uploads]);

    const addUpload = async newUpload => {
        try {
            console.log(newUpload);
            if (newUpload.name.slice(-4).toLowerCase() !== '.csv') {
                return 'Only CSV files allowed';
            }
            if (uploads.find(item => (item.name === newUpload.name && item.size === newUpload.size))) {
                return 'File already uploaded';
            }

            const fileKey = newUpload.name + ' [' + newUpload.size + ']';

            const dataObject = await readCsvFile(newUpload);

            setUploads(oldUploads => [...oldUploads, newUpload]);
            setStatistics(oldStats => [...oldStats, {file: fileKey, ...getFileStatistics(dataObject)}])
            setExchanges(old => [
                ...old,
                ...dataObject.filter(item => item.Type === 'EXCHANGE')
                    .map(item => ({file: fileKey, ...item})),
            ]);
        } catch (error) {
            return error?.message;
        }

        return true;
    }

    return {
        uploads, addUpload, uploadsMeta, statistics, exchanges
    }
}

export default useFiles;