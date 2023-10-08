const express = require('express')

const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.json( {
        'hello' : 'hi:'
    })
})
const appPass = 'imvbdyooaqjgvjtq'
const sendEmail = (email) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "haphamanhkhoa@gmail.com", // generated ethereal user
            pass: appPass, // generated ethereal password
        },

    })
    const mail_config = {
        from: 'haphamanhkhoa@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Email Sended Confirmation", // Subject line
        text: "Thanks for sending me mail. I will consider carefully before texting you.", // plain text body
        html: "<b>Thanks for sending me mail. I will consider carefully before texting you</b>", // html body
    }
    transporter.sendMail(mail_config, (err, info) => {
        if (err) {
            console.log(err)
            return
        }
        console.log("Sent" + info.response)
        // return res.json( {
        //     message:`Email sended to ${req.body.email} successfully`,

        // })
    })
}



app.post('/email', (req, res) => {
    console.log(req.body)
    res.json(req.body)
    sendEmail(req.body.email)
    // send mail with defined transport object

})


app.listen(3000, () => {
    console.log('Server is running on port 3000!')
})
