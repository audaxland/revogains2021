import PaperBoxAlert from "../layout/PaperBoxAlert";
import { Divider, FormControl, TextField} from "@mui/material";
import { generateForm8949, } from "../../lib/generateForm8949";
import FormGroupBox from "./ExportPage/FormGroupBox";
import {useCallback, useEffect, useState} from "react";
import moment from "moment";
import Form8949PagesGrid from "../grids/Form8949PagesGrid";

const TaxPage = ({files}) => {
    const { salesList } = files;
    const [name, setName] = useState('');
    const [ssn, setSsn] = useState('');
    const [rate, setRate] = useState(1.182033097);
    const [shortTermData, setShortTermData] = useState([]);
    const [pageList, setPageList] = useState([]);


    useEffect(() => {
        if (!salesList) return;
        const rowData = salesList
            .filter(row => row.saleDate.match('^2021'))
            .sort((a,b) => a.saleDateTime < b.saleDateTime ? -1 : 1)
            .map(row => ({
                a: row.sold + ' ' + row.currency,
                b: row.purchaseDates.length > 1 ? 'various' : moment(row.purchaseDates[0]).format('MM/DD/YYYY'),
                c: moment(row.saleDate).format('MM/DD/YYYY'),
                d: (Number(row.soldAt) * Number(rate)).toFixed(2),
                e: (Number(row.cost) * Number(rate)).toFixed(2),
                h: (Number(row.gain) * Number(rate)).toFixed(2),
            }));
        setShortTermData(rowData);

        setPageList([...Array(Math.ceil(rowData.length/14))].map((dontCare,index) => ({
            pageNo: index + 1,
            rowStart: (index * 14) + 1,
            rowEnd: Math.min(rowData.length, (index + 1) * 14),
            startDate: rowData[index * 14]?.c,
            endDate: rowData[Math.min(rowData.length, (index + 1) * 14) - 1]?.c,
        })))
    }, [salesList, rate]);

    const makeTotals = zeroValues => rows => {
        const totals = rows.reduce((prev, curr) => {
            Object.keys(prev).forEach(key => {
                prev[key] += curr[key] ? Number(curr[key]) : 0.0;
            });
            return prev;
        }, zeroValues);
        Object.keys(totals).forEach(key => {
            totals[key] = totals[key].toFixed(2);
        })
        return totals;
    }

    const downloadPage = useCallback(page => e => {
        const shortTermRows = shortTermData.slice(page.rowStart - 1, page.rowEnd);
        const shortTermTotals = makeTotals({d: 0.0, e: 0.0, g: 0.0, h: 0.0})(shortTermRows);

        generateForm8949({
            name, ssn,
            shortTermCheckbox: 'C',
            shortTermRows,
            shortTermTotals,
        });
    }, [name, ssn, shortTermData])

    return (
        <PaperBoxAlert
            title='Generate Form 8949'
        >
            <FormGroupBox>
                <FormControl>
                    <TextField label='Full Name' value={name} onChange={e => setName(e.target.value)}/>
                </FormControl>
                <FormControl>
                    <TextField label='SSN' value={ssn} onChange={e => setSsn(e.target.value)}/>
                </FormControl>
            </FormGroupBox>
            <FormGroupBox>
                <FormControl>
                    <TextField label='Exchange Rate (euro to usd)' value={rate} onChange={e => setRate(e.target.value)} />
                </FormControl>
            </FormGroupBox>
            <Divider />
            <Form8949PagesGrid rows={pageList} downloadPage={downloadPage} />
        </PaperBoxAlert>
    )
}

export default TaxPage;