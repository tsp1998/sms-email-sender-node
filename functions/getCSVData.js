const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')

function getCSVData(fileName) {
  return new Promise((resolve, reject) => {
    const records = [];
    fs.createReadStream(path.resolve(__dirname, '..', 'uploads', fileName))
      .pipe(csv())
      .on('data', row => records.push(row))
      .on('end', () => resolve(records))
      .on('error', (err) => reject(err))
  })
}

module.exports = getCSVData