import {Alert, Box, Paper, Typography} from "@mui/material";
import ExchangeGrid from "../grids/ExchangeGrid";
import {useEffect, useState} from "react";


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
            <Paper sx={{padding: '1em', marginBottom: '1em'}}>
                <Typography variant='subtitle1'>
                    Orphan Transactions {!!orphans.length ? '(' + orphans.length + ')' : ''}
                </Typography>
                <Box>
                    {(!orphans.length) && <Alert severity='info'>No orphans</Alert>}
                    {(!!orphans.length) && <ExchangeGrid exchanges={orphans} />}
                </Box>
            </Paper>

            <Paper sx={{padding: '1em', marginBottom: '1em'}}>
                <Typography variant='subtitle1'>
                    Paired Transactions {!!paired.length ? '(' + paired.length + ')' : ''}
                </Typography>
                <Box>
                    {(!paired.length) && <Alert severity='info'>No pairs</Alert>}
                    {(!!paired.length) && <ExchangeGrid exchanges={expandPairs} extra={[{field: 'groupId'}]}/>}
                </Box>
            </Paper>

            <Paper sx={{padding: '1em', marginBottom: '1em'}}>
                <Typography variant='subtitle1'>
                    Unprocessed Transactions {!!expandUnProcessed.length ? '(' + expandUnProcessed.length + ')' : ''}
                </Typography>
                <Box>
                    {(!expandUnProcessed.length) && <Alert severity='info'>No UnProcessed Transactions</Alert>}
                    {(!!expandUnProcessed.length) && <ExchangeGrid exchanges={expandUnProcessed} extra={[{field: 'groupId'}]}/>}
                </Box>
            </Paper>
        </>
    );
}

export default TransactionsPage;