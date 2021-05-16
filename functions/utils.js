const fs = require('fs')
const path = require('path')

//classes
const CustomDate = require('../classes/CustomDate')

function checkIfWantToScheduleMessage(messageData) {
  if (messageData['Schedule On']) {
    return true;
  } else {
    return false;
  }
}

function removeDuplicateRecords(records) {
  let filteredRecords = [];

  filteredRecords.push(
    ...records.reduce((acc, curr) => {
      if (acc.findIndex(each => each.indexOf(
        `Message":"${curr['﻿Message']}","Email":"${curr['Email']}","Phone":"${curr['Phone']}"`
      ) !== -1) === -1) {
        return [...acc, JSON.stringify(curr)]
      } else {
        return acc
      }
    }, [])
  )

  filteredRecords = filteredRecords.map(filteredRecord => JSON.parse(filteredRecord))

  return filteredRecords;
}

function writeErrorLogs(messageType, errMessage, messageData) {
  return new Promise((resolve, reject) => {
    const fileName = messageType === 'email' ? 'mailErrorLogs.txt' : 'textMessageErrorLogs.txt'
    fs.readFile(path.resolve(__dirname, '..', 'logs', fileName), 'utf-8', (err, data) => {
      if (!err) {
        data += `\n${messageData.message} - ${messageData.recipentAddress} - ${errMessage}`
        fs.writeFile(path.resolve(__dirname, '..', 'logs', fileName), data, 'utf-8', (err) => {
          if (err) { console.log(`err`, err) }
          resolve();
        })
      }
    })
  })
}

function calculateDifferenceBetweenDates(date) {
  date = date.split('/')
  const day = parseInt(date[0])
  const month = parseInt(date[1])
  const fullYear = parseInt(date[2].length === 2 ? '20' + date[2] : date[2])
  const currentDate = new Date();
  const futureDate = new CustomDate()
  futureDate.setDateCustom(day, month, fullYear)
  futureDate.setTime(10, 0, 0)
  const difference = futureDate - currentDate;
  return difference > 0 ? difference : null;
}

module.exports = {
  checkIfWantToScheduleMessage,
  removeDuplicateRecords,
  writeErrorLogs,
  calculateDifferenceBetweenDates
}
