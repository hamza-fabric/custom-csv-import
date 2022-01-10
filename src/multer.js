import multer from 'multer';

const csvFilter = (req, file, cb) => {
    if (file.mimetype.includes("csv")) {
        cb(null, true);
    } else {
        cb("Please upload only csv file.", false);
    }
};

const storage = multer.memoryStorage();
const uploadFile = multer({ storage, fileFilter: csvFilter });

export {
    uploadFile
};