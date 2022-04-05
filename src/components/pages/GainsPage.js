import ExchangeGrid from "../grids/ExchangeGrid";
import {useEffect, useState} from "react";
import { cleanFloat } from "../../lib/helpers";
import CurrenciesStatsGrid from "../grids/CurrenciesStatsGrid";
import PaperBoxAlert from "../layout/PaperBoxAlert";
import SalesGrid from "../grids/SalesGrid";

const GainsPage = ({files}) => {
    const {gainMap} = files;
    const [rejected, setRejected] = useState([]);
    const [currenciesStatus, setCurrenciesStatus] = useState([])
    const [salesDetails, setSalesDetails] = useState([]);

    useEffect(() => {
        setRejected(gainMap.rejected.reduce((prev,curr,index) => {
            Object.keys(curr.pair).forEach(currency => {
                prev.push({error: curr.error, groupId: index, ...curr.pair[currency]});
            });
            return prev;
        }, []));

        setCurrenciesStatus(Object.keys(gainMap.map).map(currency => ({
            currency: currency,
            gains: gainMap.map[currency].gains,
            fees: gainMap.map[currency].fees,
            purchaseCount: gainMap.map[currency].purchases.length,
            salesCount: gainMap.map[currency].sales.length,
            purchased: cleanFloat(gainMap.map[currency].purchased),
            sold: cleanFloat(gainMap.map[currency].sold),
            balance: cleanFloat(String(gainMap.map[currency].purchased - gainMap.map[currency].sold).slice(0,-1)),

        })));

        const allGains = [];
        const YTD = {};

        Object.keys(gainMap.map).forEach(currency => {
            gainMap.map[currency].sales.forEach(({
                                                     sold,
                                                     soldAt,
                                                     soldToDate,
                                                     cost,
                                                     gain,
                                                     gainsToDate,
                                                     purchaseDates,
                                                     saleDate

            }) => {
                if (typeof YTD[currency] === 'undefined') {
                    YTD[currency] = {};
                }
                const year = saleDate.substring(0,4);
                if (typeof YTD[currency][year] === 'undefined') {
                    YTD[currency][year] = {
                        sold: 0.0,
                        gain: 0.0,
                    }
                }
                YTD[currency][year].sold += sold;
                YTD[currency][year].gain += gain;
                allGains.push({
                    currency,
                    sold,
                    soldAt,
                    soldToDate: cleanFloat(soldToDate),
                    cost,
                    gain,
                    gainsToDate,
                    purchaseDates,
                    saleDate,
                    soldYTD: cleanFloat(YTD[currency][year].sold),
                    gainYTD: cleanFloat(YTD[currency][year].gain),
                });
            });
        });
        setSalesDetails(allGains);

    }, [gainMap]);

    return (
        <>
            <PaperBoxAlert
                title={'Rejected Transactions ' + (!!rejected.length ? '(' + rejected.length + ')' : '')}
                info={rejected.length ? '' : 'No rejected items'}
            >
                {(!!rejected.length) && <ExchangeGrid exchanges={rejected} extra={[{field: 'error'},{field: 'groupId'}]} />}
            </PaperBoxAlert>

            <PaperBoxAlert
                title={'Currencies Stats ' + (!!rejected.length ? '(' + rejected.length + ')' : '')}
                info={currenciesStatus.length ?  '' : 'No Currency Found'}
            >
                {(!!currenciesStatus.length) && <CurrenciesStatsGrid currenciesStatus={currenciesStatus}/>}
            </PaperBoxAlert>

            <PaperBoxAlert
                title={'Sales Details ' + (!!salesDetails.length ? '(' + salesDetails.length + ')' : '')}
                info={salesDetails.length ?  '' : 'No Sales Found'}
            >
                {(!!salesDetails.length) && <SalesGrid salesDetails={salesDetails} />}
            </PaperBoxAlert>


        </>
    );
};

export default GainsPage;