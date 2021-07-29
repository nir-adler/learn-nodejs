const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = "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"

sgMail.setApiKey(sendgridAPIKey)
// const msg = {
//   to: 'nira7008@gmail.com', // Change to your recipient
//   from: 'nira7008@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })

const sendWelcomeEmail =async (email, name) => {
    console.log('here-1')
    return  sgMail.send({
        to: email,
        from: 'nira7008@gmail.com', // Change to your
        subject: 'Thanks for joinin in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}


module.exports = { sendWelcomeEmail }