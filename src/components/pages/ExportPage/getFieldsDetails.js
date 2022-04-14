const getFieldsDetails = sample => {
    return Object.keys(sample).map(field => {
        const details = {field, sample: sample[field]};
        if (Number(sample[field])) {
            return {...details, type: 'numeric'};
        }

        if (/^\d{4}-\d{2}-\d{2}/.test(sample[field])) {
            return {...details, type: 'date'};
        }

        return {...details, type: 'text'};
    })
}

export default getFieldsDetails;