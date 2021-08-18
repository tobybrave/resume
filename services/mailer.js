require("dotenv").config()
const nodemailer = require("nodemailer")
const { SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, CLIENT } = process.env

const sendMail = async ({ name, email, phone, work, purpose, description }) => {
  let transporter = nodemailer.createTransport({
    host: `${SMTP_HOST}`,
    port: parseInt(SMTP_PORT),
    auth: {
      user: `${SMTP_USERNAME}`,
      pass: `${SMTP_PASSWORD}`
    }
  })

  let info = await transporter.sendMail({
    from: `${name} <${email}>`,
    to: `${CLIENT}`,
    subject: `${purpose}`,
    text: `I'm ${name} from ${work}. ${description}. ${phone ? `You can reach me on phone ${phone}` : ""}`,
    html: `<b>I'm ${name} from ${work}. ${description}. ${phone ? `You can reach me on phone ${phone}` : ""}</b>`
  })
  console.log("sent", info.messageId)
}

module.exports = sendMail
