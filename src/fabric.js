import axios from 'axios';

const bulkInsert = async (items, xSiteContext) => {
    try {
        const options = {
            url: 'https://sandbox.copilot.fabric.inc/api-product/v1/product/bulk/insert',
            host: 'https://sandbox.copilot.fabric.inc',
            path: '/api-product/v1/product/bulk/insert',
            method: 'POST',
            port: 443,
            headers: {
                'Content-Type': 'application/json',
                'x-site-context': xSiteContext
            },
            data: JSON.stringify(items),
        };

        const response = await axios({
            ...options,
        });

        return {
            status: response.status,
            data: response.data
        };
    } catch (err) {
        return {
            status: err.response.status || err.message,
            data: err.response.data
        };
    }
};


export {
    bulkInsert
}