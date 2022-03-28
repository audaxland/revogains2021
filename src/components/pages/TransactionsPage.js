import {Alert, Paper} from "@mui/material";
import ExchangeGrid from "../grids/ExchangeGrid";
import {useEffect, useState} from "react";
import PaperBoxAlert from "../layout/PaperBoxAlert";


const TransactionsPage = ({files}) => {
    const [expandPairs, setExpandPairs] = useState([]);
    const [expandUnProcessed, setExpandUnProcessed] = useState([]);
    const { orphans, paired, unProcessed} = files;

    useEffect(() => {
        setExpandPairs(paired.reduce((prev,curr,index) => {
            Object.keys(curr).forEach(currency => {
                prev.push({groupId: index, ...curr[currency]});
            });
            return prev;
        }, []));
    }, [paired])

    useEffect(() => {
        setExpandUnProcessed(unProcessed.reduce((prev,curr,index) => {
            curr.forEach(item => {
                prev.push({groupId: index, ...item});
            });
            return prev;
        }, []));
    }, [unProcessed])

    if (orphans.length + paired.length === 0) {
        return (
            <Paper sx={{padding: '1em', marginBottom: '1em'}}>
                <Alert severity='info'>No files yet!</Alert>
            </Paper>
        )
    }

    return (
        <>
            <PaperBoxAlert
                title={'Orphan Transactions ' + (!!orphans.length ? '(' + orphans.length + ')' : '')}
                info={orphans.length ? '' : 'No orphans'}
            >
                {(!!orphans.length) && <ExchangeGrid exchanges={orphans} />}
            </PaperBoxAlert>

            <PaperBoxAlert
                title={'Paired Transactions ' + (!!paired.length ? '(' + paired.length + ')' : '')}
                info={paired.length ? '' : 'No pairs'}
            >
                {(!!paired.length) && <ExchangeGrid exchanges={expandPairs} extra={[{field: 'groupId'}]}/>}
            </PaperBoxAlert>

            <PaperBoxAlert
                title={'Unprocessed Transactions ' + (!!expandUnProcessed.length ? '(' + expandUnProcessed.length + ')' : '')}
                info={expandUnProcessed.length ? '' : 'No UnProcessed Transactions'}
            >
                {(!!expandUnProcessed.length) && <ExchangeGrid exchanges={expandUnProcessed} extra={[{field: 'groupId'}]}/>}
            </PaperBoxAlert>
        </>
    );
}

export default TransactionsPage;