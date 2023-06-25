import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

export async function getContact(req, res) {
    const { name, email, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Message from ${name} - ${email}`,
        text: `${message}\n\nFrom: ${email}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.status(200).send();
    } catch (error) {
        console.log('Error Occurs', error);
        res.status(500).send();
    }
}


//npm i nodemail 
// npm i dotenv


// IN INDEX.JS => 

//import functions from "firebase-functions"
// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import dotenv from "dotenv"
// import { getContact } from './src/email.js';

// dotenv.config()
 
// const app = express();
// const PORT = 3001
// app.use(cors());
// app.use(bodyParser.json());

// app.post('/contact', getContact) 

// // app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

// export const api = functions.https.onRequest(app)
