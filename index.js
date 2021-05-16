const express = require('express')
// const formidable = require('formidable')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const getCSVData = require('./functions/getCSVData')
const send = require('./functions/send')
const { validateRecord } = require('./functions/validations')
const { removeDuplicateRecords } = require('./functions/utils')

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

const upload = multer({ dest: 'uploads/' })

app.post('/fileUpload', upload.single('file'), (req, res) => {
  const newFileName = Date.now() + req.file.originalname;
  fs.rename(
    path.resolve(__dirname, 'uploads', req.file.filename),
    path.resolve(__dirname, 'uploads', newFileName),
    async err => {
      if (err) {
        console.log(`err`, err)
        res.sendFile(path.resolve(__dirname, 'public', 'error.html'))
      } else {
        let records = await getCSVData(newFileName);

        records = removeDuplicateRecords(records)

        for (const record of records) {
          if (validateRecord(record)) {
            send(record);
          } else {
            console.log('not perfect record\n')
          }
        }
        res.sendFile(path.resolve(__dirname, 'public', 'success.html'))
      }
    })
})

app.listen(PORT, err => {
  if (err) return console.log(`Error: `, err);
  console.log(`App is listening on PORT ${PORT}`);
})
