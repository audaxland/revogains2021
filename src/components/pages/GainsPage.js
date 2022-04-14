import ExchangeGrid from "../grids/ExchangeGrid";
import {useEffect, useState} from "react";
import { cleanFloat } from "../../lib/helpers";
import CurrenciesStatsGrid from "../grids/CurrenciesStatsGrid";
import PaperBoxAlert from "../layout/PaperBoxAlert";
import SalesGrid from "../grids/SalesGrid";

const GainsPage = ({files}) => {
    const {gainMap, rejected, salesList} = files;
    const [rejectedDetails, setRejectedDetails] = useState([]);
    const [currenciesStatus, setCurrenciesStatus] = useState([])

    useEffect(() => {
        setRejectedDetails(rejected.reduce((prev,curr,index) => {
            Object.keys(curr.pair).forEach(currency => {
                prev.push({error: curr.error, groupId: index, ...curr.pair[currency]});
            });
            return prev;
        }, []));

        setCurrenciesStatus(Object.keys(gainMap).map(currency => ({
            currency: currency,
            gains: cleanFloat(gainMap[currency].gains),
            fees: cleanFloat(gainMap[currency].fees),
            purchaseCount: gainMap[currency].purchases.length,
            salesCount: gainMap[currency].sales.length,
            purchased: cleanFloat(gainMap[currency].purchased),
            sold: cleanFloat(gainMap[currency].sold),
            balance: cleanFloat(String(gainMap[currency].purchased - gainMap[currency].sold).slice(0,-1)),
        })));
    }, [gainMap, rejected]);

    return (
        <>
            <PaperBoxAlert
                title={'Rejected Transactions ' + (!!rejectedDetails.length ? '(' + rejectedDetails.length + ')' : '')}
                info={rejectedDetails.length ? '' : 'No rejected items'}
            >
                {(!!rejectedDetails.length) && <ExchangeGrid exchanges={rejectedDetails} extra={[{field: 'error'},{field: 'groupId'}]} />}
            </PaperBoxAlert>

            <PaperBoxAlert
                title={'Currencies Stats ' + (!!currenciesStatus.length ? '(' + currenciesStatus.length + ')' : '')}
                info={currenciesStatus.length ?  '' : 'No Currency Found'}
            >
                {(!!currenciesStatus.length) && <CurrenciesStatsGrid currenciesStatus={currenciesStatus}/>}
            </PaperBoxAlert>

            <PaperBoxAlert
                title={'Sales Details ' + (!!salesList.length ? '(' + salesList.length + ')' : '')}
                info={salesList.length ?  '' : 'No Sales Found'}
            >
                {(!!salesList.length) && <SalesGrid salesList={salesList} />}
            </PaperBoxAlert>


        </>
    );
};

export default GainsPage;