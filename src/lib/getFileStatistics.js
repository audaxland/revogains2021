const getFileStatistics = data => {
    const stats = {
        rows: data.length,
        Currency: {},
        Exchanged: {},
        State: {},
        Type: {},
        Months: {},
        Duration: {},
    }
    console.log('data', data);
    data.forEach(row => {
        if (typeof stats.Currency[row.Currency] === 'undefined') {
            stats.Currency[row.Currency] = 0;
        }
        stats.Currency[row.Currency]++;

        if (typeof stats.State[row.State] === 'undefined') {
            stats.State[row.State] = 0;
        }
        stats.State[row.State]++;

        if (typeof stats.Type[row.Type] === 'undefined') {
            stats.Type[row.Type] = 0;
        }
        stats.Type[row.Type]++;

        if (row["Started Date"]) {
            const month = row["Started Date"].substring(0,7);
            if (typeof stats.Months[month] === 'undefined') {
                stats.Months[month] = 0;
            }
            stats.Months[month]++;

            const duration = (row["Started Date"] !== row["Completed Date"]) ? 'yes' : 'no';
            if (typeof stats.Duration[duration] === 'undefined') {
                stats.Duration[duration] = 0;
            }
            stats.Duration[duration]++;
        } else {
            console.log('not start date', row);
        }

        if (row.Description) {
            if (row.Description.indexOf('Exchanged') === 0) {
                if (typeof stats.Exchanged[row.Type] === 'undefined') {
                    stats.Exchanged[row.Description] = 0;
                }
                stats.Exchanged[row.Description]++;
            }
        } else console.log('Not description', row);

    });
    return stats;
}

export default getFileStatistics;