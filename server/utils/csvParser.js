const fs = require('fs');
const csv = require('csv-parser');

const parseCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

const validateCSVFormat = (data) => {
    const requiredFields = ['FirstName', 'Phone', 'Notes'];
    return data.every(item => requiredFields.every(field => field in item));
};

module.exports = {
    parseCSV,
    validateCSVFormat
};