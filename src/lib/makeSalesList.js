import {cleanFloat} from "./helpers";

const makeSalesList = gainMap => {
    const allGains = [];
    const YTD = {};

    Object.keys(gainMap).forEach(currency => {
        gainMap[currency].sales.forEach(({
            sold,
            soldAt,
            soldToDate,
            cost,
            gain,
            gainsToDate,
            purchaseDates,
            saleDate,
            referenceCurrency
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
                referenceCurrency,
            });
        });
    });

    return allGains;
}

export default makeSalesList;