const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')

function getCSVData() {
  return new Promise((resolve, reject) => {
    const records = [];
    fs.createReadStream(path.resolve(__dirname, '..', 'data', 'Sample2.csv'))
      .pipe(csv())
      .on('data', row => records.push(row))
      .on('end', () => resolve(records))
      .on('error', (err) => reject(err))
  })
}

module.exports = getCSVData