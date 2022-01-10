import express from 'express';
import { EOL } from 'os';
import { uploadFile } from './multer.js';
import { bulkInsert } from './fabric.js';
import { trim } from './utils.js';
import { defaultValues, itemSchema, mainHeaders, mappingMainHeaders } from './configs.js';

const PORT = process.env.PORT || 3000;
const app = express();
// automate using lambda + SQS or S3
const splitHeadersAndRows = ([header, ...rows]) => {
    const fixedHeader = header.split(',').map((value) => trim(value.trim(), '"'));
    return [fixedHeader, ...rows];
};

const customSanitazier = (csvString) => {
    return splitHeadersAndRows(csvString.split('\n').join(EOL).split(EOL));
};

const getManipulatedValueByHeader = (header, value) => {
    switch (header) {
        case mainHeaders.nodeName:
            return `MASTER->${value}`;

        default:
            return value;
    }
};

const customAdapterReducer = (header) => (reducer, value) => {
    const attributesValue = value.split(',').map((value) => trim(value, '"'));
    const item = attributesValue.reduce((reducer, attributeValue, index) => {
        const headerKey = header[index];
        if (mappingMainHeaders[headerKey]) {
            return {
                ...reducer,
                [mappingMainHeaders[headerKey]]: getManipulatedValueByHeader(mappingMainHeaders[headerKey], attributeValue),
            };
        }

        return {
            ...reducer,
            attributeValues: [
                ...reducer.attributeValues,
                {
                    name: headerKey,
                    value: attributeValue,
                },
            ],
        };
    }, itemSchema);

    return [item, ...reducer];
}

app.post('/', uploadFile.single('file'), async (req, res) => { // api-product/v1/product/bulk/insert/csv
    try {
        const xSiteContext = req.headers['x-site-context'];
        const file = req.file;
        const csvString = file.buffer.toString();
        const [header, ...rows] = customSanitazier(csvString);
        const items = rows.reduce(customAdapterReducer(header), []);
        const { status, data } = await bulkInsert(items, xSiteContext);
        res.status(status).json(data);
    } catch (err) {
        console.error(err);
        res.send(err.message);
    }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
