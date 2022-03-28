
const sortGroup = group => {
    return group.reduce((prev, curr) => {
        if (typeof prev[curr.Currency] === 'undefined') {
            prev[curr.Currency] = [];
        }
        prev[curr.Currency].push(curr);
        prev[curr.Currency].sort((a,b) => a.Amount - b.Amount);
        return prev;
    }, {});
}

const currencyCount = group => {
    const currencyObject = group.reduce((prev, curr) => {
        if (typeof prev[curr.Currency] === 'undefined') {
            prev[curr.Currency] = 0;
        }
        prev[curr.Currency]++;
        return prev;
    }, {});
    const currencyArray = Object.keys(currencyObject).map(currency => ({currency, count: currencyObject[currency]}));
    return {currencyObject, currencyArray};
}

const makePair = (first, second) => {
    const firstRate = Math.abs(Number(second.Amount)) / Math.abs(Number(first.Amount));
    const secondRate = Math.abs(Number(first.Amount)) / Math.abs(Number(second.Amount));
    return ({
        [first.Currency]: {...first, Rate: firstRate},
        [second.Currency]: {...second, Rate: secondRate},
    })
}


const processTime = timeGroup => {
    const result = {
        orphans: [],
        pairs: [],
        unProcessed: []
    };
    const {currencyArray} = currencyCount(timeGroup);

    // if only one currency found than this is not a transaction
    if (currencyArray.length === 1) {
        result.orphans = [...timeGroup];
        return result;
    }

    // the most common case is exactly 2 exchanges of different currencies
    if ((timeGroup.length === 2) && (currencyArray.length === 2)) {
        result.pairs.push(makePair(timeGroup[0], timeGroup[1]));
        return result;
    }

    // multiple simultaneous transactions of the same to the same currency, so we can match by amount
    if ((currencyArray.length === 2) && (currencyArray[0].count === currencyArray[1].count)) {
        const sorted = sortGroup(timeGroup);
        const [a,b] = Object.keys(sorted).map(currency => sorted[currency]);
        const pairs = a.map((item, aIndex) => {
            const bIndex = b.length - 1 - aIndex;
            return makePair(item, b[bIndex]);
        });
        result.pairs.push(...pairs);
        return result;
    }
    result.unProcessed = [timeGroup];
    return result;
}

const processDay = presortDay => {
    const timeSort = {};
    const result = {
        orphans: [],
        pairs: [],
        unProcessed: []
    };
    presortDay.forEach(item => {
        if (typeof timeSort[item['Started Date']] === 'undefined') {
            timeSort[item['Started Date']] = [];
        }
        timeSort[item['Started Date']].push(item);
    });
    Object.keys(timeSort).sort().forEach(dateTime => {
        const timeResult = processTime(timeSort[dateTime]);
        result.orphans.push(...timeResult.orphans);
        result.pairs.push(...timeResult.pairs);
        result.unProcessed.push(...timeResult.unProcessed);
    });
    return result;
}

const matchExchanges = data => {
    const presort = {};
    const result = {
        orphans: [],
        pairs: [],
        unProcessed: []
    };
    data.forEach(row => {
        const [year, month, day] = row['Started Date'].split(/[- ]/);
        if (typeof presort[year] === 'undefined'){
            presort[year] = {};
        }
        if (typeof presort[year][month] === 'undefined'){
            presort[year][month] = {};
        }
        if (typeof presort[year][month][day] === 'undefined'){
            presort[year][month][day] = [];
        }
        presort[year][month][day].push(row);
    });
    Object.keys(presort).sort().forEach(year => {
        Object.keys(presort[year]).sort().forEach(month => {
            Object.keys(presort[year][month]).sort().forEach(day => {
                const dayResult = processDay(presort[year][month][day]);
                result.orphans.push(...dayResult.orphans);
                result.pairs.push(...dayResult.pairs);
                result.unProcessed.push(...dayResult.unProcessed);
            });
        });
    });
    return result;
}

export default matchExchanges;