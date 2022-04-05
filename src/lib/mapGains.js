const computeGain = ({paired, purchases, saleId, referenceCurrency}) => {
    const sale = paired[saleId];
    const currency = Object.keys(sale).find(item => item !== referenceCurrency);
    const purchase = purchases.reduce((prev, curr) => {
        const purchaseItem = paired[curr.pairId];
        const ref = purchaseItem[referenceCurrency];
        const crypto = purchaseItem[currency];
        const ratio = Math.abs(curr.amount / (Number(crypto.Amount) - Number(crypto.Fee)));
        prev.cost += -1 * Number(ref.Amount) * ratio;
        prev.fee += Number(crypto.Fee) * ratio;
        prev.feeValue += Number(crypto.Fee) * crypto.Rate * ratio;
        prev.purchaseDates.add(crypto['Completed Date'].slice(0,10));
        return prev;
    }, {
        cost: 0.0,
        fee: 0.0,
        feeValue: 0.0,
        purchaseDates: new Set(),
    });
    return {
        gain: Number(sale[referenceCurrency].Amount) - purchase.cost,
        sold: -1 * Number(sale[currency].Amount),
        soldAt: Number(sale[referenceCurrency].Amount),
        cost: purchase.cost,
        fee: purchase.fee,
        feeValue: purchase.feeValue,
        purchaseDates: [...purchase.purchaseDates],
        saleDate: sale[currency]['Completed Date'].slice(0,10),
    };
}

const mapGains = (paired, referenceCurrency) => {
    const map = {};
    const rejected = [];

    paired.forEach((pair, index) => {
        if (typeof pair[referenceCurrency] === 'undefined') {
            rejected.push({pair, error: 'Wrong currencies'});
            return;
        }
        const currency = Object.keys(pair).filter(key => key !== referenceCurrency);
        const local = pair[referenceCurrency];
        const crypto = pair[currency];
        if (typeof map[currency] === 'undefined') {
            map[currency] = {
                purchases: [],
                sales: [],
                purchased: 0.0,
                fees: 0.0,
                sold: 0.0,
                gains: 0.0,
                cursor: null,
            };
        }

        // purchase
        if (Number(crypto.Amount) > 0) {
            map[currency].purchased += Number(crypto.Amount);
            map[currency].fees += Number(crypto.Fee);
            map[currency].purchases.push({
                pairId: index,
                remaining: Number(crypto.Amount) - Number(crypto.Fee),
                purchasedToDate: map[currency].purchased,
                feesToDate: map[currency].fees,
                soldToDate: map[currency].sold,
                sales: [],
            })
            if (map[currency].cursor === null) {
                map[currency].cursor = 0;
            }
        }

        // sale
        if (Number(crypto.Amount) < 0) {
            let cursor = map[currency].cursor;

            let amount = -Number(crypto.Amount) + Number(crypto.Fee);
            let floatIncertitude = amount / 1000000000;

            // find all the purchases for this sale
            const purchases = [];
            while (amount > 0) {
                if (cursor >= map[currency].purchases.length) {
                    rejected.push({pair, error: 'Missing purchase'});
                    return;
                }
                if (amount <= map[currency].purchases[cursor].remaining + floatIncertitude){
                    purchases.push({
                        purchaseId: cursor,
                        amount: amount,
                        pairId: map[currency].purchases[cursor].pairId
                    });
                    if (Math.abs(Number(amount) - Number(map[currency].purchases[cursor].remaining)) < floatIncertitude) {
                        cursor++;
                    }
                    amount = 0;
                } else {
                    purchases.push({
                        purchaseId: cursor,
                        amount: map[currency].purchases[cursor].remaining,
                        pairId: map[currency].purchases[cursor].pairId
                    });
                    amount -= map[currency].purchases[cursor].remaining;
                    cursor++;
                }
            }

            // update the purchases details
            purchases.forEach(({purchaseId, amount}) => {
                map[currency].purchases[purchaseId].remaining -= amount;
                map[currency].purchases[purchaseId].sales.push({
                    saleId: map[currency].sales.length, // the sale is not yet create, and will be pushed to the array just after this
                    amount: amount,
                    pairId: index,
                });
            });

            const gainDetails = computeGain({paired, purchases, saleId: index, referenceCurrency});

            // update the map
            map[currency].sold -= Number(crypto.Amount);
            map[currency].fees += Number(crypto.Fee);
            map[currency].gains += gainDetails.gain;
            map[currency].cursor = cursor;

            // update the sale details
            map[currency].sales.push({
                pairId: index,
                purchasedToDate: map[currency].purchased,
                soldToDate: map[currency].sold,
                feesToDate: map[currency].fees,
                gainsToDate: map[currency].gains,
                purchases: purchases,
                ...gainDetails
            });
        };
    });

    return {map, rejected};
};

export default mapGains;