const mainHeaders = Object.freeze({
    sku: "sku",
    type: "type",
    nodeName: "nodeName",
    parentSku: "parentSku"
});

const mappingMainHeaders = Object.freeze({  // for the key value we have to change it depends on attribute mapping in settings
    "SKU": mainHeaders.sku,
    "type": mainHeaders.type, // ITEM, BUNDLE
    "Hierarchy Node": mainHeaders.nodeName, // MASTER->level0->level1
    "Parent SKU": mainHeaders.parentSku,
    "Active": "active", // boolean @todo double check  
    "Variant": "variant", // @todo Image, Product Title
});

const defaultValues = Object.freeze({
    [mainHeaders.sku]: null,
    [mainHeaders.type]: "ITEM",
    [mainHeaders.nodeName]: null,
    [mainHeaders.parentSku]: null,
});

const itemSchema = { attributeValues: [] };

export {
    mainHeaders,
    mappingMainHeaders,
    defaultValues,
    itemSchema
};
