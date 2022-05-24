import * as nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (toEmail, emailSubject, emailBody) => {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'hello@chris-jones.dev',
      pass: process.env.SENDINBLUE_API_KEY, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Telford Leisure Services" <hello@chris-jones.dev>', // sender address
    to: toEmail, // list of receivers
    subject: emailSubject, // Subject line
    html: emailBody, // html body
  });

}
