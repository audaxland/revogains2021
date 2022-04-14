import PaperBoxAlert from "../../layout/PaperBoxAlert";
import {useMemo, useState} from "react";
import {Button, Divider} from "@mui/material";
import AddFieldForm from './AddFieldForm';
import getFieldsDetails from "./getFieldsDetails";
import AddFilterForm from "./AddFilterForm";
import DeletableGrid from "../../grids/DeletableGrid";
import generateExportCsv from "../../../lib/generateExportCsv";


const ExportsPage = ({files}) => {
    const { salesList } = files;
    const [fieldsList, setFieldsList] = useState([]);
    const [filters, setFilters] = useState([]);

    const fieldsDetails = useMemo(() => salesList[0] ? getFieldsDetails(salesList[0]) : [], [salesList]);

    const filterColumns = [ {field: 'field', headerName: 'Filter Field'}, {field: 'operator'}, {field: 'value'}]
    const fieldsListColumns = [ {field: 'field'}, {field: 'name'}];

    const exportToCsv = e => {
        generateExportCsv({dataSource: salesList, fields: fieldsList, filters});
    }

    return (
        <>
            <PaperBoxAlert
                title="Fields to export"
                info={salesList.length ?  '' : 'Nothing to export'}
            >
                {(!!fieldsDetails.length) && (
                    <>
                        <AddFieldForm fieldsDetails={fieldsDetails} setFieldsList={setFieldsList}/>
                        <Divider />
                        <DeletableGrid
                            rows={fieldsList}
                            setRows={setFieldsList}
                            columns={fieldsListColumns}
                        />
                    </>
                )}
            </PaperBoxAlert>

            <PaperBoxAlert
                title="Export Filters"
            >
                <AddFilterForm fieldsDetails={fieldsDetails} setFilters={setFilters} />
                <Divider />
                <DeletableGrid
                    rows={filters}
                    setRows={setFilters}
                    columns={filterColumns}
                />
            </PaperBoxAlert>

            <PaperBoxAlert
                title="Download Export"
            >
                <Button
                    variant="contained"
                    onClick={exportToCsv}
                >
                    Download CSV File
                </Button>
            </PaperBoxAlert>


        </>
    )
}

export default ExportsPage;