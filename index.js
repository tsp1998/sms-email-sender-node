const getCSVData = require('./functions/getCSVData')
const send = require('./functions/send')
const { validateRecord } = require('./functions/validations')
const { removeDuplicateRecords } = require('./functions/utils')

async function main() {
  let records = await getCSVData();

  records = removeDuplicateRecords(records)

  for (const record of records) {
    if (validateRecord(record)) {
      send(record);
    } else {
      console.log('not perfect record\n')
    }
  }
}

main()

// ['8668615605']