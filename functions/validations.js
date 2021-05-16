const CustomDate = require('../classes/CustomDate')

function checkIsvalidEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateRecord(record) {
  const message = record['﻿Message'] ? record['﻿Message'].trim() : ''
  // const email = record['Email'] ? record['Email'].trim() : ''
  const phone = record['Phone'] ? record['Phone'].trim() : ''
  const country = record['Country'] ? record['Country'].trim() : ''

  let isValidRecord = true;

  if (!(typeof message === 'string' && message.length > 1 && message.length <= 160)) {
    isValidRecord = false;
  }

  if (!(/^\d+$/.test(phone) && phone.length === 10)) {
    isValidRecord = false;
  }

  // if (!checkIsvalidEmail(email)) {
  //   isValidRecord = false;
  // }

  if (country !== 'USA' && country !== 'INDIA') {
    isValidRecord = false;
  }

  return isValidRecord;
}

function checkIsValidTimeForTextMessage(country) {
  if (country) {
    let timeZone = '';
    switch (country) {
      case 'USA': { timeZone = 'America/New_York' } break;
      case 'INDIA': { timeZone = 'Asia/Kolkata' } break;
    }

    const minTime = new CustomDate();
    minTime.setTime(10, 0, 0)
    const maxTime = new CustomDate();
    maxTime.setTime(17, 0, 0)
    const currentTime = new Date();

    if (minTime <= currentTime && currentTime <= maxTime) {
      return true;
    }
  }

  return false;
}


module.exports = {
  validateRecord,
  checkIsvalidEmail,
  checkIsValidTimeForTextMessage
}