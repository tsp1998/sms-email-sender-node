require('dotenv').config()
const nodemailer = require('nodemailer')
const { writeErrorLogs } = require('../functions/utils')

const { EMAIL, PASSWORD } = process.env

async function sendEmail(message, emails) {
  emails = typeof emails === 'string' ? emails : emails.join(', ')

  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: { user: EMAIL, pass: PASSWORD },
  });

  try {

    let info = await transporter.sendMail({
      from: EMAIL, // sender address
      to: emails, // list of receivers
      subject: "Test Mail", // Subject line
      text: message, // plain text body
      // html: "<b>Hello There</b>", // html body
    });

    console.log(`info.messageId`, info.messageId)
  } catch (error) {
    await writeErrorLogs('email', error.message, {
      message,
      recipentAddress: emails
    })
  }
}

module.exports = sendEmail

// const emails = ['tsp@outlook.in', 'tsp.cse@gmail.com']
// sendEmail('Hello', emails)
// sendEmail('Hello 2', emails)