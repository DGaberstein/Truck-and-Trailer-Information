const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Configure Nodemailer to use SMTP
const transporter = nodemailer.createTransport({
    // Replace with your SMTP server details
    host: 'smtp.mailtrap.io',
    port: 587,
    auth: {
        user: 'your-smtp-username',
        pass: 'your-smtp-password'
    }
});

app.post('/send-email', (req, res) => {
    const { recipient, subject, message } = req.body;

    const mailOptions = {
        from: 'your-email@example.com',
        to: recipient,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
            return res.status(500).json({ success: false });
        }
        console.log('Email sent:', info.response);
        res.json({ success: true });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
