require('dotenv').config();
const fast2sms = require('fast-two-sms')
const { writeErrorLogs } = require('../functions/utils')

const { API_KEY } = process.env;

async function sendMessage(message, numbers) {
  return new Promise((resolve, reject) => {
    fast2sms.sendMessage({ authorization: API_KEY, message, numbers })
      .then(res => {
        if (res.return) {
          console.log(`res`, res)
          resolve(res)
        } else {
          throw new Error(res.message)
        }
      })
      .catch(async err => {
        await writeErrorLogs('textMessage', err.message, {
          message,
          recipentAddress: JSON.stringify(numbers)
        })
        reject(err)
      })
  })
}

module.exports = sendMessage

// sendMessage('Hello', ['7875175975'])
// sendMessage('Hello 2', ['7875175975'])