import {useState} from "react";
import FilesGrid from "../grids/FilesGrid";
import PaperBoxAlert from "../layout/PaperBoxAlert";




const FilesPage = ({files}) => {
    const [error, setError] = useState();
    const { addUpload, uploadsMeta, statistics } = files;
    const newFile = async e => {
        setError('');
        if (!e.target.files[0]) return;
        const result = await addUpload(e.target.files[0]);
        if (result !== true) setError(result);
    }
    return (
        <>
            <PaperBoxAlert
                title='Add a New File'
                error={error ? error : ''}
            >
                <input type="file" onChange={newFile}/>
            </PaperBoxAlert>


            <PaperBoxAlert
                title='Current Files'
                info={uploadsMeta.length ? '' : 'No files yet!'}
            >
                {(!!uploadsMeta.length) && <FilesGrid uploadsMeta={uploadsMeta} />}
            </PaperBoxAlert>
        </>
    );
};

export default FilesPage;