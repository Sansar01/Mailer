// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const Agenda = require('agenda');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://tiwarisansar2001:Tiwari%4004@cluster0.nxsth.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.log(error));

// Agenda setup
const agenda = new Agenda({ db: { address: 'mongodb+srv://tiwarisansar2001:Tiwari%4004@cluster0.nxsth.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' } });

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'st9889477@gmail.com',
        pass: 'bbov oydp oqmm msts'
    }
});

// Define an agenda job to send an email
agenda.define('send email', async (job) => {
    const { to, subject, text } = job.attrs.data;
    await transporter.sendMail({ from: 'st9889477@gmail.com', to, subject, text });
});

// Endpoint to schedule an email
app.post('/schedule-email', async (req, res) => {
    const { time, email, subject, body } = req.body;
    await agenda.schedule(time, 'send email', { to: email, subject, text: body });
    res.send('Email scheduled');
});

agenda.start();

app.listen(4000, () => console.log('Server running on port 4000'));
