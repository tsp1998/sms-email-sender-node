//apis
const sendEmail = require('../apis/email')
const sendTextMessage = require('../apis/textMessage')

//classes 
const CustomDate = require('../classes/CustomDate')

const { checkIsvalidEmail, checkIsValidTimeForTextMessage } = require('../functions/validations')
const { checkIfWantToScheduleMessage, calculateDifferenceBetweenDates, writeErrorLogs } = require('../functions/utils')

async function scheduleTextMessage(messageData) {

  try {
    const waitForMilliseconds = calculateDifferenceBetweenDates(messageData['Schedule On']);
    if (!waitForMilliseconds) {
      throw new Error('Invalid or Past Time')
    }
  
    setTimeout(() => {
      const isValidTimeToSendTextMessage = checkIsValidTimeForTextMessage(messageData['Country'])
      if (isValidTimeToSendTextMessage) {
    sendTextMessage(messageData['﻿Message'], [messageData['Phone']])
      }
    }, waitForMilliseconds)
  } catch (error) {
    await writeErrorLogs('textMessage', error.message, {
      message: messageData['﻿Message'],
      recipentAddress: messageData['Phone']
    })
  }
}

async function send(messageData) {
  // text message stuff
  const wantToScheduleMessage = checkIfWantToScheduleMessage(messageData)
  const isValidTimeToSendTextMessage = checkIsValidTimeForTextMessage(messageData['Country'])

  console.log(`wantToScheduleMessage`, wantToScheduleMessage)

  if (wantToScheduleMessage) {
    console.log('Scheduling Message')
    scheduleTextMessage(messageData)
  } else {
    if (!isValidTimeToSendTextMessage) {
      console.log('Sending Text Message')
      sendTextMessage(messageData['﻿Message'], [messageData['Phone']])
    }
  }

  //email stuff
  if (checkIsvalidEmail(messageData['Email'])) {
    await sendEmail(messageData['﻿Message'], messageData['Email']);
  }
}

module.exports = send